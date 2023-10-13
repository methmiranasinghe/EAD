import stations from "../constants/stations";

const User = {
    firstName:"Kamal",
    lastName:"Perera",
    id:"123123123123",
    nic:"9833423234V",
    address:"10,Araliya road, Kurunegala",
    contact:"0734834434"
};

const Reservation = {
    id:"12323123",
    train: {
        name:"Viking Express",
        id:"asd89213"
    },
    reservationDate: new Date(),
    origin: "Kurunegala",
    destination:"Nittambuwa",
    timestamp: new Date()
}

const Train = {
    id:"ad21313",
    name:"AMD",
    dateCreated: new Date()
};

const Schedule = {
    id:"asdadf",
    train: Train,
    date: new Date(),
    origin: "Colombo Fort",
    destination: "Kurunegala",
    startTime: new Date(),
    stops: [
        {
            station: "Colombo Fort",
            time: "10.00 am"
        },
        {
            station: "Nittambuwa",
            time: "11.00 am"
        },
        {
            station: "Alawwa",
            time: "11.45 am"
        },
        {
            station: "Kurunegala",
            time: "12.30 pm"
        },
    ],
    timestamp: new Date(),
}


export const travellers = [User, User,User,User,User,User];

export const reservations = [Reservation,Reservation,Reservation,Reservation ]

export const trains = [Train,Train,Train,Train,Train]

export const schedules = [Schedule, Schedule, Schedule, Schedule, Schedule]
