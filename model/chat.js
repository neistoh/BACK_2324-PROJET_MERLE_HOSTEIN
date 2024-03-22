const Chat = {
    /**
     * Get all chats in the collection "chats"
     * @param dbName
     * @param client
     * @param nickname
     * @returns {*}
     */
    getAllChats: function (dbName, client, nickname) {
        const db = client.db(dbName);
        console.log(nickname)

        return db.collection("chats").find({
            $or: [
                {"user1": nickname},
                {"user2": nickname}
            ]
        }).sort({lastMessage: -1}).toArray();
    },

    /**
     * Get a specific chat and its messages based on its id
     * @param dbName
     * @param client
     * @param id
     * @returns {*}
     */
    getChat: function (dbName, client, id) {
        const db = client.db(dbName);
        const response = db.collection("messages").find({"chat": +id}).sort({sentAt: 1}).toArray()
        console.log(response);
        return response;
    },

    /**
     * Create a chat between two users
     * @param dbName
     * @param client
     * @param chat
     * @returns {*}
     */
    createChat: function (dbName, client, chat) {
        const db = client.db(dbName);
        return db.collection("chats").insertOne(chat);
    },

    /**
     * Add a message in a chat using the collection "messages"
     * @param dbName
     * @param client
     * @param msg
     * @returns {*}
     */
    insertMessage: function (dbName, client, msg) {
        const db = client.db(dbName);
        console.log("Essai insert: "+msg)
        db.collection("messages").insertOne(JSON.parse(msg));
    }
}

module.exports = Chat;