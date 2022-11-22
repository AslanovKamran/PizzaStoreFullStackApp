using Dapper;
using PizzaStoreWebApi.Models;
using System.Data;
using System.Data.SqlClient;

namespace PizzaStoreWebApi.Repository
{
	public class CategoryRepository : ICategoryRepository
	{

		private readonly string _connectionString;

		public CategoryRepository(string connectionString)
		{
			_connectionString = connectionString;
		}

		public async Task AddCategoryAsync(Category category)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				string query = @"exec AddNewCategory @Name";
				await db.ExecuteAsync(query, category);
			}
		}

		public async Task<List<Category>> GetCategoriesAsync()
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				//The stored procedure that selects all the categories joining the relevant category
				string query = @"exec GetCategories";
				return (await db.QueryAsync<Category>(query, null)).ToList();
			}
		}

		public async Task<Category> GetCategoryByIdAsync(int id)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				//The stored procedure that selects one pizza by Id
				string query = @"exec GetCategoryById @Id = @id";
				var result = await(db.QueryFirstOrDefaultAsync<Category>(query, new { id }));
				return result;
			}
		}

		public async Task DeleteCategoryAsync(int id)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				string query = "exec DeleteCategoryById @Id = @id";
				await db.ExecuteAsync(query, new { id });
			}
		}

		public async Task<List<Pizza>> GetPizzasByCategoryId(int id)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{

				string query = @"exec GetPizzasByCategoryId @Id = @id";
				return (await db.QueryAsync<Pizza>(query, new {id})).ToList();
			}
		}

		public async Task<CategoryWithPizzaCount> GetPizzaCountByCategoryId(int id)
		{
			var category = await GetCategoryByIdAsync(id);
			int? count;
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				string query = @"exec GetPizzasCountByCategoryId @Id = @id";
				count= await db.ExecuteScalarAsync<int>(query, new {id});
			}

			if (category != null)
			{
				if (count == null) count = 0;
				var result = new CategoryWithPizzaCount() { Id = category.Id, Name = category.Name, PizzasCount = (int)(count) };
				return result;

			}
			else return null;
		}

		public async Task UpdateCategoryAsync(Category category)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				string query = @"exec UpdateCategory @Id = @id, @Name = @Name";
				await db.ExecuteAsync(query, category);
			}
		}
	}
}
