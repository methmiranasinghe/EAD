using Microsoft.AspNetCore.Mvc;
using TravelerAppService.Models;
using TravelerAppWebService.Services.Interfaces;

namespace TravelerAppWebService.Controllers
{
    [Route("api/reservation")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetAllReservations()
        {
            var reservations = await _reservationService.GetAllAsync();
            return Ok(reservations);
        }

        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation( Reservation reservation)
        {
            try
            { 

                // Call the UserService to create a new user asynchronously
                await _reservationService.CreateAsync(reservation);

                // Return HTTP 201 Created status along with the newly created user
                return Ok(new { Message = "Reservation created Successfully", reservation });
            }
            catch (Exception ex)
            {
                // Handle any exceptions and return an error response
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationById(string id)
        {
            var reservation = await _reservationService.GetByIdAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }
            return Ok(reservation);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReservation(string id, Reservation reservation)
        {
            if (id != reservation.Id)
            {
                return BadRequest();
            }

            await _reservationService.UpdateAsync(id, reservation);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(string id)
        {
            await _reservationService.DeleteAsync(id);
            return NoContent();
        }
    }

}
