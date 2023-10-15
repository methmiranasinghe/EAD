using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Collections.Generic;
using TicketReservation.Models;
using TicketReservation.Services;

[Route("api/trains")]
[ApiController]
public class TrainController : ControllerBase
{
    private readonly TrainService trainService;

    public TrainController(TrainService trainService)
    {
        this.trainService = trainService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Train>> Get()
    {
        var trains = trainService.GetTrains();
        return Ok(trains);
    }

    [HttpGet("{id}")]
    public ActionResult<Train> Get(string id)
    {
        var train = trainService.GetTrainById(id);
        if (train == null)
        {
            return NotFound();
        }
        return Ok(train);
    }

    [HttpPost]
    public ActionResult<Train> Create(Train train)
    {
        trainService.CreateTrain(train);
        ObjectId objid = ObjectId.GenerateNewId();
        return CreatedAtAction("Get", train);
    }

    [HttpPut("{id}")]
    public IActionResult Update(string id, Train updatedTrain)
    {
        var existingTrain = trainService.GetTrainById(id);
        if (existingTrain == null)
        {
            return NotFound();
        }

        trainService.UpdateTrain(id, updatedTrain);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        var train = trainService.GetTrainById(id);
        if (train == null)
        {
            return NotFound();
        }

        trainService.DeleteTrain(id);
        return NoContent();
    }
}
