using Backend.Models;

namespace Backend.Services
{
    public interface IMoveRepository
    {
        Task<Move> AddMove(Move move);
        Task DeleteMove(Move move);
        Task<List<Move>> GetAllMoves();
        Task<Move> GetMove(int id);
        Task UpdateMove(Move move);
    }
}
