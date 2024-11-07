using WebBuilderAPI.Data;

namespace WebBuilderAPI.Repositories
{
    public class AccountRepository
    {
        private readonly DbContextApp _context;

        public AccountRepository(DbContextApp context)
        {
            _context = context;
        }

        public async Task NewAccount(Account newAccount) 
        {
            _context.Accounts.Add(newAccount);
            await _context.SaveChangesAsync();
        }
    }
}
