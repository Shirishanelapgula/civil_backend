require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require("../routes/userRoutes")
const cors = require('cors');


const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND
const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: FRONTEND ,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors(corsOptions))

app.use("/user" , userRoutes)


app.get('/', (req, res) => {
    res.status(200).json({message: "Your api is working"})
});


mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Mongo db Connected!')
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
      });
      
  }
)
  .catch((error)=> console.log(error.message))

