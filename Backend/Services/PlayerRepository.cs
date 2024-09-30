using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class PlayerRepository: IPlayerRepository
    {
        private readonly ApplicationDBContext _context;

        public PlayerRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Player>> GetAllPlayers()
        {
            return await _context.Players.ToListAsync();
        }

        public async Task<Player> GetPlayer(string name)
        {
            return await _context.Players.FindAsync(name);
        }

        public async Task<Player> AddPlayer(Player player)
        {
            _context.Add(player);
            await _context.SaveChangesAsync();
            return player;
        }

        public async Task UpdatePlayer(Player player)
        {
            var storedPlayer = await _context.Players.FirstOrDefaultAsync(x => x.Name == player.Name);
            if (storedPlayer != null)
            {
                storedPlayer.Victories = player.Victories;
                await _context.SaveChangesAsync();
            }
        }
    }
}
