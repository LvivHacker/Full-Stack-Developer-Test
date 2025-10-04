using Domain.Entities;

namespace Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(int id);
    Task<User?> GetByUsernameAsync(string username);
    Task AddUserAsync(User user);
    Task<bool> UserExistsAsync(string username, string email);
}
