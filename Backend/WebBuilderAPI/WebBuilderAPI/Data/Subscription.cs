using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebBuilderAPI.Data
{
    public class Subscription
    {
        public int Id { get; set; }

        [ForeignKey(nameof(Account))]        
        public int CustomerId { get; set; }
        
        [JsonIgnore]
        public Account Account { get; set; }

        [ForeignKey(nameof(BillingInfo))]
        public int? BillingId { get; set; }
        public BillingInfo BillingInfo { get; set; }

        public DateTime ChargeDate { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}
