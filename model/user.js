const User = {
    getUser: function (dbName, client, nickname) {
        const db = client.db(dbName);
        return db.collection("users").find({"nickname": nickname}).toArray();
    },

    getFavorites: function (dbName, client, nickname) {
        const db = client.db(dbName);
        return db.collection("favorites").find({"nickname": nickname}).toArray();
    }
}

module.exports = User;