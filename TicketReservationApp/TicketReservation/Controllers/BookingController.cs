using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketReservation.Models;
using TicketReservation.Services;

namespace TicketReservation.Controllers
{
    [Route("api/booking")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly BookingService _bookingService;

        public BookingController(BookingService bookingService)
        {
            _bookingService = bookingService;
        }

        // GET: api/booking
        [HttpGet]
        public async Task<List<Booking>> Get() => await _bookingService.GetAsync();

        // GET api/booking/5
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Booking>> Get(string id)
        {
            Booking booking = await _bookingService.GetAsync(id);
            if (booking == null)
            {
                return NotFound(id);
            }
            return booking;
        }

        // POST api/booking
        [HttpPost]
        public async Task<ActionResult<Booking>> Post(Booking newBooking)
        {
            await _bookingService.CreateAsync(newBooking);
            return CreatedAtAction(nameof(Get), new { id = newBooking.Id }, newBooking);
        }

        // PUT api/booking/5
        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Put(string id, Booking updateBooking)
        {
            Booking booking = await _bookingService.GetAsync(id);
            if (booking == null)
            {
                return NotFound("There is no booking with this Id: " + id);
            }

            updateBooking.Id = booking.Id;

            await _bookingService.UpdateAsync(id, updateBooking);

            return Ok("Updated Successfully");
        }

        // DELETE api/booking/5
        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id)
        {
            Booking booking = await _bookingService.GetAsync(id);

            if (booking == null)
            {
                return NotFound("There is no booking with this ID: " + id);
            }

            await _bookingService.RemoveAsync(id);

            return Ok("Deleted Successfully");
        }
    }
}
