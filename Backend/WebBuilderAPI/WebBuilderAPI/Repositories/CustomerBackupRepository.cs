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

            CustomerBackup? backup = await _context.CustomerBackup.FirstOrDefaultAsync(c => c.CustomerId == customerId);

            //If it's not the first backup we update the date, otherwise we create a register
            if (backup != null) 
            {
                backup.CreatedDate = DateTime.Now;
            }
            else
            {
                backup = new CustomerBackup()
                {
                    CreatedDate = DateTime.Now,
                    CustomerId = customerId
                };
                await _context.CustomerBackup.AddAsync(backup);
                await _context.SaveChangesAsync();
            }

            //Remove the old records
            IEnumerable<LayoutBackup> layouts = await _context.LayoutBackup.Where(c => c.UserId == customerId).ToListAsync();
            _context.RemoveRange(layouts);

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

        public async Task LoadBackup(int customerId)
        {
            //Remove the old records
            IEnumerable<Layout> layouts = await _context.Layouts.Where(c => c.UserId == customerId).ToListAsync();
            _context.RemoveRange(layouts);

            //Insert the new records
            IEnumerable<LayoutBackup> currentLayouts = await _context.LayoutBackup.Where(c => c.UserId == customerId).ToListAsync();

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
    }
}
