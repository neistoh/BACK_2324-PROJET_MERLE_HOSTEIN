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
    }
}

module.exports = Chat;