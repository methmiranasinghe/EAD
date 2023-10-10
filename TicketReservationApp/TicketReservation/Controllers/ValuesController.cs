using Microsoft.AspNetCore.Mvc;

namespace TicketReservation.Controllers
{
    [Route("api/test")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("This is a test API.");
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok($"You requested data for ID {id}.");
        }

        [HttpPost]
        public IActionResult Post([FromBody] string data)
        {
            return Ok($"Received data: {data}");
        }
    }
}
