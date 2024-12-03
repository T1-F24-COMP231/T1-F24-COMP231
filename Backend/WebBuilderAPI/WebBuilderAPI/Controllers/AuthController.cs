using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WebBuilderAPI.Data;
using WebBuilderAPI.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using WebBuilderAPI.RequestModels;
using WebBuilderAPI.Services;
using Org.BouncyCastle.Asn1.Ocsp;

namespace WebBuilderAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly AccountRepository _accountRepository;
        private readonly AuthServices _authServices;
        private readonly static int TOKEN_DAYS = 7;
        private readonly static int SESSION_TIME = 120;
        private readonly static string JWT_KEY_TOKEN = "m-N8Q~M-68b~wY28c~oQm9iNlPtiN~KlTp~1ScK0";
        private readonly IUserActivityLogRepository _activityLogRepository;
        public AuthController(AccountRepository accountRepository, IConfiguration configuration, AuthServices authServices, IUserActivityLogRepository activityLogRepository)
        {
            _accountRepository = accountRepository;
            _configuration = configuration;
            _authServices = authServices;
            _activityLogRepository = activityLogRepository;
        }

        [HttpPost("admin/login")]
        [AllowAnonymous]
        public async Task<IActionResult> LogInAdmin([FromBody] LoginRequestModel login)
        {
            try
            {
                Account userResult = await _accountRepository.LoginAsAdminUser(login.Email, login.Password);

                string token = await GetJWT(userResult, SESSION_TIME);
                string refreshToken = await RefreshToken();

                await _accountRepository.UpdateSessionData(userResult.Email, refreshToken, DateTime.Now.AddDays(TOKEN_DAYS));

                return Ok(new
                {
                    Token = token,
                    RefreshToken = refreshToken,
                    userResult.FirstName,
                    userResult.LastName,
                    userResult.Email
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }

        [HttpPost("customer/login")]
        [AllowAnonymous]
        public async Task<IActionResult> LogInCustomer([FromBody] LoginRequestModel login)
        {
            try
            {
                Account userResult = await _accountRepository.LoginAsCustomerUser(login.Email, login.Password);

                string token = await GetJWT(userResult, SESSION_TIME);
                string refreshToken = await RefreshToken();

                await _accountRepository.UpdateSessionData(userResult.Email, refreshToken, DateTime.Now.AddDays(TOKEN_DAYS));
                // Log the user activity
                await _activityLogRepository.AddActivityLogAsync(userResult.Id, "User logged in successfully.");

                return Ok(new
                {
                    Token = token,
                    RefreshToken = refreshToken,
                    userResult.FirstName,
                    userResult.LastName,
                    userResult.Email
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> LogOut()
        {
            try
            {
                int userId = _authServices.GetUserIdFromRequest(HttpContext.User);
                await _accountRepository.LogOut(userId);
                // Log the user activity
                await _activityLogRepository.AddActivityLogAsync(userId, "User Logout  successfully.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }

        [HttpPost("refresh")]
        [AllowAnonymous]
        public async Task<IActionResult> Refresh([FromBody] RefreshSessionRequestModel session)
        {
            try
            {
                ClaimsPrincipal principal = GetPrincipalFromExpiredToken(session.JwtToken);
                int userId = _authServices.GetUserIdFromRequest(principal);

                Account user = await _accountRepository.GetAccountById(userId);

                if (user.RefreshToken != session.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                    throw new Exception("Invalid request");

                var newRefreshToken = await RefreshToken();
                user.RefreshToken = newRefreshToken;
                await _accountRepository.UpdateSessionData(user.Email, newRefreshToken, DateTime.Now.AddDays(TOKEN_DAYS));

                return Ok(new
                {
                    AccessToken = await GetJWT(user, SESSION_TIME),
                    RefreshToken = user.RefreshToken,
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }

        private async Task<string> RefreshToken()
        {
            var randomNumber = new byte[32];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        private async Task<string> GetJWT(Account user, int minutes = 0)
        {
            List<Claim> Claims = new List<Claim>();

            if(user.IsAdmin)
                Claims.Add(new Claim("Role", "Admin"));
            else
                Claims.Add(new Claim("Role", "Customer"));

            Claims.Add(new Claim("Id", user.Id.ToString()));

            SymmetricSecurityKey Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWT_KEY_TOKEN));

            SigningCredentials Credentials = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256);

            DateTime ExpiryDate = DateTime.UtcNow.AddMinutes(minutes);

            JwtSecurityToken Token = new JwtSecurityToken(
                "WebBuilder",
                "WebBuilder",
                Claims,
                expires: ExpiryDate,
                signingCredentials: Credentials);

            return new JwtSecurityTokenHandler().WriteToken(Token);
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWT_KEY_TOKEN)),
                ValidateLifetime = false,
                ValidIssuer = "WebBuilder",
                ValidAudience = "WebBuilder",
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");
            return principal;
        }
    }
}