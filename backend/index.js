
const express = require('express');
const {toConnectDB} = require("./config")
require("dotenv").config();
const cors = require('cors');



const app = express();


app.use(express.json())
const { UserRouter } = require('./routes/userRoute');




app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT"], 
}));


app.use('/users', UserRouter );


app.get("/" ,(req,res) =>{
    res.send("this is product lab api")
})



app.listen(8181 ,()=>{
    toConnectDB() // for connect to DB (mongoDb database)
    console.log("server is running at http://localhost:8181/")
})
