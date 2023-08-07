const MongoClient = require('mongodb').MongoClient;

const uri = '<your connection string>';
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Connected to the database!');
});