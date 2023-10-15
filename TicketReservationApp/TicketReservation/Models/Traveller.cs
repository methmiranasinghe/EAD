using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TicketReservation.Models
{
    //Traveller model
    [BsonIgnoreExtraElements]
    public class Traveller
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string Id { get; set; } = string.Empty;

        [BsonElement("nic")]
        public string NIC { get; set; } = "Traveller NIC";

        [BsonElement("firstname")]
        public string FirstName { get; set; } = "Traveller First Name";

        [BsonElement("lastname")]
        public string LastName { get; set; } = "Traveller Last Name";

        [BsonElement("email")]
        public string Email { get; set; } = "Traveller Email";

        [BsonElement("gender")]
        public byte Gender { get; set; } = 1;

        [BsonElement("contactno")]
        public string ContactNo { get; set; } = "Traveller Contact No ";

        [BsonElement("status")]
        public bool Status { get; set; }

        [BsonElement("password")]
        public string Password { get; set; } = "Traveller Password";


    }
}
