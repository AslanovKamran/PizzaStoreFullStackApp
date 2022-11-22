namespace PizzaStoreWebApi.Models
{
	public class PizzaViewModel
	{
		public List<Pizza>? Pizzas { get; set; }
		public PageInfo PageInfo { get; set; } = new PageInfo();
	}
}
