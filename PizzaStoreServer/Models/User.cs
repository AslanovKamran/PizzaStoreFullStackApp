using System.ComponentModel.DataAnnotations;

namespace PizzaStoreWebApi.Models
{
	public class User
	{
		[Key]
		public int Id { get; set; }

		[Required(AllowEmptyStrings =false)]
		public string Login { get; set; } = string.Empty;

		[Required(AllowEmptyStrings =false)]
		public string Password { get; set; } = string.Empty;
		public bool IsAdmin { get; set; }
	}
}
