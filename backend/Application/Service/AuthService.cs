using Application.Interfaces;
using Domain.Entities;

namespace Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IPasswordHasher _passwordHasher;

    public AuthService(
        IUserRepository userRepository,
        IJwtTokenService jwtTokenService,
        IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _jwtTokenService = jwtTokenService;
        _passwordHasher = passwordHasher;
    }

    public async Task<string> RegisterAsync(string username, string email, string password)
    {
        // Check if user already exists
        var exists = await _userRepository.UserExistsAsync(username, email);
        if (exists)
            throw new Exception("User already exists.");

        // Hashing the password
        var hashedPassword = _passwordHasher.HashPassword(password);

        var user = new User
        {
            Username = username,
            Email = email,
            PasswordHash = hashedPassword
        };

        await _userRepository.AddUserAsync(user);

        // JWT generating
        var token = _jwtTokenService.GenerateToken(user);
        return token;
    }

    public async Task<string> LoginAsync(string username, string password)
    {
        var user = await _userRepository.GetByUsernameAsync(username);
        if (user == null)
            throw new Exception("User not found.");

        var isValid = _passwordHasher.VerifyPassword(password, user.PasswordHash);
        if (!isValid)
            throw new Exception("Invalid password.");

        // Generating a JWT upon successful authentication
        var token = _jwtTokenService.GenerateToken(user);
        return token;
    }
}
