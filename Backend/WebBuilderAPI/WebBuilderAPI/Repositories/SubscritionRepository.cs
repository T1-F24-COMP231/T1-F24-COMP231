using Microsoft.EntityFrameworkCore;
using WebBuilderAPI.Data;
using WebBuilderAPI.RequestModels;

namespace WebBuilderAPI.Repositories
{
    public class SubscritionRepository
    {
        private readonly DbContextApp _context;
        private readonly int SUBSCRPTION_PERIOD_DAYS = 30;

        public SubscritionRepository(DbContextApp context)
        {
            _context = context;
        }

        public async Task<Subscription?> GetCustomerSubscription(int customerId)
        {
            Subscription? subscription = await _context.subscription.FirstOrDefaultAsync(c => c.Id == customerId);
            return subscription;
        }
        public async Task<IEnumerable<Subscription>> GetAllSubscriptions()
        {
            return await _context.subscription
       .Include(s => s.Account)          // Include related Account
       .Include(s => s.BillingInfo)      // Include related BillingInfo
       .ToListAsync();
        }
        public async Task RenewSubscription (int customerId)
        {
            int billingId = 0;
            var billing = await _context.BillingInfo.FirstOrDefaultAsync(c => c.AccountId == customerId);
            if (billing != null)
            {
                billingId = billing.Id;
            }

            Subscription? subscription =  await _context.subscription.FirstOrDefaultAsync(c => c.CustomerId == customerId);

            if (subscription == null)
            {
                subscription = new Subscription
                {
                    BillingId = billingId,
                    ChargeDate = DateTime.Now,
                    ExpiryDate = DateTime.Now.AddDays(SUBSCRPTION_PERIOD_DAYS),
                    CustomerId = customerId
                };
            }
            else
            {
                subscription.BillingId = billingId;
                subscription.ChargeDate = DateTime.Now;
                subscription.ExpiryDate = DateTime.Now.AddDays(SUBSCRPTION_PERIOD_DAYS);
            }

        }

        public async Task CancelSubscription(int customerId)
        {
            Subscription? subscription = await _context.subscription.FirstOrDefaultAsync(c => c.CustomerId == customerId);

            if (subscription != null)
            {
                subscription.ExpiryDate = DateTime.Now;
            };
        }

        public async Task UpsetyBillingInfo(int customerId, BillingRequestModel newBilling)
        {
            BillingInfo? billing = await _context.BillingInfo.FirstOrDefaultAsync(c => c.AccountId == customerId);

            if (billing == null)
            {
                billing = new BillingInfo()
                {
                    AccountId = customerId
                };
                
                await _context.AddAsync(billing);
                await _context.SaveChangesAsync();
            }

            billing.NameOnCard = newBilling.NameOnCard;
            billing.CardNumber = newBilling.CardNumber;
            billing.Name = newBilling.Name;
            billing.PostalCode = newBilling.PostalCode;

            await _context.SaveChangesAsync();

        }
    }
}
