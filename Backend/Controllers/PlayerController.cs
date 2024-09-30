using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayerController(IPlayerRepository playerRepository) 
        {
            _playerRepository = playerRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var players = await _playerRepository.GetAllPlayers();
                return Ok(players);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SaveVictory(SaveVictoryDTO saveVictoryDTO)
        {
            Player player = null;
            try
            {
                player = await _playerRepository.GetPlayer(saveVictoryDTO.winner);
                if (player == null)
                {
                    player = new Player()
                    {
                        Name = saveVictoryDTO.winner,
                        Victories = 1
                    };
                    await _playerRepository.AddPlayer(player);
                }
                else
                {
                    player.Victories = 1 + player.Victories;
                    await _playerRepository.UpdatePlayer(player);
                }

                player = await _playerRepository.GetPlayer(saveVictoryDTO.loser);
                if (player == null)
                {
                    player = new Player()
                    {
                        Name = saveVictoryDTO.loser,
                        Victories = 0
                    };
                    await _playerRepository.AddPlayer(player);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
