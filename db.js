const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect('mongodb+srv://kirangundala7:KcgSweety8@cluster0.5cmjhpj.mongodb.net/data')

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose