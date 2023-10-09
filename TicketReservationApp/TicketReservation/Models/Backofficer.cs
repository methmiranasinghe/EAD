using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TicketReservation.Models
{
    [BsonIgnoreExtraElements]
    public class Backofficer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string Id { get; set; } = string.Empty;

        [BsonElement("nic")]
        public string NIC { get; set; } = "Backofficer NIC";

        [BsonElement("firstname")]
        public string FirstName { get; set; } = "Backofficer First Name";

        [BsonElement("lastname")]
        public string LastName { get; set; } = "Backofficer Last Name";

        [BsonElement("email")]
        public string Email { get; set; } = "Backofficer Email";

        [BsonElement("gender")]
        public byte Gender { get; set; } = 1;

        [BsonElement("contactno")]
        public string ContactNo { get; set; } = "Backofficer Contact No ";




    }
}
