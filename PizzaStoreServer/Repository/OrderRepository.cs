using Dapper;
using PizzaStoreWebApi.Models;
using System.Data;
using System.Data.SqlClient;

namespace PizzaStoreWebApi.Repository
{
	public class OrderRepository : IOrderRepository
	{
		private readonly string _connectionString;
		public OrderRepository(string connectionString)
		{
			_connectionString = connectionString;
		}

		public async Task AddListOfOrders(List<Order> orders)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				foreach (var item in orders)
				{
					string query = @"exec AddAnOrder @UserId = @UserId, @PizzaId = @PizzaId, @PizzaCount = @PizzaCount";
					await db.ExecuteAsync(query, item);

				}
			}
		}

		public async Task AddNewOrderAsync(Order order)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{

				string query = @"exec AddAnOrder @UserId = @UserId, @PizzaId = @PizzaId, @PizzaCount = @PizzaCount";
				await db.ExecuteAsync(query, order);
			}
		}

		public async Task<List<Order>> GetAllOrdersAsync()
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{

				string query = @"exec GetAllOrders";
				return (await db.QueryAsync<Order>(query, null)).ToList();
			}
		}

		public async Task<Order> GetOrderByUserId(int id)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{

				string query = @"exec GetUserOrdersById @Id = @id";
				var result = await (db.QueryFirstOrDefaultAsync<Order>(query, new { id }));
				return result;
			}
		}
	}
}
