 const mongoose = require('mongoose'); 

 var mongoURL = 'mongodb+srv://humpty:humpty@cluster0.delqfcl.mongodb.net/mern-rooms'

 mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser : true})

 var connection= mongoose.connection

 connection.on('error' , ()=>{
    console.log('mongo db connection failed')
 })

 connection.on('connected' , ()=>{
    console.log('mongo db connection successfull')
 })

 module.exports= mongoose