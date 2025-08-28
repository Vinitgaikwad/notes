const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DB_LINK}`);
        if (process.env.NODE_ENV === "test") {
            console.log("Connected ToDo DB!")
        }
    } catch (error) {
        if (process.env.NODE_ENV === "test") {
            console.log(error)
        }
    }
}


module.exports = connectDB;