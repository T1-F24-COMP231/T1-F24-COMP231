using Microsoft.AspNetCore.Mvc;
using WebBuilderAPI.Data;
using WebBuilderAPI.Repositories;
using WebBuilderAPI.RequestModels;

namespace WebBuilderAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LayoutController : ControllerBase
    {
        private readonly LayoutRepository _layoutRepository;

        // Constructor for dependency injection
        public LayoutController(LayoutRepository layoutRepository)
        {
            _layoutRepository = layoutRepository;
        }

        // POST: api/Layout
        [HttpPost]
        public async Task<IActionResult> NewLayout([FromBody] LayoutRequestModel layoutRequest)
        {
            try
            {
                // Map the request model to the domain model
                var layout = new Layout
                {
                    UserId = layoutRequest.UserId,
                    Title = layoutRequest.Title,
                    HtmlContent = layoutRequest.HtmlContent,
                    CssContent = layoutRequest.CssContent,
                    JavaScriptContent = layoutRequest.JavaScriptContent,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                // Call the repository to save the new layout
                await _layoutRepository.NewLayout(layout);
                return NoContent(); // Successfully created
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message} - {ex.InnerException?.Message}");
            }
        }

        // PUT: api/Layout/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLayout([FromRoute] int id, [FromBody] LayoutRequestModel layoutRequest)
        {
            try
            {
                // Map the request model to the domain model for updating
                var layout = new Layout
                {
                    Id = id,
                    UserId = layoutRequest.UserId,
                    Title = layoutRequest.Title,
                    HtmlContent = layoutRequest.HtmlContent,
                    CssContent = layoutRequest.CssContent,
                    JavaScriptContent = layoutRequest.JavaScriptContent,
                    UpdatedAt = DateTime.UtcNow
                };

                // Call the repository to update the layout
                await _layoutRepository.UpdateLayout(id, layout);
                return NoContent(); // Successfully updated
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message} - {ex.InnerException?.Message}");
            }
        }

        // DELETE: api/Layout/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLayout([FromRoute] int id)
        {
            try
            {
                // Call the repository to delete the layout
                await _layoutRepository.DeleteLayout(id);
                return NoContent(); // Successfully deleted
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message} - {ex.InnerException?.Message}");
            }
        }

        // GET: api/Layout/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLayout([FromRoute] int id)
        {
            try
            {
                // Retrieve the layout from the repository
                var layout = await _layoutRepository.GetLayout(id);
                if (layout == null)
                {
                    return NotFound("Layout not found.");
                }

                return Ok(layout);
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message} - {ex.InnerException?.Message}");
            }
        }

        // GET: api/Layout/User/{userId}
        [HttpGet("User/{userId}")]
        public async Task<IActionResult> GetLayoutsByUserId([FromRoute] int userId)
        {
            try
            {
                // Retrieve the layouts for a specific user
                var layouts = await _layoutRepository.GetLayoutsByUserId(userId);
                if (layouts == null || layouts.Count == 0)
                {
                    return NotFound("No layouts found for this user.");
                }

                return Ok(layouts);
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message} - {ex.InnerException?.Message}");
            }
        }
    }
}
