using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using TicketReservation.Data;
using TicketReservation.Models;

public class TrainService
{
    private readonly IMongoCollection<Train> trainsCollection;

    public TrainService(IOptions<DatabaseSettings> settings)
    {
        var mongoClent = new MongoClient(settings.Value.Connection);
        var mongoDb = mongoClent.GetDatabase(settings.Value.DatabaseName);
        trainsCollection = mongoDb.GetCollection<Train>(settings.Value.CollectionName6);
    }

    public List<Train> GetTrains()
    {
        return trainsCollection.Find(train => true).ToList();
    }

    public Train GetTrainById(string id)
    {
        return trainsCollection.Find(train => train._id == id).FirstOrDefault();
    }

    public void CreateTrain(Train train)
    {
        trainsCollection.InsertOne(train);
    }

    public void UpdateTrain(string id, Train updatedTrain)
    {
        trainsCollection.ReplaceOne(train => train._id == id, updatedTrain);
    }

    public void DeleteTrain(string id)
    {
        trainsCollection.DeleteOne(train => train._id == id);
    }
}
