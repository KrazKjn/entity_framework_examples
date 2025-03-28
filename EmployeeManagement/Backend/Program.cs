using EmployeeManagement.Backend.Data;
using EmployeeManagement.Backend.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using System.Text.Json.Serialization;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Access the configuration object
var configuration = builder.Configuration;

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Replace with your React app's URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure services
builder.Services.AddControllers();
//builder.Services.AddControllers()
//    .AddJsonOptions(options =>
//    {
//        // Enable ReferenceHandler.Preserve to handle circular references
//        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
//        options.JsonSerializerOptions.WriteIndented = true; // Optional: for readability
//    });

// Add services to the container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
#if INMEMORY
builder.Services.AddDbContext<ApplicationDbContext>(static options =>
    options.UseInMemoryDatabase("EmployeeDb")); // Replace with a real database connection if needed
#else
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
#endif
builder.Services.AddScoped<EmployeeRepository>();
builder.Services.AddScoped<DepartmentRepository>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

// Use the CORS policy
app.UseHttpsRedirection();
app.UseRouting();
// If there are calls to app.UseRouting() and app.UseEndpoints(...), the call to app.UseCors() must go between them.
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();
