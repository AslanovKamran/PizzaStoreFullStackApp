GO
USE master

GO
CREATE DATABASE PizzaStore

GO 
USE PizzaStore

GO
CREATE TABLE Category(
[Id] INT PRIMARY KEY IDENTITY,
[Name] NVARCHAR (100) NOT NULL,

CONSTRAINT UK_NAME UNIQUE ([Name])
)



GO
CREATE PROC GetCategories
AS
BEGIN
SELECT * FROM Category ORDER BY Category.Id
END

GO
CREATE PROC GetCategoryById @Id INT
AS
BEGIN
SELECT Category.Id, Category.Name FROM Category WHERE Category.Id = @Id
END

GO
CREATE PROC AddNewCategory @Name NVARCHAR (100)
AS
BEGIN
INSERT INTO Category VALUES (@Name)
END

GO
CREATE PROC DeleteCategoryById @Id INT
AS
BEGIN
DELETE FROM Category WHERE Category.Id = @Id
END

GO
CREATE PROC GetCategoriesCount
AS
BEGIN
SELECT COUNT(*) as[CategoriesCount] FROM Category
END



GO
CREATE TABLE Pizza(
[Id] INT PRIMARY KEY IDENTITY,
[ImageUrl] NVARCHAR(255),
[Title] NVARCHAR(255) NOT NULL,
[Price] DECIMAL (9,2) NOT NULL,
[CategoryId] INT FOREIGN KEY REFERENCES Category(Id) NOT NULL,
[Description] NVARCHAR(255) NOT NULL,

CONSTRAINT UK_TITLE UNIQUE (Title),
CONSTRAINT CK_PRICE CHECK (Price>0)
)

GO
CREATE PROC GetPizzas
AS
BEGIN
SELECT Pizza.Id, Pizza.ImageUrl, Pizza.Title, Pizza.Price, Pizza.Description, Category.Name AS [Category], Category.Id AS [CategoryId] FROM Pizza 
JOIN Category ON Pizza.CategoryId = Category.Id
END

GO 
CREATE PROC GetPizzaById @Id INT
AS
BEGIN
SELECT Pizza.Id, Pizza.ImageUrl, Pizza.Title, Pizza.Price, Pizza.Description, Category.Name AS [Category], Category.Id AS [CategoryId] FROM Pizza 
JOIN Category ON Pizza.CategoryId = Category.Id
WHERE Pizza.Id = @Id
END

GO
CREATE PROC DeletePizzaById @Id INT 
AS
BEGIN
DELETE FROM Pizza WHERE Pizza.Id = @Id
END

GO 
CREATE PROC GetPizzasByCategoryId @Id INT
AS
BEGIN
SELECT * FROM Pizza WHERE Pizza.CategoryId = @Id
END

GO
CREATE PROC GetPizzasCount 
AS
BEGIN
SELECT COUNT(*) as [PizzasCount] FROM Pizza
END

GO
CREATE PROC UpdatePizza @Id INT, @Title NVARCHAR(255), @Price DECIMAL(9,2), @Description NVARCHAR(255), @CategoryId INT
AS
BEGIN
UPDATE Pizza SET Pizza.Title = @Title, Pizza.Price = @Price, Pizza.Description = @Description, Pizza.CategoryId = @CategoryId WHERE Pizza.Id = @Id
END



GO
CREATE TABLE [User]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[Login] NVARCHAR (255) NOT NULL,
	[Password] NVARCHAR(100) NOT NULL,
	[IsAdmin] BIT DEFAULT 0,

	CONSTRAINT USER_LOGIN_UK UNIQUE ([Login])
)

GO
CREATE PROC AddAUser @Login NVARCHAR(255), @Password NVARCHAR(100), @IsAdmin BIT
AS
BEGIN 
INSERT INTO [User] (Login,Password,IsAdmin) VALUES (@Login, @Password,@IsAdmin)
END

GO 
CREATE PROC GetUsers 
AS
BEGIN
SELECT * FROM [User]
END

GO
CREATE PROC AuthorizeUser @Login NVARCHAR(255), @Password NVARCHAR(100)
AS
BEGIN 
SELECT * FROM [User] WHERE [User].Login = @Login AND [User].Password = @Password
END

GO
CREATE PROC GetUsersCount
AS
BEGIN
SELECT COUNT(*) FROM [User]
END

GO
AddAUser @Login = N'admin', @Password =N'admin', @IsAdmin = 1



GO
CREATE Table [Order]
(
[Id] INT PRIMARY KEY IDENTITY,
[UserId] INT FOREIGN KEY REFERENCES [User](Id),
[PizzaId] INT FOREIGN KEY REFERENCES [Pizza](Id),
[PizzaCount] INT,
[OrderDate] DATE DEFAULT GETDATE(),
)

GO
CREATE PROC AddAnOrder @UserId INT, @PizzaId INT, @PizzaCount INT
AS
BEGIN
INSERT INTO [Order] (UserId, PizzaId,PizzaCount) VALUES (@UserId,@PizzaId,@PizzaCount)
END


GO 
CREATE PROC GetAllOrders
AS
BEGIN
SELECT * FROM [Order]
END

GO
CREATE PROC GetUserOrdersById @Id INT
AS
BEGIN
SELECT * FROM [Order] WHERE [Order].UserId = @Id
END

