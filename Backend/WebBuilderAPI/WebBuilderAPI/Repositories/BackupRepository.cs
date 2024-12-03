using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebBuilderAPI.Data;
namespace WebBuilderAPI.Repositories
{

    public interface IBackupRepository
    {
        Task<BackupEntry> CreateBackupAsync();
        Task RestoreBackupAsync(string filePath);
        Task<BackupEntry> GetLatestBackupAsync();
        Task<List<BackupEntry>> GetAllBackupsAsync();
    }

    public class BackupRepository : IBackupRepository
    {
        private readonly DbContextApp _dbContext;
        private readonly string _connectionString;
        private readonly string _mysqlDumpPath;
        private readonly string _mysqlPath;

        public BackupRepository(DbContextApp dbContext, string connectionString, string mysqlDumpPath, string mysqlPath)
        {
            _dbContext = dbContext;
            _connectionString = connectionString;
            _mysqlDumpPath = mysqlDumpPath;
            _mysqlPath = mysqlPath;
        }

        public async Task<BackupEntry> CreateBackupAsync()
        {
            string backupFolder = Path.Combine(Directory.GetCurrentDirectory(), "Backups");
            Directory.CreateDirectory(backupFolder);

            string backupFile = Path.Combine(backupFolder, $"backup_{DateTime.UtcNow:yyyyMMddHHmmss}.sql");

            var builder = new MySql.Data.MySqlClient.MySqlConnectionStringBuilder(_connectionString);
            string server = builder.Server;
            string database = builder.Database;
            string user = builder.UserID;
            string password = builder.Password;

            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = _mysqlDumpPath,
                    Arguments = $"-h {server} -u {user} --password={password} {database}",
                    RedirectStandardOutput = true, // Capture output
                    UseShellExecute = false,       // Disable shell execution
                    CreateNoWindow = true          // Suppress command window
                }
            };

            try
            {
                process.Start();
               
                // Write the output to the backup file
                using (var fileStream = new FileStream(backupFile, FileMode.Create, FileAccess.Write))
                using (var streamWriter = new StreamWriter(fileStream))
                {
                    await process.StandardOutput.BaseStream.CopyToAsync(fileStream);
                }

                await process.WaitForExitAsync();

                if (process.ExitCode != 0)
                {
                    throw new Exception($"Backup process failed with exit code {process.ExitCode}.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create backup", ex);
            }
            finally
            {
                process.Dispose();
            }


            var backupEntry = new BackupEntry
            {
                FilePath = backupFile,
                CreatedAt = DateTime.UtcNow
            };

            _dbContext.BackupEntries.Add(backupEntry);
            await _dbContext.SaveChangesAsync();

            return backupEntry;
        }

        public async Task RestoreBackupAsync(string filePath)
        {
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException("Backup file not found.");
            }

            var builder = new MySql.Data.MySqlClient.MySqlConnectionStringBuilder(_connectionString);
            string server = builder.Server;
            string database = builder.Database;
            string user = builder.UserID;
            string password = builder.Password;

            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = _mysqlPath,
                    Arguments = $"-h {server} -u {user} --password={password} {database} < \"{filePath}\"",
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };

            process.Start();
            await process.WaitForExitAsync();

            if (process.ExitCode != 0)
            {
                throw new Exception("Restore process failed.");
            }
        }

        public async Task<BackupEntry> GetLatestBackupAsync()
        {
            return await _dbContext.BackupEntries.OrderByDescending(b => b.CreatedAt).FirstOrDefaultAsync();
        }

        public async Task<List<BackupEntry>> GetAllBackupsAsync()
        {
            return await _dbContext.BackupEntries.OrderByDescending(b => b.CreatedAt).ToListAsync();
        }
    }

}
