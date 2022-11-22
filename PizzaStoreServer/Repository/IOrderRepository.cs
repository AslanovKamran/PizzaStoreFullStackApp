using PizzaStoreWebApi.Models;

namespace PizzaStoreWebApi.Repository
{
	public interface IOrderRepository
	{
		Task AddNewOrderAsync(Order order);
		Task<List<Order>> GetAllOrdersAsync();
		Task AddListOfOrders(List<Order> orders);
		Task <Order> GetOrderByUserId(int id);
	}
}
