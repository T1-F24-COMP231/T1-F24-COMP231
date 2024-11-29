using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebBuilderAPI.Data;
using WebBuilderAPI.Repositories;
using WebBuilderAPI.RequestModels;
using WebBuilderAPI.Services;

namespace WebBuilderAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SubscriptionController : Controller
    {
        private readonly SubscritionRepository _subscritionRepository;
        private readonly AuthServices _authServices;

        public SubscriptionController(AuthServices authServices, SubscritionRepository subscritionRepository)
        {
            _authServices = authServices;
            _subscritionRepository = subscritionRepository;
        }

        [HttpPost("renew")]
        [Authorize]
        public async Task<IActionResult> RenewSubscription()
        {
            try
            {
                int userId = _authServices.GetUserIdFromRequest(HttpContext.User);

                await _subscritionRepository.RenewSubscription(userId);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }

        [HttpPost("cancel")]
        [Authorize]
        public async Task<IActionResult> CancelSubscription()
        {
            try
            {
                int userId = _authServices.GetUserIdFromRequest(HttpContext.User);

                await _subscritionRepository.CancelSubscription(userId);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }


        [HttpPost("billing")]
        [Authorize]
        public async Task<IActionResult> UpserBilling([FromForm] BillingRequestModel billing)
        {
            try
            {
                int userId = _authServices.GetUserIdFromRequest(HttpContext.User);

                await _subscritionRepository.UpsetyBillingInfo(userId,billing);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(Subscription), 200)]
        [Authorize]
        public async Task<IActionResult> GetCustomerSubscription()
        {
            try
            {
                int userId = _authServices.GetUserIdFromRequest(HttpContext.User);

                return Ok(await _subscritionRepository.GetCustomerSubscription(userId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }

        [HttpGet("all")]
         [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetAllSubscriptions()
        {
            try
            {
                // Fetch subscriptions and include Account and BillingInfo
                var subscriptions = await _subscritionRepository.GetAllSubscriptions();

                // Project the data to a new format
                var result = subscriptions.Select(sub => new
                {
                    sub.Id,
                    Customer = new
                    {
                        sub.Account.FirstName,
                        sub.Account.LastName,
                        sub.Account.Email
                    },
                    BillingInfo = sub.BillingInfo != null ? new
                    {
                        sub.BillingInfo.Name,
                        sub.BillingInfo.NameOnCard,
                        sub.BillingInfo.PostalCode
                    } : null,
                    sub.ChargeDate,
                    sub.ExpiryDate
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }


    }
}
