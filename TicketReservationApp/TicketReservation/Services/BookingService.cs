using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TicketReservation.Data;
using TicketReservation.Models;

namespace TicketReservation.Services
{
    public class BookingService
    {
        //MongoDB instance
        private readonly IMongoCollection<Booking> _bookingCollection;

        //set mongoURL
        public BookingService(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _bookingCollection = mongoDb.GetCollection<Booking>(settings.Value.CollectionName3);
        }

        // Get All Bookings
        public async Task<List<Booking>> GetAsync() => await _bookingCollection.Find(_ => true).ToListAsync();

        // Get Booking by Id
        public async Task<Booking> GetAsync(string id) =>
            await _bookingCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // Create a new Booking
        public async Task CreateAsync(Booking newBooking)
        {
            // You can add custom logic here before inserting the new booking, if needed.
            await _bookingCollection.InsertOneAsync(newBooking);
        }

        // Update Booking by Id
        public async Task UpdateAsync(string id, Booking updateBooking)
        {
            // You can add custom validation or update logic here if needed.
            await _bookingCollection.ReplaceOneAsync(x => x.Id == id, updateBooking);
        }

        // Delete Booking by Id
        public async Task RemoveAsync(string id) =>
            await _bookingCollection.DeleteOneAsync(x => x.Id == id);
    }
}
