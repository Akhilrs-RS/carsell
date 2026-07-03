using Microsoft.EntityFrameworkCore;
using CarSellApi.Models;

namespace CarSellApi.Data
{
    public class CarSellDbContext : DbContext
    {
        public CarSellDbContext(DbContextOptions<CarSellDbContext> options) : base(options)
        {
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<Inquiry> Inquiries { get; set; }
        public DbSet<SellRequest> SellRequests { get; set; }
        public DbSet<FinanceApplication> FinanceApplications { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Dealer> Dealers { get; set; }
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<JournalEntry> JournalEntries { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<ServiceBooking> ServiceBookings { get; set; }
        public DbSet<JobCard> JobCards { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<WishlistItem> WishlistItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed Luxury Cars matching our frontend assets and theme
            modelBuilder.Entity<Car>().HasData(
                new Car
                {
                    Id = 1,
                    Brand = "Porsche",
                    Model = "911 Carrera S",
                    Year = 2023,
                    KmDriven = 4500,
                    Price = 18500000m,
                    Color = "Arctic Silver",
                    FuelType = "Petrol",
                    Transmission = "Automatic",
                    ImageUrl = "/assets/b1.png",
                    IsFeatured = true,
                    CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 2,
                    Brand = "Audi",
                    Model = "R8 V10 Performance",
                    Year = 2022,
                    KmDriven = 8200,
                    Price = 22000000m,
                    Color = "Mythos Black",
                    FuelType = "Petrol",
                    Transmission = "Automatic",
                    ImageUrl = "/assets/b3.png",
                    IsFeatured = true,
                    CreatedAt = new DateTime(2026, 1, 5, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 3,
                    Brand = "BMW",
                    Model = "M4 Competition",
                    Year = 2023,
                    KmDriven = 6100,
                    Price = 14800000m,
                    Color = "Isle of Man Green",
                    FuelType = "Petrol",
                    Transmission = "Automatic",
                    ImageUrl = "/assets/b4.png",
                    IsFeatured = true,
                    CreatedAt = new DateTime(2026, 1, 10, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 4,
                    Brand = "Mercedes-Benz",
                    Model = "AMG GT 63 S",
                    Year = 2022,
                    KmDriven = 11000,
                    Price = 24500000m,
                    Color = "Selenite Grey Magno",
                    FuelType = "Petrol",
                    Transmission = "Automatic",
                    ImageUrl = "/assets/b5.png",
                    IsFeatured = true,
                    CreatedAt = new DateTime(2026, 1, 15, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 5,
                    Brand = "Range Rover",
                    Model = "Autobiography LWB",
                    Year = 2023,
                    KmDriven = 3400,
                    Price = 31000000m,
                    Color = "Santorini Black",
                    FuelType = "Diesel",
                    Transmission = "Automatic",
                    ImageUrl = "/assets/b6.png",
                    IsFeatured = true,
                    CreatedAt = new DateTime(2026, 1, 20, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 6,
                    Brand = "Lamborghini",
                    Model = "Huracan EVO RWD",
                    Year = 2021,
                    KmDriven = 9500,
                    Price = 34000000m,
                    Color = "Rosso Mars",
                    FuelType = "Petrol",
                    Transmission = "Automatic",
                    ImageUrl = "/assets/b7.png",
                    IsFeatured = false,
                    CreatedAt = new DateTime(2026, 1, 25, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 7,
                    Brand = "Ferrari",
                    Model = "F8 Tributo",
                    Year = 2022,
                    KmDriven = 5200,
                    Price = 41000000m,
                    Color = "Rosso Corsa",
                    FuelType = "Petrol",
                    Transmission = "Automatic",
                    ImageUrl = "/assets/b8.png",
                    IsFeatured = false,
                    CreatedAt = new DateTime(2026, 2, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 8,
                    Brand = "Aston Martin",
                    Model = "DBX 707",
                    Year = 2023,
                    KmDriven = 4100,
                    Price = 29000000m,
                    Color = "Xenon Grey",
                    FuelType = "Petrol",
                    Transmission = "Automatic",
                    ImageUrl = "/assets/b9.png",
                    IsFeatured = false,
                    CreatedAt = new DateTime(2026, 2, 5, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 9,
                    Brand = "Bentley",
                    Model = "Continental GT V8",
                    Year = 2022,
                    KmDriven = 7800,
                    Price = 36000000m,
                    Color = "Beluga Black",
                    FuelType = "Petrol",
                    Transmission = "Automatic",
                    ImageUrl = "/assets/b10.png",
                    IsFeatured = false,
                    CreatedAt = new DateTime(2026, 2, 10, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 10,
                    Brand = "Rolls-Royce",
                    Model = "Ghost Series II",
                    Year = 2023,
                    KmDriven = 2900,
                    Price = 69000000m,
                    Color = "English White",
                    FuelType = "Petrol",
                    Transmission = "Automatic",
                    ImageUrl = "/assets/b11.png",
                    IsFeatured = false,
                    CreatedAt = new DateTime(2026, 2, 15, 0, 0, 0, DateTimeKind.Utc)
                }
            );

            // Seed ERP Accounts
            modelBuilder.Entity<Account>().HasData(
                new Account { Id = 1, Code = "1010", Name = "Cash Account", Type = "Asset", Balance = 15000000m },
                new Account { Id = 2, Code = "1020", Name = "HDFC Bank", Type = "Asset", Balance = 85000000m },
                new Account { Id = 3, Code = "1200", Name = "Accounts Receivable", Type = "Asset", Balance = 4500000m },
                new Account { Id = 4, Code = "2010", Name = "Accounts Payable", Type = "Liability", Balance = 1200000m },
                new Account { Id = 5, Code = "3010", Name = "Owner Equity", Type = "Equity", Balance = 90000000m },
                new Account { Id = 6, Code = "4010", Name = "Car Sales Revenue", Type = "Revenue", Balance = 15800000m },
                new Account { Id = 7, Code = "5010", Name = "Salary Expense", Type = "Expense", Balance = 2500000m }
            );

            // Seed Employees
            modelBuilder.Entity<Employee>().HasData(
                new Employee { Id = 1, Name = "Sanjay Kumar", Department = "Sales", Position = "Sales Director", Salary = 120000m, Status = "Active", DateHired = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new Employee { Id = 2, Name = "Ananya Sen", Department = "Finance", Position = "Chief Accountant", Salary = 95000m, Status = "Active", DateHired = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new Employee { Id = 3, Name = "Ramesh Pujari", Department = "Workshop", Position = "Senior Mechanic", Salary = 60000m, Status = "Active", DateHired = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new Employee { Id = 4, Name = "Pooja Patil", Department = "HR", Position = "HR Executive", Salary = 55000m, Status = "Active", DateHired = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
            );

            // Seed Service Bookings
            modelBuilder.Entity<ServiceBooking>().HasData(
                new ServiceBooking { Id = 1, CustomerName = "Vijay Mallya", VehicleDetails = "Audi R8 (MH-01-AB-1234)", ServiceType = "Engine Tuning", AssignedMechanic = "Ramesh Pujari", Status = "In Progress", CreatedAt = new DateTime(2026, 6, 1, 0, 0, 0, DateTimeKind.Utc) },
                new ServiceBooking { Id = 2, CustomerName = "Karan Johar", VehicleDetails = "Rolls-Royce Ghost (MH-02-CD-5678)", ServiceType = "General Service", AssignedMechanic = "Ramesh Pujari", Status = "QC", CreatedAt = new DateTime(2026, 6, 5, 0, 0, 0, DateTimeKind.Utc) }
            );

            // Seed Customers
            modelBuilder.Entity<Customer>().HasData(
                new Customer { Id = 1, FullName = "Amitabh Bachchan", Email = "amitabh@bachchan.com", Phone = "+91 99999 11111", Address = "Jalsa, Juhu, Mumbai", PurchaseHistory = "Rolls-Royce Ghost (2023)", CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new Customer { Id = 2, FullName = "Shah Rukh Khan", Email = "srk@mannat.com", Phone = "+91 99999 22222", Address = "Mannat, Bandra, Mumbai", PurchaseHistory = "BMW M4 Competition (2023)", CreatedAt = new DateTime(2026, 1, 5, 0, 0, 0, DateTimeKind.Utc) }
            );

            // Seed Users for Customer Portal
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, FullName = "Amitabh Bachchan", Email = "amitabh@bachchan.com", PasswordHash = "amitabh123", Phone = "+91 99999 11111", CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
            );

            // Seed initial Wishlist link (Amitabh Bachchan saves the Porsche 911)
            modelBuilder.Entity<WishlistItem>().HasData(
                new WishlistItem { Id = 1, UserId = 1, CarId = 1, CreatedAt = new DateTime(2026, 1, 2, 0, 0, 0, DateTimeKind.Utc) }
            );

            // Seed Dealers (Approved & Pending Review)
            modelBuilder.Entity<Dealer>().HasData(
                new Dealer 
                { 
                    Id = 1, 
                    BusinessName = "Elite Motors Mumbai", 
                    Email = "dealer@autohub.in", 
                    Phone = "+91 90000 55555", 
                    VerificationStatus = "Approved", 
                    Documents = "gst_cert.pdf,pan_card.pdf", 
                    ContactPerson = "Rajesh Sharma", 
                    City = "Mumbai", 
                    GstNumber = "27AAACX1234M1Z5", 
                    PasswordHash = "dealer123", 
                    CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) 
                },
                new Dealer 
                { 
                    Id = 2, 
                    BusinessName = "Royal Auto Bengaluru", 
                    Email = "pending@autohub.in", 
                    Phone = "+91 90000 66666", 
                    VerificationStatus = "Pending Review", 
                    Documents = "incorporation_doc.pdf", 
                    ContactPerson = "Karthik Gowda", 
                    City = "Bengaluru", 
                    GstNumber = "29AAACX5678M2Z9", 
                    PasswordHash = "dealer123", 
                    CreatedAt = new DateTime(2026, 1, 15, 0, 0, 0, DateTimeKind.Utc) 
                }
            );
        }
    }
}
