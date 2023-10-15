using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using TicketReservation.Data;
using TicketReservation.Models;

namespace TicketReservation.Services
{
    public class ScheduleService
    {
        private readonly IMongoCollection<Schedule> _scheduleCollection;

        public ScheduleService(IOptions<DatabaseSettings> settings)
        {
            var mongoClent = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClent.GetDatabase(settings.Value.DatabaseName);
            _scheduleCollection = mongoDb.GetCollection<Schedule>(settings.Value.CollectionName7);


        }

        public async Task<List<Schedule>> GetSchedules()
        {
            return await _scheduleCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Schedule> GetSchedule(string id)
        {
            var objectId = new ObjectId(id);
            return await _scheduleCollection.Find(schedule => schedule.Id == objectId.ToString()).FirstOrDefaultAsync();
        }

        public async Task<Schedule> CreateSchedule(Schedule schedule)
        {
            await _scheduleCollection.InsertOneAsync(schedule);
            return schedule;
        }

        public async Task<bool> UpdateSchedule(string id, Schedule schedule)
        {
            var objectId = new ObjectId(id);
            var result = await _scheduleCollection.ReplaceOneAsync(s => s.Id == objectId.ToString(), schedule);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteSchedule(string id)
        {
            var objectId = new ObjectId(id);
            var result = await _scheduleCollection.DeleteOneAsync(schedule => schedule.Id == objectId.ToString());
            return result.IsAcknowledged && result.DeletedCount > 0;
        }
    }
}
