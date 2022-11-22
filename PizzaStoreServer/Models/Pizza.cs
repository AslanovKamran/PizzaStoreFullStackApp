
using System.Text.Json.Serialization;

namespace PizzaStoreWebApi.Models
{
	public class Pizza
	{
		public int Id { get; set; }
		public string ImageUrl { get; set; } = string.Empty;
		public string Title { get; set; } = string.Empty;
		public decimal Price { get; set; } 
		public string Category { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;

		public int CategoryId { get; set; }		

		[JsonIgnore]
		public IFormFile? ImageFile { get; set; }
	}
}