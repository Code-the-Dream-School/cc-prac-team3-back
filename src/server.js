const { PORT = 8000 } = process.env.MONGO_URI;
const app = require("./app");

const connectDB = require('../db/connect')
require('dotenv').config()


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        const listener = () => console.log(`Listening on Port ${PORT}!`)
        app.listen(PORT, listener)
    } catch (error) {
        console.log(error)
    }
}



start()