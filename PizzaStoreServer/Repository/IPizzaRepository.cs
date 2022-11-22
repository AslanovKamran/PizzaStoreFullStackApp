using Microsoft.AspNetCore.Mvc;
using PizzaStoreWebApi.Models;

namespace PizzaStoreWebApi.Repository
{
	public interface IPizzaRepository
	{
		Task<List<Pizza>> GetPizzasAsync();
		Task<Pizza> GetPizzaAsync(int id);	

		Task AddPizzaAsync(Pizza pizza);
		Task DeletePizzaAsync(int id);

		Task UdpatePizzaAsync(Pizza pizza);

	}
}
