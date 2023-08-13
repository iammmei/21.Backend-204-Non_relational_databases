
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://safaekhess:<password>@cluster0.xucvubn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });

  try {
    client.connect()
    console.log('Connected to the database!');   
  } catch (error) {
    console.log(error);
    return
  }

