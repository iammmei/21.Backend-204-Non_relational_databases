const MongoClient = require('mongodb').MongoClient;

const uri = '<mongodb+srv://safaekhess:<password>@cluster0.xucvubn.mongodb.net/>';
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Connected to the database!');
});