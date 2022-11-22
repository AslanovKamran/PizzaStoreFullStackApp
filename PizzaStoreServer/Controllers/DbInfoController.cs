using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaStoreWebApi.Models;
using PizzaStoreWebApi.Repository;

namespace PizzaStoreWebApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DbInfoController : ControllerBase
	{
		private readonly IDbInfoRepository _repos;

		public DbInfoController(IDbInfoRepository repos)
		{
			_repos = repos;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{

			var pizzasCount = await _repos.GetPizzasCountAsync();
			var usersCount = await _repos.GetUsersCountAsync();
			var categoriesCount = await _repos.GetCategoriesCountAsync();

			var dbInfo = new DBInfo(usersCount, categoriesCount, pizzasCount);

			return Ok(dbInfo);
			

		}
	}
}
