const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const collection = client.db('test').collection('students');
    
    const insertionResult = await collection.insertOne({
      name: 'John Doe',
      age: 25,
      grade: 'A'
    });
    
    console.log(`Inserted document into the collection`);
    
    const docs = await collection.find({}).toArray();
    
    console.log(`Found ${docs.length} documents in the collection`);
    console.log(docs);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    client.close();
  }
}

main();



