const Event = {
    /**
     * Get all events in the collection "events"
     * @param dbName
     * @param client
     * @returns {*}
     */
    // TODO : Delete if unused
    getAllEvents: function (dbName, client) {
        const today = new Date();
        const db = client.db(dbName);
        return db.collection("events").find({"date": {$gte: today}}).sort({name: -1}).toArray();
    },

    /**
     * Get all events in the collection "events" created by a specific user
     * @param dbName
     * @param client
     * @param userName
     * @returns {*}
     */
    getAllEventsFromUser: function (dbName, client, userName) {
        const db = client.db(dbName);
        return db.collection("events").find({"owner": userName}).sort({name: -1}).toArray();
    },

    getUsersFromEventInFavorites: function (dbName, client, eventId) {
        const db = client.db(dbName);
        return db.collection("favorites").find({"event": +eventId}).sort({name: -1}).toArray();
    },

    getEventFromUserInFavorites: function (dbName, client, userNickname) {
        const db = client.db(dbName);
        return db.collection("favorites").aggregate([
            {
              $match: {
                  user: userNickname
              }
            },
            { $lookup:
                    {
                        from: "events",
                        localField: "event",
                        foreignField: "_id",
                        as: "listeEvents"
                    }
            }
        ]).sort({event: -1}).toArray();
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
        return db.collection("events").find({"_id": +id}).toArray();
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
        const query = {_id: +id};
        let update = {}
        event.name?update.name=event.name:'';
        event.price?update.price=event.price:'';
        event.theme?update.theme=event.theme:'';
        event.date?update.date=event.date:'';
        db.collection("events").updateOne(query, {$set:update});
        return this.getEvent(dbName,client,id);
    },

    /**
     * Get a list of events filtered by a combination of name, theme and price (greater or equal than and lesser or equal than)
     * @param dbName
     * @param client
     * @param filtre
     * @returns {*}
     */
    getEventsFiltered: function (dbName, client, filtre) {
        const today = new Date();
        const db = client.db(dbName);
        let query = {}
        if (filtre.name) query.name = filtre.name;
        if (filtre.theme) query.theme = filtre.theme;
        if (filtre.price) {
            query.price = filtre.price >= 0 ? {$gte: +filtre.price} : {$lte: Math.abs(filtre.price)};
        }

        query.date = {$gte: today};
        if (filtre.tri === "date") return db.collection("events").find(query).sort({date: filtre.ordre}).toArray()
        else return db.collection("events").find(query).sort({price: filtre.ordre}).toArray()
    },

    /**
     * Check if user is owner of event
     * @param dbName
     * @param client
     * @param eventId
     * @param nickname
     */
    isUserOwner: function (dbName, client, eventId, nickname) {
        const db = client.db(dbName);
        return db.collection("events").findOne({_id: +eventId, owner: nickname});
    }
}

module.exports = Event;