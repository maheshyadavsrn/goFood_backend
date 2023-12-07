const express = require('express')
const cors=require("cors");
const app = express()
const corsOptions = {
    origin: "https://gofoodapp-5yo5.onrender.com",
    credentials: true,
};
app.use(cors(corsOptions));
const port = 5000
const mongoDB = require("./db")
mongoDB();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Request-With,Content-Type,Accept"
    );
    next();
})
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))
app.get('/', (req, res) => {
    res.send('Hello World!-----')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
