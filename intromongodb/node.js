const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables from .env file

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function run() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const usersCollection = client.db('myapp').collection('users');
        const postsCollection = client.db('myapp').collection('posts');
        const commentsCollection = client.db('myapp').collection('comments');

        // Create indexes
        postsCollection.createIndex({ user_id: 1, created_at: -1 });
        commentsCollection.createIndex({ post_id: 1, created_at: 1 });

        // Insert data
        const user = { name: 'John Doe', email: 'johndoe@example.com' };
        const userResult = await usersCollection.insertOne(user);

        const post = { user_id: userResult.insertedId, content: 'Hello world!', created_at: new Date() };
        const postResult = await postsCollection.insertOne(post);

        const comment = { post_id: postResult.insertedId, user_id: userResult.insertedId, content: 'Nice post!', created_at: new Date() };
        await commentsCollection.insertOne(comment);

        // Perform aggregation
        const postsWithComments = await postsCollection.aggregate([
            { $lookup: { from: 'comments', localField: '_id', foreignField: 'post_id', as: 'comments' } },
            { $sort: { created_at: -1 } }
        ]).toArray();

        console.log(postsWithComments);

        await client.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
