using PizzaStoreWebApi.Models;

namespace PizzaStoreWebApi.Extensions
{
	public static class PizzaExtensions
	{
		public static List<Pizza> Sort(this List<Pizza> pizzas, string sortBy, string orderBy)
		{
			var filteredData = new List<Pizza>();

			if (orderBy == "asc")
			{
				switch (sortBy)
				{

					case "price": { filteredData = pizzas.OrderBy(p => p.Price).ToList(); } break;
					default:
						{ filteredData = pizzas.OrderBy(p => p.Title).ToList(); }
						break;
				}
			}
			
			else if(orderBy == "desc")
			{
				switch (sortBy)
				{

					case "price": { filteredData = pizzas.OrderByDescending(p => p.Price).ToList(); } break;
					default:
						{ filteredData = pizzas.OrderByDescending(p => p.Title).ToList(); }
						break;
				}
			}

			else
			{
				return pizzas.OrderBy(p => p.Title).ToList();
			}

			return filteredData;


		}

		public static List<Pizza> Category(this List<Pizza> pizzas, string category)
		{

			if (string.IsNullOrWhiteSpace(category)) return pizzas;

			var emptyList = Enumerable.Empty<Pizza>();

			pizzas = category switch
			{

				"1" => pizzas.FindAll(x => x.CategoryId == 1).ToList(),
				"2" => pizzas.FindAll(x => x.CategoryId == 2).ToList(),
				"3" => pizzas.FindAll(x => x.CategoryId == 3).ToList(),
				"4" => pizzas.FindAll(x => x.CategoryId == 4).ToList(),
				_ => emptyList.ToList()
			};

			return pizzas;
		}
	}
}
