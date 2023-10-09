using Microsoft.AspNetCore.Mvc;
using TicketReservation.Services;
using TicketReservation.Models;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TicketReservation.Controllers
{
    [Route("api/backofficer")]
    [ApiController]
    public class BackofficerController : ControllerBase


    {
        private readonly BackofficerServices _backofficerServices;
        public BackofficerController(BackofficerServices backofficerServices)
        {
            _backofficerServices = backofficerServices;
        }


        // GET: api/backofficer
        [HttpGet]
        public async Task<List<Backofficer>> Get() => await _backofficerServices.GetAsync();


        // GET api/backofficer/5
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Backofficer>> Get(string id)
        {
            Backofficer backofficer = await _backofficerServices.GetAsnyc(id);
            if (backofficer == null)
            {
                return NotFound(id);
            }
            return backofficer;

        }

        // POST api/backofficer
        [HttpPost]
        public async Task<ActionResult<Backofficer>> Post(Backofficer newBackofficer)

        {
            await _backofficerServices.CreateAsync(newBackofficer);
            return CreatedAtAction(nameof(Get), new { id = newBackofficer.Id }, newBackofficer);
        }

        // PUT api/backofficer/5
        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Put(string id, Backofficer updateBackofficer)
        {
            Backofficer backofficer = await _backofficerServices.GetAsnyc(id);
            if (backofficer == null)
            {
                return NotFound("There is no student with this Id" + id);
            }

            updateBackofficer.Id = backofficer.Id;

            await _backofficerServices.UpdateAsync(id, updateBackofficer);

            return Ok("Updated Successfully");

        }

        // DELETE api/backofficer/5
        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id)
        {
            Backofficer backofficer = await _backofficerServices.GetAsnyc(id);

            if (backofficer == null)
            {
                return NotFound("There is no student with this  ID: " + id);
            }

            await _backofficerServices.RemoveAsync(id);

            return Ok("Deleted Successfully");



        }
    }
}
