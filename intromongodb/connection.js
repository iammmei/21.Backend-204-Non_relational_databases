const { MongoClient}  = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017", {
   useNewUrlParser:true
});

// client.connect((error,dbClient) =>{
//     if(error){
//         console.log("ERROR",error);
//     }
//     if(dbClient){
//         console.log("Connected to Mongodb");
//     }
// });

client.connect()
.then(dbClient=>console.log("Connected to Mango db"))
.catch((error) => console.log("Error,error"));