const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const event = require('./event');
const {all} = require("express/lib/application");

const User = {
    /**
     * Get data about a user from the collection "users"
     * @param dbName
     * @param client
     * @param nickname
     * @returns {*}
     */
    getUser: function (dbName, client, nickname) {
        const db = client.db(dbName);
        return db.collection("users").find({"nickname": nickname}).toArray();
    },

    /**
     * Add a user in collection "users"
     * @param dbName
     * @param client
     * @param user
     * @returns {*}
     */
    insertUser: function (dbName, client, user) {
        const db = client.db(dbName);
        return db.collection("users").insertOne(user);
    },

    /**
     * Return all favorites events of a user using collection "favorites"
     * @param dbName
     * @param client
     * @param nickname
     * @returns {*}
     */
    getFavorites: function (dbName, client, nickname) {
        const db = client.db(dbName);
        return db.collection("favorites").find({"nickname": nickname}).toArray();
    },

    getAllFavorites: function (dbName, client) {
        const db = client.db(dbName);
        return db.collection("favorites").find({}).toArray();
    },

    /**
     * Add an event to the favorites of a user
     * @param dbName
     * @param client
     * @param nickname
     * @param eventId
     * @returns {*}
     */
    addFavorites: async function (dbName, client, nickname, eventId) {
        const db = client.db(dbName);
        const favorisExist = await db.collection("favorites").find({user: nickname, event: +eventId}).toArray();
        console.log(favorisExist.length>0);
        if(favorisExist.length>0){
            return '';
        }
        const allEvent = await this.getAllFavorites(dbName,client);
        const _id = allEvent.length+1;
        return db.collection("favorites").insertOne({_id:_id, user: nickname, event: +eventId});
    },

    /**
     * Generate a JWT Token for authentication
     * @param username
     * @returns {*}
     */
    generateAccessToken: function (username) {
        return jwt.sign(username, process.env.TOKEN_SECRET, {expiresIn: '7d'});
    },

    /**
     * Hash the password of the user on insertion for more security
     * @param passwordToAshe
     * @returns {Promise<unknown>}
     */
    hashPassword: function (passwordToAshe) {
        return new Promise(() => {
            bcrypt.genSalt(10, function (err, salt) {
                if (err)
                    return err;

                bcrypt.hash(passwordToAshe, salt, function (err, hash) {
                    console.log(hash);
                    if (err)
                        return err;
                    return hash;
                });
            });
        });
    },

    /**
     * Check if the password given by the user correspond to the one in the collection
     * @param passwordClear
     * @param passwordHash
     * @returns {Promise<unknown>}
     */
    checkPasswordValidity: async function (passwordClear, passwordHash) {
        return new Promise(res => {
            bcrypt.compare(passwordClear, passwordHash, function (err, isPasswordMatch) {
                console.log(isPasswordMatch);
                if (err) {
                    console.log(err);
                    res(isPasswordMatch);
                }
                res(isPasswordMatch);
            })
        })
    }

}

module.exports = User;