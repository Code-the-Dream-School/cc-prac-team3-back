const app = require('./app');

const connectDB = require('../db/connect');
require('dotenv').config();

const port = process.env.Port || 8000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        const listener = () => console.log(`Listening on Port ${port}!`)
        app.listen(port, listener)
    } catch (error) {
        console.log(error)
    }
}

start()
