using PizzaStoreWebApi.Repository;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

//Go to appsettings.json and type your particular Connection String there
var connectionString = builder.Configuration.GetConnectionString("Default");

builder.Services.AddTransient<IPizzaRepository, PizzaRepository>(provider => new PizzaRepository(connectionString));
builder.Services.AddTransient<ICategoryRepository, CategoryRepository>(provider => new CategoryRepository(connectionString));
builder.Services.AddTransient<IUserRepository, UserRepository>(provider => new UserRepository(connectionString));
builder.Services.AddTransient<IOrderRepository, OrderRepository>(provider => new OrderRepository(connectionString));
builder.Services.AddTransient<IDbInfoRepository, DbInfoRepository>(provider => new DbInfoRepository(connectionString));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseStaticFiles();

app.UseRouting();

app.UseCors(options =>
{
	options.AllowAnyMethod();
	options.AllowAnyHeader();
	options.AllowAnyOrigin();
});

app.UseAuthorization();

app.MapControllers();

app.Run();
