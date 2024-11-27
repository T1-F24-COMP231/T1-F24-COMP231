namespace WebBuilderAPI.Data
{
    public class BillingInfo
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string Name { get; set; }
        public string CardNumber { get; set; }
        public string NameOnCard { get; set; }
        public string PostalCode { get; set; }
    }
}
