
using Microsoft.EntityFrameworkCore;
using WebBuilderAPI.Data;
using WebBuilderAPI.Repositories;

namespace WebBuilderAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectionString = builder.Configuration.GetConnectionString("Connection") ?? throw new InvalidOperationException("Connection string 'Connection' not found.");

            // Add services to the container.
            #region Database Context
            builder.Services.AddDbContext<DbContextApp>(options =>
                options.UseMySQL(connectionString, builder =>
                {
                    builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
                }));
            #endregion

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<AccountRepository>();
            // Register LayoutRepository with DI container
            builder.Services.AddScoped<LayoutRepository>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
