using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class MoveRepository : IMoveRepository
    {
        private readonly ApplicationDBContext _context;

        public MoveRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Move>> GetAllMoves()
        {
            return await _context.Moves.ToListAsync();
        }

        public async Task<Move> GetMove(int id)
        {
            return await _context.Moves.FindAsync(id);
        }

        public async Task DeleteMove(Move move)
        {
            if (move.DefeatId != null)
            {
                var defeatMove = _context.Moves.FirstOrDefault(m => m.DefeatId == move.Id);
                if (defeatMove != null)
                {
                    defeatMove.DefeatId = null;
                    await UpdateMove(defeatMove);
                }
            }
            _context.Moves.Remove(move);
            await _context.SaveChangesAsync();
        }

        public async Task<Move> AddMove(Move move)
        {
            _context.Add(move);
            await _context.SaveChangesAsync();
            return move;
        }

        public async Task UpdateMove(Move move)
        {
            var storedMove = await _context.Moves.FirstOrDefaultAsync(x => x.Id == move.Id);
            if (storedMove != null)
            {
                storedMove.DefeatId = move.DefeatId;
                await _context.SaveChangesAsync();
            }
        }
    }
}
