using MongoDB.Bson.Serialization.Attributes;

namespace TravelerAppService.Models
{
    public class Reservation
    {
        public string Id { get; set; }
        public string NationalIdentificationCard { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public string ReservationDate { get; set; }
    }
}
