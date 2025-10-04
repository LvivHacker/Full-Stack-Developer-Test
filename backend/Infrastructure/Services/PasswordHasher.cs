using System.Security.Cryptography;
using Application.Interfaces;

namespace Infrastructure.Services;

public class PasswordHasher : IPasswordHasher
{
    public string HashPassword(string password)
    {
        // Salt generating
        byte[] salt = RandomNumberGenerator.GetBytes(16);

        // Getting hash via PBKDF2
        var hash = Rfc2898DeriveBytes.Pbkdf2(
            password: password,
            salt: salt,
            iterations: 100000,
            hashAlgorithm: HashAlgorithmName.SHA256,
            32
        );

        // Convert to string: [salt:hash] in Base64
        return $"{Convert.ToBase64String(salt)}:{Convert.ToBase64String(hash)}";
    }

    public bool VerifyPassword(string password, string hashedPassword)
    {
        var parts = hashedPassword.Split(':');
        if (parts.Length != 2)
            return false;

        var salt = Convert.FromBase64String(parts[0]);
        var hash = Convert.FromBase64String(parts[1]);

        var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(
            password: password,
            salt: salt,
            iterations: 100000,
            hashAlgorithm: HashAlgorithmName.SHA256,
            32
        );

        return CryptographicOperations.FixedTimeEquals(hash, hashToCompare);
    }
}