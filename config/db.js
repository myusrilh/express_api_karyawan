const mysql = require("mysql");
const dbConfig = require("./db.config.js");

// Create connection to the database
const connection = mysql.createConnection({
    host: dbConfig.db.HOST,
    user: dbConfig.db.USER,
    password: dbConfig.db.PASSWORD,
    database: dbConfig.db.DATABASE,
});

// open MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database");
});


module.exports = connection;