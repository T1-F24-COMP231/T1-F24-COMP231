using Microsoft.EntityFrameworkCore;

namespace WebBuilderAPI.Data
{
    public class DbContextApp : DbContext
    {
        public DbContextApp(DbContextOptions<DbContextApp> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Account>()
                .HasIndex(a => a.Email)
                .IsUnique();
            modelBuilder.Entity<Layout>()
                .HasIndex(l => l.Title)
                .IsUnique(); // Optionally make title unique if needed
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Layout> Layouts { get; set; }
        public DbSet<CustomerBackup> CustomerBackup { get; set; }
        public DbSet<LayoutBackup> LayoutBackup { get; set; }
        public DbSet<Subscription> subscription { get; set; }
        public DbSet<BillingInfo> BillingInfo { get; set; }
    }
}
