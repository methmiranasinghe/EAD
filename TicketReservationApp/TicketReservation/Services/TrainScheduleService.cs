using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using TicketReservation.Data;
using TicketReservation.Models;

public class TrainScheduleService
{
    private readonly IMongoCollection<TrainSchedule> _trainScheduleCollection;

    public TrainScheduleService(IOptions<DatabaseSettings> settings)
    {
        var client = new MongoClient(settings.Value.Connection);
        var database = client.GetDatabase(settings.Value.DatabaseName);
        _trainScheduleCollection = database.GetCollection<TrainSchedule>(settings.Value.CollectionName8);
    }

    public List<TrainSchedule> GetTrainSchedules()
    {
        return _trainScheduleCollection.Find(_ => true).ToList();
    }

    public TrainSchedule GetTrainScheduleById(string id)
    {
        return _trainScheduleCollection.Find(schedule => schedule.Id == id).FirstOrDefault();
    }

    public void CreateTrainSchedule(TrainSchedule schedule)
    {
        _trainScheduleCollection.InsertOne(schedule);
    }

    public void UpdateTrainSchedule(string id, TrainSchedule updatedSchedule)
    {
        var filter = Builders<TrainSchedule>.Filter.Eq(s => s.Id, id);
        _trainScheduleCollection.ReplaceOne(filter, updatedSchedule);
    }

    public void DeleteTrainSchedule(string id)
    {
        var filter = Builders<TrainSchedule>.Filter.Eq(s => s.Id, id);
        _trainScheduleCollection.DeleteOne(filter);
    }
}
