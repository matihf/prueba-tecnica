using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameService _gameService;

        public GameController(IGameService gameService) 
        {
            _gameService = gameService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> WhoWins(int player1MoveId, int player2MoveId)
        {
            try
            {
                var gameResult = await _gameService.WhoWins(player1MoveId, player2MoveId);
                return Ok(gameResult);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
