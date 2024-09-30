using Backend.Models;
using Microsoft.AspNetCore.Http;

namespace Backend.Services
{
    public class GameService : IGameService
    {
        private readonly IMoveRepository _moveRepository;

        public GameService(IMoveRepository moveRepository)
        {
            _moveRepository = moveRepository;
        }

        public async Task<GameResult> WhoWins(int player1MoveId, int player2MoveId)
        {
            var movePlayer2 = await _moveRepository.GetMove(player2MoveId);
            var movePlayer1 = await _moveRepository.GetMove(player1MoveId);

            if (movePlayer2.DefeatId == movePlayer1.Id)
            {
                return GameResult.Player2;
            }
            else if (movePlayer1.DefeatId == movePlayer2.Id)
            {
                return GameResult.Player1;
            }
            else
            {
                return GameResult.Draw;
            }
        }
    }
}
