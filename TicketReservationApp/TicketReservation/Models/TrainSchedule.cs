using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace TicketReservation.Models
{
    public class TrainSchedule
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("train")]
        public TrainData? Train { get; set; }

        [BsonElement("date")]
        public DateTime? Date { get; set; }

        [BsonElement("origin")]
        public string? Origin { get; set; }

        [BsonElement("destination")]
        public string? Destination { get; set; }

        [BsonElement("startTime")]
        public DateTime? StartTime { get; set; }

        [BsonElement("stops")]
        public List<TrainStop>? Stops { get; set; }

        [BsonElement("timestamp")]
        public DateTime? Timestamp { get; set; }
    }

    public class TrainData
    {
        [BsonElement("id")]
        public string? Id { get; set; }

        [BsonElement("name")]
        public string? Name { get; set; }
    }

    public class TrainStop
    {
        [BsonElement("station")]
        public string? Station { get; set; }

        [BsonElement("time")]
        public string? Time { get; set; }
    }
}
