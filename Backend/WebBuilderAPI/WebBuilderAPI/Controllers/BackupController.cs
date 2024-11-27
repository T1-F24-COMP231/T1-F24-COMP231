using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebBuilderAPI.Data;
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

        [HttpGet("history")]
        [ProducesResponseType(typeof(CustomerBackup),200)]
        [Authorize]
        public async Task<IActionResult> BackupHistory()
        {
            try
            {
                int userId = _authServices.GetUserIdFromRequest(HttpContext.User);

                return Ok(await _backupRepository.BackupHistory(userId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
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

        [HttpPost("load/{backupId}")]
        [Authorize]
        public async Task<IActionResult> LoadBackup([FromRoute] int backupId)
        {
            try
            {
                int userId = _authServices.GetUserIdFromRequest(HttpContext.User);
                await _backupRepository.LoadBackup(userId, backupId);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }
    }
}
