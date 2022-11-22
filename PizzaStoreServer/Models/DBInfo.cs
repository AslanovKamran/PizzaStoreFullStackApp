namespace PizzaStoreWebApi.Models
{
	public class DBInfo
	{
		public int AmountOfUsers { get; set; }
		public int AmountOfCategories { get; set; }
		public int AmountOfPizza { get; set; }

		
		public DBInfo(int amoutOfUsers, int amoutOfCategories, int amoutOfPizza)
		{
			AmountOfUsers = amoutOfUsers;
			AmountOfCategories = amoutOfCategories;
			AmountOfPizza = amoutOfPizza;
		}
	}
}
