using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaStoreWebApi.Models;
using PizzaStoreWebApi.Repository;

namespace PizzaStoreWebApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OrderController : ControllerBase
	{
		private readonly IOrderRepository _repos;
		public OrderController(IOrderRepository repos)
		{
			_repos = repos;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			var orders = await _repos.GetAllOrdersAsync();
			if (orders == null) return NotFound("There are no orders");
			return Ok(orders);
		}

		[HttpGet]
		[Route("GetOrdersByUserId/{id}")]
		public async Task<IActionResult> GetOrderByUserId(int id)
		{
			var order = await _repos.GetAllOrdersAsync();
			if (order == null) return NotFound("There is no orders by this User");
			return Ok(order);
		}

		[HttpPost]
		public async Task<IActionResult> Post(Order order)
		{
			if (order == null) return BadRequest(new ProblemDetails { Title = "No Order Found to post" });
			await _repos.AddNewOrderAsync(order);
			return Ok(order);
		}

		[HttpPost]
		[Route("PostList")]
		public async Task<IActionResult> PostList(List<Order> orders)
		{
			if(orders == null || orders.Count == 0)
			{
				return BadRequest(new ProblemDetails { Title = "No Order Found to post" });
			}

			await _repos.AddListOfOrders(orders);

			return Ok("Posted");
		}


	}
}
