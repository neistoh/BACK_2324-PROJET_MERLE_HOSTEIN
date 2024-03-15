const process = require("node:process");
const {MongoClient} = require("mongodb");
require('dotenv').config()
const args = process.argv.slice(2);
const url = args[0] ?? 'mongodb://localhost:27017';
const dbName = args[1] ?? "IsenConnect";
const client = new MongoClient(url);

const dbManager = {

    getClient: function (){
        return client;
    },

    getDBname: function (){
        return dbName;
    }
}

module.exports = dbManager;