const express = require("express");
const router = express.Router();
const Booking = require('../models/booking') 

router.post("/bookroom" , async(req, res) => {

   const{
        room,
        userid,
        fromdate1,
        todate1,
        totalAmount,
        totaldays} = req.body


        try {
            const newbooking = new Booking({
                
                room : room.name,
                roomid : room._id,
                userid,
                fromdate1,
                todate1,
                totalAmount,
                totaldays,
                transactionId: '1234'
            });

          const booking = await newbooking.save()
          res.send('Room booked Successfully')

        } catch (error) {
            return res.status(400).json({error});
        }
   

});

module.exports= router;