using Microsoft.AspNetCore.Mvc;
using WebBuilderAPI.Data;
using WebBuilderAPI.Repositories;
using WebBuilderAPI.RequestModels;

namespace WebBuilderAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly AccountRepository _accountRepository;
        public AccountController(AccountRepository accountRepository) 
        {
            _accountRepository = accountRepository;
        }

        [HttpPost]
        public async Task<IActionResult> NewAccount([FromBody] AccountRequestModel account)
        {
            try
            {
                Account newAccount = new Account()
                {
                    Email = account.Email,
                    Password = account.Password,
                    FirstName = account.FirstName,
                    LastName = account.LastName,
                    IsAdmin = account.IsAdmin
                };

                await _accountRepository.NewAccount(newAccount);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"{ ex.Message} - {ex.InnerException?.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAccount([FromRoute] int id, [FromBody] AccountRequestModel account)
        {
            try
            {
                await _accountRepository.UpdateAccount(id, account);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message} - {ex.InnerException?.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount([FromRoute] int id)
        {
            try
            {
                await _accountRepository.DeleteAccount(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message} - {ex.InnerException?.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _accountRepository.GetAllAccounts();
                if (users == null || !users.Any())
                {
                    return NotFound("No users found");
                }

                var userList = users
                    .Where(user => !user.IsAdmin) // Filter out users with IsAdmin = true
                    .Select(user => new
                    {
                        user.Id,
                        user.FirstName,
                        user.LastName,
                        user.Email
                    });

                return Ok(userList);
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message} - {ex.InnerException?.Message}");
            }
        }
        //To get Profile detail
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfileDetails(int id)
        {
            try
            {
                var account = await _accountRepository.GetAccountById(id);
                if (account == null)
                {
                    return NotFound("Account not found");
                }

                return Ok(new
                {
                    account.Id,
                    account.FirstName,
                    account.LastName,
                    account.Password,
                    account.Email
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message} - {ex.InnerException?.Message}");
            }
        }

        //Update Profile detail
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateProfile(int id, [FromBody] UpdateProfileRequestModel updateModel)
        {
            try
            {
                var account = await _accountRepository.GetAccountById(id);
                if (account == null)
                {
                    return NotFound("Account not found");
                }

                // Validate old password
                if (updateModel.OldPassword != account.Password)
                {
                    return BadRequest("Incorrect old password");
                }

                // Update fields if provided
                account.FirstName = updateModel.FirstName ?? account.FirstName;
                account.LastName = updateModel.LastName ?? account.LastName;

                if (!string.IsNullOrWhiteSpace(updateModel.NewPassword))
                {
                    account.Password = updateModel.NewPassword;
                }

                await _accountRepository.UpdateAccount(account);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message} - {ex.InnerException?.Message}");
            }
        }
    }
}
