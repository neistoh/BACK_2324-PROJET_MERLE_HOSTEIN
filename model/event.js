const { ObjectId } = require('mongodb');

const Event = {
    getAllEvents: function (dbName,client) {
        const db = client.db(dbName);
        return db.collection("events").find({}).toArray();
    },

    getEvent: function (dbName,client, id) {
        const db = client.db(dbName);
        return db.collection("events").find({ "_id":id }).toArray();
    }
}

module.exports = Event;