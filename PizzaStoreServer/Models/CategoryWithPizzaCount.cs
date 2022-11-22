using System.ComponentModel.DataAnnotations;

namespace PizzaStoreWebApi.Models
{
	public class CategoryWithPizzaCount
	{
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public int PizzasCount { get; set; }


	}
}
