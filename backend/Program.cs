using Microsoft.EntityFrameworkCore;
using CarSellApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure CORS for frontend access
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Configure MySQL Entity Framework Core
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Server=db;Port=3306;Database=carselldb;User=root;Password=rootpassword;";

builder.Services.AddDbContext<CarSellDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString),
        mySqlOptions => mySqlOptions.EnableRetryOnFailure(
            maxRetryCount: 10,
            maxRetryDelay: TimeSpan.FromSeconds(5),
            errorNumbersToAdd: null)));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || true) // Always enable Swagger in Docker
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

// Ensure Database is Created and Seeded on Startup with Retry Logic for Docker Boot
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    var dbContext = services.GetRequiredService<CarSellDbContext>();

    int retries = 10;
    while (retries > 0)
    {
        try
        {
            logger.LogInformation("Attempting to connect to MySQL database and ensure tables are created...");
            dbContext.Database.EnsureCreated();
            logger.LogInformation("MySQL database connection successful and tables verified/seeded.");
            break;
        }
        catch (Exception ex)
        {
            retries--;
            logger.LogWarning(ex, "Could not connect to MySQL database. Retries left: {Retries}. Waiting 5 seconds...", retries);
            if (retries == 0)
            {
                logger.LogError(ex, "Failed to connect to MySQL database after multiple attempts.");
            }
            else
            {
                Thread.Sleep(5000);
            }
        }
    }
}

app.Run();
