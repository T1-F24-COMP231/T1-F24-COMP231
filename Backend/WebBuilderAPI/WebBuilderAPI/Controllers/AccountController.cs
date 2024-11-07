using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebBuilderAPI.Data;
using WebBuilderAPI.Repositories;
using WebBuilderAPI.RequestModels;

namespace WebBuilderAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly AccountRepository _accountRepository;
        public AccountController(AccountRepository accountRepository) 
        {
            _accountRepository = accountRepository;
        }

        [HttpPost]
        public async Task<IActionResult> NewAccount([FromBody] AccountRequestModel account)
        {
            try
            {
                Account newAccount = new Account()
                {
                    Email = account.Email,
                    Password = account.Password,
                    FirstName = account.FirstName,
                    LastName = account.LastName
                };

                await _accountRepository.NewAccount(newAccount);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"{ ex.Message} - {ex.InnerException?.Message}");
            }
        }
    }
}
