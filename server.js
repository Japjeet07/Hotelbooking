require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const connection = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingsRoute = require('./routes/bookingsRoute')

connection();

app.use(express.json())
app.use(cors());

app.use('/api/rooms' , roomsRoute)
app.use('/api/users' , usersRoute)
app.use('/api/bookings' , bookingsRoute)


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port this`);
});