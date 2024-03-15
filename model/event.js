const Event = {
    getAllEvents: function (dbName, client) {
        const today = new Date();
        const db = client.db(dbName);
        return db.collection("events").find({"date": {$gte: today}}).toArray();
    },

    getEvent: function (dbName, client, id) {
        const db = client.db(dbName);
        return db.collection("events").find({"_id": id}).toArray();
    },

    getEventByName: function (dbName, client, name) {
        const db = client.db(dbName);
        return db.collection("events").find({"name": name}).toArray();
    },

    getEventByPriceGTE: function (dbName, client, price) {
        const db = client.db(dbName);
        return db.collection("events").find({"price": {$gte: price}}).toArray();
    },

    getEventByPriceLTE: function (dbName, client, price) {
        const db = client.db(dbName);
        return db.collection("events").find({"price": {$lte: price}}).toArray();
    },

    getEventByTheme: function (dbName, client, theme) {
        const db = client.db(dbName);
        return db.collection("events").find({"theme": theme}).toArray();
    }
}

module.exports = Event;