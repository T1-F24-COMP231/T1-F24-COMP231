using Microsoft.EntityFrameworkCore;
using WebBuilderAPI.Data;

namespace WebBuilderAPI.Repositories
{
    public interface IUserActivityLogRepository
    {
        Task AddActivityLogAsync(int userId, string activity);
        Task<IEnumerable<UserActivityLog>> GetActivityLogsAsync(int userId);
    }

    public class UserActivityLogRepository : IUserActivityLogRepository
    {
        private readonly DbContextApp _context;

        public UserActivityLogRepository(DbContextApp context)
        {
            _context = context;
        }

        public async Task AddActivityLogAsync(int userId, string activity)
        {
            var log = new UserActivityLog
            {
                UserId = userId,
                Activity = activity,
                Timestamp = DateTime.UtcNow
            };

            _context.UserActivityLogs.Add(log);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<UserActivityLog>> GetActivityLogsAsync(int userId)
        {
            return await _context.UserActivityLogs
                                 .Where(log => log.UserId == userId)
                                 .OrderByDescending(log => log.Timestamp)
                                 .ToListAsync();
        }
    }

}
