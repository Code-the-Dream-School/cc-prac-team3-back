const { PORT = 8000 } = process.env.MONGO_URI;
const app = require("./app");

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);