using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TicketReservation.Models
{

    public class Schedule
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("_id")]
        public string Id { get; set; }

        [BsonElement("train")]
        public ObjectId Train { get; set; }

        [BsonElement("origin")]
        public string Origin { get; set; }

        [BsonElement("destination")]
        public string Destination { get; set; }


    }
}
