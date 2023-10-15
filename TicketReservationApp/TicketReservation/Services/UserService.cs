using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketReservation.Data;
using TicketReservation.Models;

public class UserService
{
    private readonly IMongoCollection<User> usersCollection;

    public UserService(IOptions<DatabaseSettings> settings)
    {
        var mongoClent = new MongoClient(settings.Value.Connection);
        var mongoDb = mongoClent.GetDatabase(settings.Value.DatabaseName);
        usersCollection = mongoDb.GetCollection<User>(settings.Value.CollectionName5);


    }

    public async Task<IEnumerable<User>> GetUsersAsync()
    {
        var users = await usersCollection.Find(user => true).ToListAsync();
        return (IEnumerable<User>)users;
    }

    public async Task<User> GetUserByIdAsync(string id)
    {
        var user = await usersCollection.Find(u => u._id  == id).FirstOrDefaultAsync();
        return user;
    }

    public async Task CreateUserAsync(User user)
    {
        await usersCollection.InsertOneAsync(user);
    }

    public async Task UpdateUserAsync(string id, User updatedUser)
    {
        await usersCollection.ReplaceOneAsync(user => user._id == id, updatedUser);
    }

    public async Task DeleteUserAsync(string id)
    {
        await usersCollection.DeleteOneAsync(user => user._id == id);
    }
}
