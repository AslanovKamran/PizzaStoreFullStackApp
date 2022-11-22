using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaStoreWebApi.Models;
using PizzaStoreWebApi.Repository;

namespace PizzaStoreWebApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IUserRepository _repos;

		public UserController(IUserRepository repos)
		{
			_repos = repos;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			List<User> users = await _repos.GetUsersAsync();
			if(users== null) return NoContent();
			return Ok(users);
				
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromForm] User user)
		{
			if (user == null) return BadRequest(new ProblemDetails { Title = "No User Found to post" });
			try
			{
			await _repos.AddUserAsync(user);
			return Ok(user);

			}
			catch (Exception)
			{
				return StatusCode(500, new ProblemDetails { Title = "Login is busy" });
			}
		}

		[HttpGet]
		[Route("Authorize")]
		public async Task<IActionResult> AuthorizeUser(string login, string password)
		{
			var user = await _repos.AuthorizeUserAsync(login, password);
			if (user == null) return NotFound(new ProblemDetails { Title = "Wrong login or password" });
			return Ok(user);
		}

	}
}
