using Microsoft.AspNetCore.Mvc;
using WebBuilderAPI.Data;

namespace WebBuilderAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private readonly DbContextApp _context;

        public TestController(DbContextApp context) {
            _context = context;
        }

        [HttpGet("db-connection")]
        public IActionResult Get()
        {
            try
            {
                if(_context.Database.CanConnect())
                    return Ok(true);
                else
                    return Ok(false);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return BadRequest(false);
            }
        }
    }
}
