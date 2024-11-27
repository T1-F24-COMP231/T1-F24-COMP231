using System.Security.Claims;

namespace WebBuilderAPI.Services
{
    public class AuthServices
    {
        public int GetUserIdFromRequest(ClaimsPrincipal principal)
        {
            Claim? ExtractedClaim = principal.Claims
                .FirstOrDefault(x => x.Type.Equals("Id"));

            if (ExtractedClaim == null)
                throw new Exception("User is not Authorized");
            int claimId = int.Parse(ExtractedClaim.Value);
            return claimId;
        }
    }
}
