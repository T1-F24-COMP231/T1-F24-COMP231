namespace WebBuilderAPI.Data
{
    public class UserActivityLog
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Activity { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
