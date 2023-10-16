using Microsoft.AspNetCore.Mvc;
using TicketReservation.Models;
using TicketReservation.Services;

namespace TicketReservation.Controllers
{
    [Route("api/trainschedule")]
    [ApiController]
    public class TrainScheduleController : ControllerBase
    {
        private readonly TrainScheduleService _trainScheduleService;

        public TrainScheduleController(TrainScheduleService trainScheduleService)
        {
            _trainScheduleService = trainScheduleService;
        }

        // GET: api/trainschedule
        [HttpGet]
        public ActionResult<IEnumerable<TrainSchedule>> Get()
        {
            var trainSchedules = _trainScheduleService.GetTrainSchedules();
            return Ok(trainSchedules);
        }

        // GET api/trainschedule/5
        [HttpGet("{id:length(24)}")]
        public ActionResult<TrainSchedule> Get(string id)
        {
            var schedule = _trainScheduleService.GetTrainScheduleById(id);

            if (schedule == null)
            {
                return NotFound();
            }

            return schedule;
        }

        // POST api/trainschedule
        [HttpPost]
        public ActionResult<TrainSchedule> Post(TrainSchedule newSchedule)
        {
            _trainScheduleService.CreateTrainSchedule(newSchedule);
            return CreatedAtAction(nameof(Get), new { id = newSchedule.Id }, newSchedule);
        }

        // PUT api/trainschedule/5
        [HttpPut("{id:length(24)}")]
        public ActionResult Put(string id, TrainSchedule updateSchedule)
        {
            var schedule = _trainScheduleService.GetTrainScheduleById(id);
            if (schedule == null)
            {
                return NotFound("There is no schedule with this ID: " + id);
            }

            updateSchedule.Id = schedule.Id;

            _trainScheduleService.UpdateTrainSchedule(id, updateSchedule);

            return Ok("Updated Successfully");
        }

        // DELETE api/trainschedule/5
        [HttpDelete("{id:length(24)}")]
        public ActionResult Delete(string id)
        {
            var schedule = _trainScheduleService.GetTrainScheduleById(id);

            if (schedule == null)
            {
                return NotFound("There is no schedule with this ID: " + id);
            }

            _trainScheduleService.DeleteTrainSchedule(id);

            return Ok("Deleted Successfully");
        }
    }
}
