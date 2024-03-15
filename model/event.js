const Event = {
    getAllEvents: function (dbName, client) {
        const today = new Date();
        const db = client.db(dbName);
        return db.collection("events").find({"date": { $gte: today }}).toArray();
    },

    getEvent: function (dbName, client, id) {
        const db = client.db(dbName);
        return db.collection("events").find({"_id": id}).toArray();
    }
}

module.exports = Event;