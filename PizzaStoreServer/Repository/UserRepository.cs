using Dapper;
using PizzaStoreWebApi.Models;
using System.Data;
using System.Data.SqlClient;

namespace PizzaStoreWebApi.Repository
{
	public class UserRepository : IUserRepository
	{
		private readonly string _connectionString;

		public UserRepository(string connectionString)
		{
			_connectionString = connectionString;
		}

		public async Task<List<User>> GetUsersAsync()
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				//The stored procedure that selects all the pizzas joining the relevant category
				string query = @"exec GetUsers";
				return (await db.QueryAsync<User>(query, null)).ToList();
			}
		}

		public async Task AddUserAsync(User user)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{

				string query = @"exec AddAUser @Login = @Login, @Password = @Password, @IsAdmin = @IsAdmin";
				await db.ExecuteAsync(query, user);
			}
		}

		public async Task<User> AuthorizeUserAsync(string login, string password)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				
				string query = @"exec AuthorizeUser @Login = @login, @Password = @password";
				var result = await (db.QueryFirstOrDefaultAsync<User>(query, new { login,password }));
				return result;
			}
		}
	}
}
