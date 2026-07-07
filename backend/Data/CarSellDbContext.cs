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

            // Seed Luxury Cars matching our screenshot list
            modelBuilder.Entity<Car>().HasData(
                new Car
                {
                    Id = 1,
                    Brand = "Toyota",
                    Model = "Fortuner 4x2 AT",
                    Year = 2018,
                    KmDriven = 72000,
                    Price = 2950000m,
                    Color = "White",
                    FuelType = "Diesel",
                    Transmission = "Automatic",
                    ImageUrl = "https://images.unsplash.com/photo-1625210755976-97e50c765fcd?auto=format&fit=crop&q=80&w=800",
                    IsFeatured = true,
                    CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 2,
                    Brand = "Toyota",
                    Model = "Urban Cruiser Hyryder V",
                    Year = 2022,
                    KmDriven = 24000,
                    Price = 1490000m,
                    Color = "Red",
                    FuelType = "Hybrid",
                    Transmission = "Automatic",
                    ImageUrl = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
                    IsFeatured = false,
                    CreatedAt = new DateTime(2026, 1, 5, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 3,
                    Brand = "Hyundai",
                    Model = "Creta SX",
                    Year = 2021,
                    KmDriven = 52480,
                    Price = 1340000m,
                    Color = "Silver",
                    FuelType = "Diesel",
                    Transmission = "Automatic",
                    ImageUrl = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800",
                    IsFeatured = false,
                    CreatedAt = new DateTime(2026, 1, 10, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 4,
                    Brand = "Kia",
                    Model = "Seltos HTX",
                    Year = 2022,
                    KmDriven = 22800,
                    Price = 1425000m,
                    Color = "White",
                    FuelType = "Petrol",
                    Transmission = "Manual",
                    ImageUrl = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
                    IsFeatured = false,
                    CreatedAt = new DateTime(2026, 1, 15, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 5,
                    Brand = "Maruti Suzuki",
                    Model = "Grand Vitara Alpha",
                    Year = 2023,
                    KmDriven = 18700,
                    Price = 1560000m,
                    Color = "Blue",
                    FuelType = "Hybrid",
                    Transmission = "Automatic",
                    ImageUrl = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=800",
                    IsFeatured = false,
                    CreatedAt = new DateTime(2026, 1, 20, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 6,
                    Brand = "Mercedes-Benz",
                    Model = "C-Class C220d",
                    Year = 2017,
                    KmDriven = 48200,
                    Price = 2490000m,
                    Color = "Black",
                    FuelType = "Diesel",
                    Transmission = "Automatic",
                    ImageUrl = "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
                    IsFeatured = false,
                    CreatedAt = new DateTime(2026, 1, 25, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 7,
                    Brand = "Honda",
                    Model = "City ZX CVT",
                    Year = 2023,
                    KmDriven = 18500,
                    Price = 1280000m,
                    Color = "Grey",
                    FuelType = "Petrol",
                    Transmission = "Automatic",
                    ImageUrl = "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&q=80&w=800",
                    IsFeatured = true,
                    CreatedAt = new DateTime(2026, 2, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 8,
                    Brand = "BMW",
                    Model = "X1 sDrive20d",
                    Year = 2018,
                    KmDriven = 56000,
                    Price = 2390000m,
                    Color = "Black",
                    FuelType = "Diesel",
                    Transmission = "Automatic",
                    ImageUrl = "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
                    IsFeatured = false,
                    CreatedAt = new DateTime(2026, 2, 5, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 9,
                    Brand = "Skoda",
                    Model = "Slavia Style",
                    Year = 2022,
                    KmDriven = 31500,
                    Price = 1460000m,
                    Color = "Blue",
                    FuelType = "Petrol",
                    Transmission = "Manual",
                    ImageUrl = "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800",
                    IsFeatured = false,
                    CreatedAt = new DateTime(2026, 2, 10, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 10,
                    Brand = "Toyota",
                    Model = "Innova Crysta VX",
                    Year = 2019,
                    KmDriven = 60200,
                    Price = 1875000m,
                    Color = "White",
                    FuelType = "Diesel",
                    Transmission = "Manual",
                    ImageUrl = "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800",
                    IsFeatured = true,
                    CreatedAt = new DateTime(2026, 2, 15, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 11,
                    Brand = "Honda",
                    Model = "Elevate ZX",
                    Year = 2023,
                    KmDriven = 12500,
                    Price = 1525000m,
                    Color = "Grey",
                    FuelType = "Petrol",
                    Transmission = "Automatic",
                    ImageUrl = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
                    IsFeatured = false,
                    CreatedAt = new DateTime(2026, 2, 20, 0, 0, 0, DateTimeKind.Utc)
                },
                new Car
                {
                    Id = 12,
                    Brand = "Audi",
                    Model = "A4 Premium",
                    Year = 2017,
                    KmDriven = 51900,
                    Price = 2150000m,
                    Color = "Silver",
                    FuelType = "Petrol",
                    Transmission = "Automatic",
                    ImageUrl = "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=800",
                    IsFeatured = true,
                    CreatedAt = new DateTime(2026, 2, 25, 0, 0, 0, DateTimeKind.Utc)
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
