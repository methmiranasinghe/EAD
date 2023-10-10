using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TicketReservation.Models
{
    [BsonIgnoreExtraElements]
    public class Booking
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string Id { get; set; } = string.Empty;

        [BsonElement("origin")]
        public string Origin { get; set; } = "Origin";

        [BsonElement("destination")]
        public string Destination { get; set; } = "Destination";

        [BsonElement("trainId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string TrainId { get; set; } = ObjectId.Empty.ToString();

        [BsonElement("reservationDate")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime ReservationDate { get; set; } = DateTime.UtcNow;

        [BsonElement("timestamp")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        [BsonElement("userId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; } = ObjectId.Empty.ToString();
    }
}
