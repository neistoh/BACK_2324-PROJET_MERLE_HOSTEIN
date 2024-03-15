const { ObjectId} = require('mongodb');

const Utilisateur = {
    getUtilisateur: function (dbName,client) {
        const db = client.db(dbName);
        return db.collection("utilisateur").find({}).toArray();
    }
}

module.exports = Utilisateur;