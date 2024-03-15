const Chat = {
    getAllChats: function (dbName, client, user) {
        const db = client.db(dbName);
        return db.collection("chats").find({
            $or: [
                {User1: user},
                {User2: user}
            ]
        }).sort({lastMessage: -1}).toArray();
    },

    getChat: function (dbName, client, id) {
        const db = client.db(dbName);
        return db.collection("messages").find({"chat": id}).sort({sentAt: -1}).toArray();
    },

    createChat: function (dbName, client, chat) {
        const db = client.db(dbName);
        return db.collection("chats").insertOne(chat);
    },

    insertMessage: function (dbName, client, msg) {
        const db = client.db(dbName);
        return db.collection("messages").insertOne(msg);
    }
}

module.exports = Chat;