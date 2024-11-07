using System.ComponentModel.DataAnnotations;

namespace WebBuilderAPI.RequestModels
{
    public class AccountRequestModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
