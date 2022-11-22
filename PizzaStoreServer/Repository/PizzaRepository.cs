using Dapper;
using Microsoft.AspNetCore.Mvc;
using PizzaStoreWebApi.Helper;
using PizzaStoreWebApi.Models;
using System.Data;
using System.Data.SqlClient;

namespace PizzaStoreWebApi.Repository
{
	public class PizzaRepository : IPizzaRepository
	{
		private readonly string _connectionString;
		public PizzaRepository(string connectionString)
		{
			_connectionString = connectionString;
		}


		public async Task<List<Pizza>> GetPizzasAsync()
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				//The stored procedure that selects all the pizzas joining the relevant category
				string query = @"exec GetPizzas"; 
				return (await db.QueryAsync<Pizza>(query, null)).ToList();
			}
		}


		public async Task AddPizzaAsync(Pizza pizza)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{

				string query = @"INSERT INTO Pizza VALUES (@ImageUrl, @Title, @Price, @CategoryId, @Description)";
				await db.ExecuteAsync(query, pizza);
			}
		}

		public async Task<Pizza> GetPizzaAsync(int id)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				//The stored procedure that selects one pizza by Id
				string query = @"exec GetPizzaById @Id = @id";
				var result =  await (db.QueryFirstOrDefaultAsync<Pizza>(query, new { id }));
				return result;
			}
		}

		public async Task DeletePizzaAsync(int id)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				string query = "exec DeletePizzaById @Id = @id";
				await db.ExecuteAsync(query, new { id });
			}
		}

		public async Task UdpatePizzaAsync(Pizza pizza)
		{
			using (IDbConnection db = new SqlConnection(_connectionString))
			{
				string query = @"exec UpdatePizza @Id = @Id, @Title = @Title, @Price = @Price, @Description = @Description, @CategoryId = @CategoryId";
				await db.ExecuteAsync(query, pizza);
			}
		}
	}
}
