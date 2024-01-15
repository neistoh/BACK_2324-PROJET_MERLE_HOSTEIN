const { MongoClient } = require('mongodb');

// Remplacez <connection_string> par votre propre chaîne de connexion
const uri = 'mongodb://localhost:27017/databaseTest';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

connectToDatabase();