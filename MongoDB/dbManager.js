const {MongoClient} = require("mongodb");
const {configDotenv} = require("dotenv");
require('dotenv').config()

const args = process.argv.slice(2);
const url = args[0] ?? "mongodb+srv://test:test@isenconnect.wpaxvgp.mongodb.net";
const dbName = args[1] ?? "IsenConnect";
const client = new MongoClient(url);

const dbManager = {

    getClient: function () {
        return client;
    },

    getDBname: function () {
        return dbName;
    }
}

module.exports = dbManager;