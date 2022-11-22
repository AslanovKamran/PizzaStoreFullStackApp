namespace PizzaStoreWebApi.Repository
{
	public interface IDbInfoRepository
	{
		Task<int> GetPizzasCountAsync();
		Task<int> GetUsersCountAsync();
		Task<int> GetCategoriesCountAsync();
	}
}
