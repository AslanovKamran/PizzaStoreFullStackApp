using PizzaStoreWebApi.Repository;

namespace PizzaStoreWebApi.Models
{
	public class PageInfo

	{

		public PageInfo()
		{
			ItemsPerPage = 8;
		}


		public decimal TotalPages { get 
			{
				return Math.Ceiling((decimal)TotalItems / (decimal)ItemsPerPage);
			} 
		}
		public int TotalItems { get; set; }
		public int ItemsPerPage { get; set; } 
	}
}
