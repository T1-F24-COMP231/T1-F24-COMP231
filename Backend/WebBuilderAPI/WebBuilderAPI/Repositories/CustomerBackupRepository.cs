using Microsoft.EntityFrameworkCore;
using WebBuilderAPI.Data;

namespace WebBuilderAPI.Repositories
{
    public class CustomerBackupRepository
    {
        private readonly DbContextApp _context;

        public CustomerBackupRepository(DbContextApp context)
        {
            _context = context;
        }

        public async Task CreateBackup(int customerId)
        {

            CustomerBackup backup = new CustomerBackup()
            {
                CreatedDate = DateTime.Now,
                CustomerId = customerId
            };

            await _context.CustomerBackup.AddAsync(backup);

            //Insert the new records
            IEnumerable<Layout> currentLayouts = await _context.Layouts.Where(c => c.UserId == customerId).ToListAsync();

            foreach (var item in currentLayouts)
            {
                LayoutBackup newBackup = new LayoutBackup()
                {
                    CreatedAt = item.CreatedAt,
                    PublishedAt = item.PublishedAt,
                    UpdatedAt = item.UpdatedAt,
                    CssContent = item.CssContent,
                    DeploymentUrl = item.DeploymentUrl,
                    HtmlContent = item.HtmlContent,
                    IsPublished = item.IsPublished,
                    JavaScriptContent = item.JavaScriptContent,
                    Title = item.Title,
                    UserId = item.UserId,
                    Id = item.Id
                };
                await _context.LayoutBackup.AddAsync(newBackup);
            }
            await _context.SaveChangesAsync();
        }

        public async Task LoadBackup(int customerId, int backupId)
        {
            //Remove the records in the active layout tables
            IEnumerable<Layout> layouts = await _context.Layouts.Where(c => c.UserId == customerId).ToListAsync();
            _context.RemoveRange(layouts);

            //Insert the new records
            IEnumerable<LayoutBackup> currentLayouts = await _context.LayoutBackup.Where(c => c.UserId == customerId && c.Id == backupId).ToListAsync();

            foreach (var item in currentLayouts)
            {
                Layout newBackup = new Layout()
                {
                    CreatedAt = item.CreatedAt,
                    PublishedAt = item.PublishedAt,
                    UpdatedAt = item.UpdatedAt,
                    CssContent = item.CssContent,
                    DeploymentUrl = item.DeploymentUrl,
                    HtmlContent = item.HtmlContent,
                    IsPublished = item.IsPublished,
                    JavaScriptContent = item.JavaScriptContent,
                    Title = item.Title,
                    UserId = item.UserId,
                    Id = item.Id
                };
                await _context.Layouts.AddAsync(newBackup);
            }
            await _context.SaveChangesAsync();
        }

        public async Task<ICollection<CustomerBackup>> BackupHistory(int customerId)
        {
            return await _context.CustomerBackup.Where(c => c.CustomerId == customerId).ToListAsync();
        }
    }
}
