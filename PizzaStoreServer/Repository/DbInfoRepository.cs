using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace PizzaStoreWebApi.Repository
{
	public class DbInfoRepository : IDbInfoRepository
	{
		private readonly string _connectionString;

		public DbInfoRepository(string connectionString)
		{
			_connectionString = connectionString;
		}

		public async Task<int> GetCategoriesCountAsync()
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				string query = @"exec GetCategoriesCount";
				return await db.ExecuteScalarAsync<int>(query);
			}
		}

		public async Task<int> GetPizzasCountAsync()
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				string query = @"exec GetPizzasCount";
				return await db.ExecuteScalarAsync<int>(query);
			}
		}

		public async Task<int> GetUsersCountAsync()
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				string query = @"exec GetUsersCount";
				return await db.ExecuteScalarAsync<int>(query);
			}
		}
	}
}
