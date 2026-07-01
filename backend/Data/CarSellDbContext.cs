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
        }
    }
}
