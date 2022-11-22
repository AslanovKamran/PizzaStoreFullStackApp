using PizzaStoreWebApi.Models;

namespace PizzaStoreWebApi.Repository
{
	public interface ICategoryRepository
	{
		Task<List<Category>> GetCategoriesAsync();
		Task<Category> GetCategoryByIdAsync(int id);

		Task AddCategoryAsync(Category category);
		Task DeleteCategoryAsync(int id);

		Task <List<Pizza>> GetPizzasByCategoryId(int id);

		Task<CategoryWithPizzaCount>GetPizzaCountByCategoryId(int id);

		Task UpdateCategoryAsync(Category category);
	}
}
