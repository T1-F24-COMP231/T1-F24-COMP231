using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;
using WebBuilderAPI.Data;
using WebBuilderAPI.Repositories;

using WebBuilderAPI.RequestModels;
using WebBuilderAPI.Services;
namespace WebBuilderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemBackupController : ControllerBase
    {
    
        private readonly IBackupRepository _backupRepository;

        public SystemBackupController(IBackupRepository backupRepository)
        {
            _backupRepository = backupRepository;
        }

        [HttpGet("latest")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetLatestBackup()
        {
            try
            {
                var latestBackup = await _backupRepository.GetLatestBackupAsync();
                return Ok(latestBackup);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        [HttpGet]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetAllBackups()
        {
            try
            {
                var backups = await _backupRepository.GetAllBackupsAsync();
                return Ok(backups);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        [HttpPost("backup")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> CreateBackup()
        {
            try
            {
                var backup = await _backupRepository.CreateBackupAsync();
                return Ok(new { Message = "Backup created successfully", Backup = backup });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        [HttpPost("restore")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> RestoreBackup([FromBody] RestoreRequest request)
        {
            try
            {
                await _backupRepository.RestoreBackupAsync(request.FilePath);
                return Ok(new { Message = "Backup restored successfully" });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }
    }


}
