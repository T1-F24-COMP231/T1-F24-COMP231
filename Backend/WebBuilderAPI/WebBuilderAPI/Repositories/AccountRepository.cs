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
        public async Task<IEnumerable<Account>> GetAllAccounts()
        {
            var accounts = await _context.Accounts.ToListAsync();
            if (accounts == null || !accounts.Any())
            {
                throw new Exception("No accounts found.");
            }
            return accounts;
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

        //Profile updation
        public async Task<Account> GetAccountById(int id)
        {
            return await _context.Accounts.FirstOrDefaultAsync(a => a.Id == id)
                ?? throw new Exception("User Not found");
        }

        public async Task UpdateAccount(Account account)
        {
            _context.Accounts.Update(account);
            await _context.SaveChangesAsync();
        }

        public async Task<Account> LoginAsAdminUser(string email, string password)
        {
            return await _context.Accounts.FirstOrDefaultAsync(u => u.Email == email && u.Password == password && u.IsAdmin) 
                    ?? throw new Exception("User Not found");
        }

        public async Task<Account> LoginAsCustomerUser(string email, string password)
        {
            return await _context.Accounts.FirstOrDefaultAsync(u => u.Email == email && u.Password == password && u.IsAdmin == false)
                    ?? throw new Exception("User Not found");
        }

        public async Task LogOut(int id)
        {
            Account user = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == id)
                ?? throw new Exception("User Not found");
            user.RefreshToken = null;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSessionData(string email, string refreshToken, DateTime expiryDate)
        {
            Account user = await _context.Accounts.FirstOrDefaultAsync(a => a.Email == email)
                ?? throw new Exception("User Not found");
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = expiryDate;
            await _context.SaveChangesAsync();
        }
    }
}
