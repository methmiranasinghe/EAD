using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TicketReservation.Data;
using TicketReservation.Models;

namespace TicketReservation.Services
{
    public class TravellerServices
    {
        private readonly IMongoCollection<Traveller> _travellercollection;

        public TravellerServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClent = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClent.GetDatabase(settings.Value.DatabaseName);
            _travellercollection = mongoDb.GetCollection<Traveller>(settings.Value.CollectionName1);


        }

        //Get All Travellers
        public async Task<List<Traveller>> GetAsync() => await _travellercollection.Find(_ => true).ToListAsync();

        //Get traveller by NIC
        public async Task<Traveller> GetAsnyc(string id) =>
            await _travellercollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        //Add 
        public async Task CreateAsync(Traveller newTraveller) =>
            await _travellercollection.InsertOneAsync(newTraveller);


        //Update traveller by NIC
        public async Task UpdateAsync(string id, Traveller updateTraveller) =>
            await _travellercollection.ReplaceOneAsync(x => x.Id == id, updateTraveller);


        //Delete a traveller by NIC
        public async Task RemoveAsync(string id) =>
            await _travellercollection.DeleteOneAsync(x => x.Id == id);


    }
}
