const mongoose=require('mongoose');

const db_connection= async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log('Connected to the database');
    }
    catch(err){
        console.log('Error in connecting to the database');
        console.log(err);
    }
}

module.exports=db_connection;