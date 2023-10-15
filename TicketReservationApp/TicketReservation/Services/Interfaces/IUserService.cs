using TicketReservation.Models;

namespace TicketReservation.Services.Interfaces
{
    public interface IUserService
    {
        Task CreateAsync(User user);
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> GetByIdAsync(string id);
        Task UpdateAsync(string id, User user);
        Task DeleteAsync(string id);
    }
}
