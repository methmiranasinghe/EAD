using Microsoft.AspNetCore.Mvc;
using TicketReservation.Models;
using TicketReservation.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TicketReservation.Controllers
{
    [Route("api/traveller")]
    [ApiController]
    public class TravellerController : ControllerBase


    {
        private readonly TravellerServices _travellerServices;
        public TravellerController(TravellerServices travellerServices)
        {
            _travellerServices = travellerServices;
        }
        
     
        // GET: api/traveller
        [HttpGet]
        public async Task<List<Traveller>> Get() => await _travellerServices.GetAsync();


        // GET api/traveller/5
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Traveller>> Get(string id)
        {
            Traveller traveller = await _travellerServices.GetAsnyc(id);
            if(traveller == null)
            {
                return NotFound(id);
            }
            return traveller;
            
        }

        // POST api/traveller
        [HttpPost]
        public async Task<ActionResult<Traveller>> Post(Traveller newTraveller)

        {
            await _travellerServices.CreateAsync(newTraveller);
            return CreatedAtAction(nameof(Get), new {id = newTraveller.Id}, newTraveller);
        }

        // PUT api/traveller/5
        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Put(string id, Traveller updateTraveller)
        {
            Traveller traveller = await _travellerServices.GetAsnyc(id);
            if  (traveller == null)
            {
                return NotFound("There is no student with this Id" + id);
            }

            updateTraveller.Id = traveller.Id;

            await _travellerServices.UpdateAsync(id, updateTraveller);

            return Ok("Updated Successfully");

        }

        // DELETE api/traveller/5
        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id)
        {
            Traveller traveller = await _travellerServices.GetAsnyc(id);

            if (traveller == null)
            {
                return NotFound("There is no student with this  ID: " + id);
            }

            await _travellerServices.RemoveAsync(id);

            return Ok("Deleted Successfully");



        }
    }
}
