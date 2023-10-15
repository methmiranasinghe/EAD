using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketReservation.Models;
using TicketReservation.Services;

namespace TicketReservation.Controllers
{
    [Route("api/schedules")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly ScheduleService _scheduleService;

        public ScheduleController(ScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Schedule>>> Get()
        {
            var schedules = await _scheduleService.GetSchedules();
            return Ok(schedules);
    }

    [HttpGet("{id:length(24)}", Name = "GetSchedule")]
    public async Task<ActionResult<Schedule>> Get(string id)
    {
        var schedule = await _scheduleService.GetSchedule(id);

        if (schedule == null)
        {
            return NotFound();
        }

        return Ok(schedule);
    }

    [HttpPost]
    public async Task<ActionResult<Schedule>> Create(Schedule schedule)
    {
        var createdSchedule = await _scheduleService.CreateSchedule(schedule);
        return CreatedAtRoute("GetSchedule", new { id = createdSchedule.Id }, createdSchedule);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Schedule schedule)
    {
        var updated = await _scheduleService.UpdateSchedule(id, schedule);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var deleted = await _scheduleService.DeleteSchedule(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
}
