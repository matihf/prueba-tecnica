using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoveController : ControllerBase
    {
        private readonly IMoveRepository _moveRepository;

        public MoveController(IMoveRepository moveRepository) 
        {
            _moveRepository = moveRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var players = await _moveRepository.GetAllMoves();
                return Ok(players);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var player = await _moveRepository.GetMove(id);
                if (player == null)
                {
                    return NotFound();
                }
                return Ok(player);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Move move)
        {
            try
            {
                move = await _moveRepository.AddMove(move);
                return CreatedAtAction("Get", new { id = move.Id }, move);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Move move)
        {
            try
            {
                if (id != move.Id)
                {
                    return BadRequest();
                }
                var storedMove = await _moveRepository.GetMove(id);
                if (storedMove == null)
                {
                    return NotFound();
                }
                await _moveRepository.UpdateMove(move);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var move = await _moveRepository.GetMove(id);
                if (move == null)
                {
                    return NotFound();
                }
                await _moveRepository.DeleteMove(move);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
