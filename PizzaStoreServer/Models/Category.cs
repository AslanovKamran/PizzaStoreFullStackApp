using System.ComponentModel.DataAnnotations;

namespace PizzaStoreWebApi.Models
{
	public class Category
	{
		[Key]
		public int Id { get; set; }
		
		[Required(AllowEmptyStrings = false)] 
		public string Name { get; set; } = string.Empty;
	}
}
