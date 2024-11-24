namespace WebBuilderAPI.Data
{
    public class Account
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; } // New property to track if the user is an admin
        public string? RefreshToken {get; set;}
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}
