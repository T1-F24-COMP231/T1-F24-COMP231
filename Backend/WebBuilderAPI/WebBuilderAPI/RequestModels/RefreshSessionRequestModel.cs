using System.ComponentModel.DataAnnotations;

namespace WebBuilderAPI.RequestModels
{
    public class RefreshSessionRequestModel
    {
        [Required]
        public string JwtToken { get; set; }
        [Required]
        public string RefreshToken { get; set; }
    }
}
