using Microsoft.AspNetCore.Mvc;
using PizzaStoreWebApi.Models;
using PizzaStoreWebApi.Repository;
using PizzaStoreWebApi.Extensions;
using PizzaStoreWebApi.Helper;

namespace PizzaStoreWebApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PizzaController : ControllerBase
	{

		private readonly IPizzaRepository _repos;

		public PizzaController(IPizzaRepository repos)
		{
			_repos = repos;
		}

																													//Requests
		[HttpGet]
		public async Task<IActionResult> Get(string? category, string sortBy = "title", string orderBy = "asc", int page = 1)
		{

			var pizzaViewModel = new PizzaViewModel();
			var pizzas = (await _repos.GetPizzasAsync()).Category(category)
														.Sort(sortBy, orderBy)
														.ToList();

			pizzaViewModel.PageInfo.TotalItems = pizzas.Count;
			page = page > pizzaViewModel.PageInfo.TotalPages ? 1 : page;

			pizzaViewModel.Pizzas = (pizzas.Skip((page - 1) * pizzaViewModel.PageInfo.ItemsPerPage)
										  .Take(pizzaViewModel.PageInfo.ItemsPerPage)).ToList();
			return Ok(pizzaViewModel);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(int id)
		{
			var pizza = await _repos.GetPizzaAsync(id);
			if (pizza == null)
			{
				return NotFound(new ProblemDetails { Title="Wrong Pizza Id"});
			}
			return Ok(pizza);
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromForm] Pizza pizza)
		{
			if (pizza == null)
			{
				return BadRequest(new ProblemDetails { Title="No Pizza Found to post"});
			}
			pizza.ImageUrl = FileUploader.UploadFile(pizza.ImageFile);
			await _repos.AddPizzaAsync(pizza);
			return Ok("Posted: " + pizza.Title);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			var pizza = await _repos.GetPizzaAsync(id);
			if(pizza == null)
			{
				return BadRequest("Pizza hasn't been found");
			}
			FileEraser.DeleteImage(pizza.ImageUrl);
			await _repos.DeletePizzaAsync(id);
			return Ok("Pizza has been deleted");
		}

		[HttpPut]
		public async Task<IActionResult> Put([FromForm] Pizza pizza)
		{
			if (pizza == null)
			{
				return BadRequest();
			}
			await _repos.UdpatePizzaAsync(pizza);
			return Ok("Pizza updated succesfully!");
		}

		

	}
}
