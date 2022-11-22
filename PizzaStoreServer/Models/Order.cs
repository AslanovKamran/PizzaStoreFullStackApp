using System.ComponentModel.DataAnnotations;

namespace PizzaStoreWebApi.Models
{
	public class Order
	{
		[Key]
		public int Id { get; set; }
		
		[Required]
		public int UserId { get; set; }
		[Required]
		public int PizzaId { get; set; }
		[Required]
		public int PizzaCount { get; set; }
		         
		public DateTime OrderDate { get; set; }
	}
}

