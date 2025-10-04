using Application.Interfaces;
using Application.Services;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configuration (Jwt settings в appsettings.json)
var config = builder.Configuration;

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS for a frontend (React на http://localhost:3000)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", p => 
        p.WithOrigins("http://localhost:3000")
         .AllowAnyMethod()
         .AllowAnyHeader());
});

// DI: my realisation
builder.Services.AddSingleton<IUserRepository, InMemoryUserRepository>(); // for now only in-memory
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();

// JWT Authentication
var jwtKey = config["Jwt:Key"] ?? "super_secret_key_12345";
var issuer = config["Jwt:Issuer"] ?? "ShopApp";
var audience = config["Jwt:Audience"] ?? "ShopAppUsers";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();