
const express=require('express');
const env=require('dotenv');
const bodyParser=require('body-parser');
const cors=require('cors');
const db_connection = require('./config/db_connection');
const userRouter = require('./routes/userRoutes');
const eventRouter = require('./routes/eventRoutes');

const app=express();
const port=process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// configs
env.config();
db_connection();

// routes
app.use('/users',userRouter);
app.use('/events',eventRouter);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

