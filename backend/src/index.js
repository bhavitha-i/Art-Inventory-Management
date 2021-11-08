require('dotenv').config();

const mysql = require("mysql");
const express = require('express')
const cors = require("cors")


const ArtistRouter = require("./routers/artist");




const app = express()
const port = process.env.PORT || 5000
app.set('port', port);

// For parsing application/json
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}));


app.get('/', (req, res) => {
    res.send("Hello World");
  });

  
app.use(ArtistRouter);




app.listen(port,()=>{
    console.log('server is up on port '+ port)
})