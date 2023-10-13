﻿using MongoDB.Driver;
using TravelerAppService.Context;
using TravelerAppService.Models;
using TravelerAppWebService.Services.Interfaces;

namespace TravelerAppService.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IMongoCollection<Reservation> _reservationCollection;

        public ReservationService(MongoDBContext dbContext)
        {
            _reservationCollection = dbContext.GetCollection<Reservation>("reservation");
        }

        //create
        public async Task CreateAsync(Reservation reservation)
        {
            await _reservationCollection.InsertOneAsync(reservation);
        }

        //get
        public async Task<IEnumerable<Reservation>> GetAllAsync()
        {
            var filter = Builders<Reservation>.Filter.Empty;
            var reservation = await _reservationCollection.Find(filter).ToListAsync();
            return reservation;
        }

        //getById
        public async Task<IEnumerable<Reservation>> GetByIdAsync(string id)
        {
            var filter = Builders<Reservation>.Filter.Eq(x => x.NationalIdentificationCard, id);
            var reservations = await _reservationCollection.Find(filter).ToListAsync();
            return reservations;
        }

        //updateById
        public async Task UpdateAsync(string id, Reservation model)
        {
            var filter = Builders<Reservation>.Filter.Eq(x => x.Id, id);
            await _reservationCollection.ReplaceOneAsync(filter, model);
        }

        //delete
        public async Task DeleteAsync(string id)
        {
            var filter = Builders<Reservation>.Filter.Eq(x => x.Id, id);
            await _reservationCollection.DeleteOneAsync(filter);
        }

    }
}