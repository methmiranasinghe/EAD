using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace TicketReservation.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string NIC { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }

        public string Password { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public List<string> Bookings { get; set; }
    }
}
