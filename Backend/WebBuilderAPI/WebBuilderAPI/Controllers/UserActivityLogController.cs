using Microsoft.AspNetCore.Mvc;
using WebBuilderAPI.Repositories;

namespace WebBuilderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserActivityLogController : ControllerBase
    {
        private readonly IUserActivityLogRepository _activityLogRepository;

        public UserActivityLogController(IUserActivityLogRepository activityLogRepository)
        {
            _activityLogRepository = activityLogRepository;
        }

        // API to fetch user activity logs based on UserId
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetActivityLogs(int userId)
        {
            try
            {
                var activityLogs = await _activityLogRepository.GetActivityLogsAsync(userId);
                return Ok(activityLogs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        // API to log user activity
        [HttpPost("log")]
        public async Task<IActionResult> LogActivity([FromBody] ActivityLogRequest request)
        {
            try
            {
                await _activityLogRepository.AddActivityLogAsync(request.UserId, request.Activity);
                return Ok(new { Message = "Activity logged successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }
    }

    public class ActivityLogRequest
    {
        public int UserId { get; set; }
        public string Activity { get; set; }
    }

}
