const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {reject} = require("bcrypt/promises");

const User = {
    getUser: function (dbName, client, nickname) {
        const db = client.db(dbName);
        return db.collection("users").find({"nickname": nickname}).toArray();
    },

    getFavorites: function (dbName, client, nickname) {
        const db = client.db(dbName);
        return db.collection("favorites").find({"nickname": nickname}).toArray();
    },

    insertUser: function (dbName, client, user) {
        const db = client.db(dbName);
        return db.collection("users").insertOne(user);
    },

    generateAccessToken: function (username) {
        return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '7d' });
    },

    hashPassword: function (passwordToAshe){
        bcrypt.genSalt(10, function(err, salt) {
            if (err)
                return err;

            bcrypt.hash(passwordToAshe, salt, function (err, hash) {
                console.log(hash);
                if(err)
                    return err;
                return hash;
            });
        });
    },

    checkPasswordValidity: async function (passwordClear, passwordHash){
        return new Promise(res=>{
            bcrypt.compare(passwordClear, passwordHash, function(err, isPasswordMatch) {
                console.log(isPasswordMatch);
                if(err) {
                    console.log(err);
                    res(isPasswordMatch);
                }
                res(isPasswordMatch);
            })
        })
    }

}

module.exports = User;