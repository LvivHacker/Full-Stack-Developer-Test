using Application.Interfaces;
using Domain.Entities;

namespace Infrastructure.Repositories;

public class InMemoryUserRepository : IUserRepository
{
    private readonly List<User> _users = new();
    private int _nextId = 1;

    public Task AddUserAsync(User user)
    {
        user.Id = _nextId++;
        _users.Add(user);
        return Task.CompletedTask;
    }

    public Task<User?> GetByUsernameAsync(string username)
    {
        return Task.FromResult(_users.FirstOrDefault(u => u.Username.Equals(username, StringComparison.OrdinalIgnoreCase)));
    }

    public Task<User?> GetByIdAsync(int id)
    {
        return Task.FromResult(_users.FirstOrDefault(u => u.Id == id));
    }

    public Task<bool> UserExistsAsync(string username, string email)
    {
        var exists = _users.Any(u => u.Username.Equals(username, StringComparison.OrdinalIgnoreCase) || u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
        return Task.FromResult(exists);
    }
}