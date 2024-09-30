using Backend.Models;

namespace Backend.Services
{
    public interface IGameService
    {
        Task<GameResult> WhoWins(int player1MoveId, int player2MoveId);
    }
}
