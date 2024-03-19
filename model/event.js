const {ObjectId} = require("mongodb");
const Event = {
    /**
     * Get all events in the collection "events"
     * @param dbName
     * @param client
     * @returns {*}
     */
    getAllEvents: function (dbName, client) {
        const today = new Date();
        const db = client.db(dbName);
        return db.collection("events").find({"date": {$gte: today}}).toArray();
    },

    /**
     * Get all events in the collection "events" created by a specific user
     * @param dbName
     * @param client
     * @param userId
     * @returns {*}
     */
    getAllEventsFromUser: function (dbName, client, userId) {
        const today = new Date();
        const db = client.db(dbName);
        return db.collection("events").find({"date": {$gte: today}, "owner": userId}).toArray();
    },

    /**
     * Get an event by its unique ID
     * @param dbName
     * @param client
     * @param id
     * @returns {*}
     */
    getEvent: function (dbName, client, id) {
        const db = client.db(dbName);
        return db.collection("events").find({"_id": id}).toArray();
    },

    /**
     * Add an event in the collection "events"
     * @param dbName
     * @param client
     * @param event
     * @returns {*}
     */
    insertEvent: function (dbName, client, event) {
        const db = client.db(dbName);
        return db.collection("events").insertOne(event);
    },

    /**
     * Update the data of an event based on its ID
     * @param dbName
     * @param client
     * @param id
     * @param event
     * @returns {*}
     */
    updateEvent: function (dbName, client, id, event) {
        const db = client.db(dbName);
        const query = {_id: new ObjectId(id)};
        return db.collection("users").updateOne(query, event);
    },

    /**
     * Get a list of events filtered by a combination of name, theme and price (greater or equal than and lesser or equal than)
     * @param dbName
     * @param client
     * @param name
     * @param theme
     * @param price
     * @returns {*}
     */
    getEventsFiltered: function (dbName, client, name, theme, price) {
        const today = new Date();
        const db = client.db(dbName);
        let query = {}

        if (name) query.name = name;
        if (theme) query.theme = theme;
        if (price) {
            query.price = price >= 0 ? {$gte: price} : {$lte: Math.abs(price)};
        }

        return db.collection("events").find({"date": {$gte: today}, query})
    }
}

module.exports = Event;