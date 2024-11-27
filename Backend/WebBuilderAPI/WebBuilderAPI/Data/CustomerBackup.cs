using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebBuilderAPI.Data
{
    public class CustomerBackup
    {
        public int Id { get; set; }
        [ForeignKey(nameof(Account))]
        public int CustomerId { get; set; }

        [JsonIgnore]
        public Account Account { get; set; }
        public DateTime? CreatedDate { get; set; } = DateTime.Now;

        [JsonIgnore]
        public IEnumerable<LayoutBackup>? Backups { get; set; }
    }
}
