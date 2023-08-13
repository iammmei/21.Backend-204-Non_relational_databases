const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

async function main() {
    try {
      await client.connect();
      console.log("Connected to MongoDB");


      const collection = client.db('myapp').collection('users')
      
      
 
const usersCollection = client.db('myapp').collection('users');
const postsCollection = client.db('myapp').collection('posts');
const commentsCollection = client.db('myapp').collection('comments');

const user = { name: 'John Doe', email: 'johndoe@example.com' };
const userResult = await usersCollection.insertOne(user);

const post = { user_id: userResult.insertedId, content: 'Hello world!', created_at: new Date() };
const postResult = await postsCollection.insertOne(post);

const comment = { post_id: postResult.insertedId, user_id: userResult.insertedId, content: 'Nice post!', created_at: new Date() };
await commentsCollection.insertOne(comment);


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