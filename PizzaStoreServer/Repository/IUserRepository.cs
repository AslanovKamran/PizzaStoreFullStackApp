using PizzaStoreWebApi.Models;

namespace PizzaStoreWebApi.Repository
{
	public interface IUserRepository
	{
		Task AddUserAsync(User user);
		Task<List<User>> GetUsersAsync();

		Task<User> AuthorizeUserAsync(string login, string password);

	}
}
