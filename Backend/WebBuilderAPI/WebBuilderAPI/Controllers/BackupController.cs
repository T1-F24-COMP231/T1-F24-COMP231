using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebBuilderAPI.Repositories;
using WebBuilderAPI.Services;

namespace WebBuilderAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BackupController : Controller
    {

        private CustomerBackupRepository _backupRepository;
        private readonly AuthServices _authServices;

        public BackupController(CustomerBackupRepository backupRepository, AuthServices authServices) 
        {
            _backupRepository = backupRepository;
            _authServices = authServices;
        }

        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> NewBackup()
        {
            try
            {
                int userId = _authServices.GetUserIdFromRequest(HttpContext.User);
                await _backupRepository.CreateBackup(userId);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }

        [HttpPost("load")]
        [Authorize]
        public async Task<IActionResult> LoadBackup()
        {
            try
            {
                int userId = _authServices.GetUserIdFromRequest(HttpContext.User);
                await _backupRepository.LoadBackup(userId);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }
    }
}
