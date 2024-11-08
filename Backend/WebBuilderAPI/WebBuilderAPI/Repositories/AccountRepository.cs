using Microsoft.EntityFrameworkCore;
using WebBuilderAPI.Data;
using WebBuilderAPI.RequestModels;

namespace WebBuilderAPI.Repositories
{
    public class AccountRepository
    {
        private readonly DbContextApp _context;

        public AccountRepository(DbContextApp context)
        {
            _context = context;
        }

        public async Task<Account> GetAccount(int id)
        {
            return await _context.Accounts.FirstOrDefaultAsync(a => a.Id == id) ?? throw new Exception("Account doesn't exist");
        }

        public async Task NewAccount(Account newAccount) 
        {
            _context.Accounts.Add(newAccount);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAccount(int id, AccountRequestModel account)
        {
            var oldAccount = await GetAccount(id);
            oldAccount.Email = account.Email;
            oldAccount.Password = account.Password;
            oldAccount.FirstName = account.FirstName;
            oldAccount.LastName = account.LastName;
            await _context.SaveChangesAsync();
        }


        public async Task DeleteAccount(int id)
        {
            var oldAccount = await GetAccount(id);
            _context.Remove(oldAccount);
            await _context.SaveChangesAsync();
        }
    }
}
