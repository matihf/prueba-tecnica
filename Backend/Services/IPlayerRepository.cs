using Backend.Models;

namespace Backend.Services
{
    public interface IPlayerRepository
    {
        Task<Player> AddPlayer(Player player);
        Task<List<Player>> GetAllPlayers();
        Task<Player> GetPlayer(string name);
        Task UpdatePlayer(Player player);
    }
}
