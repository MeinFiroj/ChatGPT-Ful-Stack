const mongoose = require("mongoose")

async function dbConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Databse connected successfully")
    } catch (error) {
        console.log("Database connection failed : ", error)
    }
}

module.exports = dbConnection;