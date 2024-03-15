const { ObjectId } = require('mongodb');

const User = {
    getUser: function (dbName, client, nickname) {
        const db = client.db(dbName);
        return db.collection("users").find({"pseudo": nickname}).toArray();
    }
}

module.exports = User;