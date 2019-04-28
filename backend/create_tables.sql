DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Shipment;
DROP TABLE IF EXISTS ShipType;
DROP TABLE IF EXISTS ShipCompany;
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS ShoppingCartContents;
DROP TABLE IF EXISTS Listing;
DROP TABLE IF EXISTS ItemImage;
DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Purchase;
DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS PaymentType;
DROP TABLE IF EXISTS Address;
DROP TABLE IF EXISTS Seller;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS ShoppingCart;

CREATE TABLE ShoppingCart (
	CartID INT AUTO_INCREMENT,
	
	PRIMARY KEY (CartID)
);

CREATE TABLE Users (
	Email VARCHAR(30) NOT NULL,
	PW CHAR(60) NOT NULL,

	PRIMARY KEY (Email)
);

CREATE TABLE Customer (
	Email VARCHAR(30),
    FirstName VARCHAR(20) NOT NULL,
    LastName VARCHAR(20) NOT NULL,
    CurrentCart INT NOT NULL,

    FOREIGN KEY (Email)
        REFERENCES Users(Email),
    FOREIGN KEY (CurrentCart)
		REFERENCES ShoppingCart(CartID),

	PRIMARY KEY (Email)
);

CREATE TABLE Seller (
	Email VARCHAR(20),
	DisplayName VARCHAR(20) NOT NULL,

	FOREIGN KEY (Email)
		REFERENCES Users(Email),
	PRIMARY KEY (Email)
);

CREATE TABLE PaymentType(
    PaymentType VARCHAR(20),

    PRIMARY KEY (PaymentType)
);

CREATE TABLE Address (
	AddressID INT AUTO_INCREMENT,
	RecipientName VARCHAR(20) NOT NULL,
	Address VARCHAR(20) NOT NULL,
	City VARCHAR(20) NOT NULL,
	State CHAR(2) NOT NULL,
	Country VARCHAR(20) NOT NULL,
	Zip INT NOT NULL,
	UserID VARCHAR(30) NOT NULL,

	FOREIGN KEY (UserID)
		REFERENCES Users(Email),

	PRIMARY KEY (AddressID)
);

CREATE TABLE Payment (
	PaymentID INT AUTO_INCREMENT,
	PaymentType VARCHAR(20) NOT NULL,
	PaymentKey INT NOT NULL,
	ExpirationDate DATE,
	CVV INT,
	BillingAddress INT,
	UserID VARCHAR(30) NOT NULL,

	FOREIGN KEY (PaymentType)
        REFERENCES PaymentType(PaymentType),
	FOREIGN KEY (BillingAddress)
		REFERENCES Address(AddressID),
	FOREIGN KEY (UserID)
		REFERENCES Users(Email),

	PRIMARY KEY (PaymentID)
);

CREATE TABLE Purchase (
	OrderID INT AUTO_INCREMENT,
	ShoppingCart INT NOT NULL,
	Customer VARCHAR(30) NOT NULL,
    PurchaseDate DATE NOT NULL,
    TotalPrice INT NOT NULL,
    Payment INT NOT NULL,
    Address INT NOT NULL,

    FOREIGN KEY (ShoppingCart)
        REFERENCES ShoppingCart(CartID),
    FOREIGN KEY (Customer)
        REFERENCES Customer(Email),
    FOREIGN KEY (Payment)
        REFERENCES Payment(PaymentID),
    FOREIGN KEY (Address)
        REFERENCES Address(AddressID),

    PRIMARY KEY(OrderID)
);

CREATE TABLE Category (
	CategoryName VARCHAR(20),

	PRIMARY KEY (CategoryName)
);

CREATE TABLE Item (
	ItemID INT AUTO_INCREMENT,
	ItemName VARCHAR(50) NOT NULL,
	Summary TEXT,
	Manufacturer VARCHAR(20) NOT NULL,
    Category VARCHAR(20) NOT NULL,
	
    FOREIGN KEY (Category)
		REFERENCES Category(CategoryName),

	PRIMARY KEY (ItemID)
);

CREATE TABLE ItemImage (
	ItemID INT,
	ImageURL VARCHAR(100),

	FOREIGN KEY (ItemID)
		REFERENCES Item(ItemID),
        
	PRIMARY KEY (ItemID, ImageURL)
);

CREATE TABLE Listing (
	Item INT,
	Seller VARCHAR(30),
	Quantity INT NOT NULL CHECK(Quantity >= 0),
	Price INT NOT NULL CHECK(Price > 0),
	
	FOREIGN KEY (Item)
		REFERENCES Item(ItemID),
	FOREIGN KEY (Seller)
		REFERENCES Seller(Email),

	PRIMARY KEY (Item, Seller)
);

CREATE TABLE ShoppingCartContents (
	CartID INT,
	Item INT,
	Seller VARCHAR(30),
	Quantity INT DEFAULT 1,

	FOREIGN KEY (Item, Seller)
	    REFERENCES Listing(Item, Seller),
    FOREIGN KEY (CartID)
	    REFERENCES ShoppingCart(CartID),

	PRIMARY KEY (CartID, Item, Seller)
);

CREATE TABLE Review (
    ReviewID INT AUTO_INCREMENT,
    Rating INT NOT NULL
        CHECK (Rating >= 1 AND Rating <= 5),
    Title VARCHAR(30), 
    Body TEXT,
    Customer VARCHAR(30) NOT NULL,
    ItemID INT,
    Seller VARCHAR(30),

    CHECK (ItemID IS NULL OR Seller IS NULL),

    FOREIGN KEY (Customer)
        REFERENCES Customer(Email),
    FOREIGN KEY (Seller)
        REFERENCES Seller(Email),
    FOREIGN KEY (ItemID)
        REFERENCES Item(ItemID),

    PRIMARY KEY (ReviewID)
);

CREATE TABLE ShipCompany(
	Company VARCHAR(20),

    PRIMARY KEY (Company)
);

CREATE TABLE ShipType (
	Company VARCHAR(20),
	Speed VARCHAR(20),
	Price INT NOT NULL CHECK (Price >= 0),
	
	FOREIGN KEY (Company)
        REFERENCES ShipCompany(Company),

	PRIMARY KEY(Company, Speed)
);

CREATE TABLE Shipment(
	ShipmentID INT AUTO_INCREMENT,
	TrackingNumber VARCHAR(20),
	Purchase INT NOT NULL,
	Seller VARCHAR(30) NOT NULL,
    Company VARCHAR(20),
    Speed VARCHAR(20),
    ShipDate DATE,

    FOREIGN KEY (Purchase)
		REFERENCES Purchase(OrderID),
    FOREIGN KEY (Seller)
		REFERENCES Seller(Email),
	FOREIGN KEY (Company, Speed)
		REFERENCES ShipType(Company, Speed),

	PRIMARY KEY (ShipmentID)
);

CREATE TABLE Employee (
    EmployeeID INT AUTO_INCREMENT,
    PW CHAR(60) NOT NULL,
    Title VARCHAR(20) NOT NULL
        CHECK (Title IN ('CSRep', 'Admin')),
    Supervisor INT,

    FOREIGN KEY (Supervisor)
        REFERENCES Employee(EmployeeID),

    PRIMARY KEY (EmployeeID)
);
