using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TicketReservation.Data;
using TicketReservation.Models;

namespace TicketReservation.Services
{
    public class BackofficerServices
    {
        private readonly IMongoCollection<Backofficer> _backofficercollection;

        public BackofficerServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClent = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClent.GetDatabase(settings.Value.DatabaseName);
            _backofficercollection = mongoDb.GetCollection<Backofficer>(settings.Value.CollectionName2);


        }

        //Get All Backofficer
        public async Task<List<Backofficer>> GetAsync() => await _backofficercollection.Find(_ => true).ToListAsync();

        //Get backofficer by Id
        public async Task<Backofficer> GetAsnyc(string id) =>
            await _backofficercollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        //Add 
        public async Task CreateAsync(Backofficer newBackofficer) =>
            await _backofficercollection.InsertOneAsync(newBackofficer);


        //Update traveller by NIC
        public async Task UpdateAsync(string id, Backofficer updateBackofficer) =>
            await _backofficercollection.ReplaceOneAsync(x => x.Id == id, updateBackofficer);


        //Delete a traveller by NIC
        public async Task RemoveAsync(string id) =>
            await _backofficercollection.DeleteOneAsync(x => x.Id == id);


    }
}
