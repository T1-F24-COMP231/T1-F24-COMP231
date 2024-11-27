using System.ComponentModel.DataAnnotations.Schema;

namespace WebBuilderAPI.Data
{
    public class CustomerBackup
    {
        public int Id { get; set; }
        [ForeignKey(nameof(Account))]
        public int CustomerId { get; set; }
        public Account Account { get; set; }
        public DateTime? CreatedDate { get; set; } = DateTime.Now;
    }
}
