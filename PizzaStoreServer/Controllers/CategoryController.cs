using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaStoreWebApi.Models;
using PizzaStoreWebApi.Repository;

namespace PizzaStoreWebApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CategoryController : ControllerBase
	{
		private readonly ICategoryRepository _repos;
		public CategoryController(ICategoryRepository repos)
		{
			_repos = repos;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			var categories = await _repos.GetCategoriesAsync();
			return Ok(categories);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(int id)
		{
			var category = await _repos.GetCategoryByIdAsync(id);
			if (category == null)
			{
				return NotFound(new ProblemDetails { Title = "Wrong Category Id" });
			}
			return Ok(category);
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromForm]Category category)
		{
			if(category == null) return BadRequest(new ProblemDetails { Title = "No Category Found to post" });
			await _repos.AddCategoryAsync(category);
			return Ok($"{category.Name} Posted Successfully");
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			var category = await _repos.GetCategoryByIdAsync(id);
			if (category == null)
			{
				return BadRequest("Category hasn't been found");
			}
			try
			{
			await _repos.DeleteCategoryAsync(id);
			return Ok("Category has been deleted");

			}
			catch (Exception)
			{
				var problem = new ProblemDetails { Title = "Cannot delete Category Because you have pizzas in this category =(" };
				var pizzas = await _repos.GetPizzasByCategoryId(id);
				var Obj = new
				{
					problem,
					pizzas
				};
				return StatusCode(500, Obj);
			}
		}

		[Route("GetPizzasByCategoryId/{id}")]
		[HttpGet]
		public async Task<IActionResult> GetPizzasByCategoryId(int id)
		{
			var pizzas = await _repos.GetPizzasByCategoryId(id);
			if(pizzas == null)
			{
				return NotFound();
			}
			return Ok(pizzas);
		}

		[Route("GetPizzasCountByCategoryId/{id}")]
		[HttpGet]
		public async Task<IActionResult> GetPizzasCountByCategoryId(int id)
		{
			var result = await _repos.GetPizzaCountByCategoryId(id);
			if (result == null)
			{
				return NotFound();
			}
			return Ok(result);
		}


		[HttpPut]
		public async Task<IActionResult> UpdateCategory([FromForm] Category category)
		{
			if (category == null) return BadRequest("Cannot Update A Category");
			await _repos.UpdateCategoryAsync(category);
			return Ok("Updated");
		}

	}
}
