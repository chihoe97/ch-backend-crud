import mysql from 'mysql2';
import dotenv from 'dotenv'

const config = dotenv.config()

// create the connection to database
const db = mysql.createConnection({
    host: config.parsed.DB_HOST,
    user: config.parsed.DB_USERNAME,
    database: config.parsed.DB_DATABASE,
    password: config.parsed.DB_PASSWORD,
});
  
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    
    let sql = "CREATE TABLE IF NOT EXISTS student (" +
        "student_email VARCHAR(255) NOT NULL UNIQUE, teacher_email VARCHAR(255) NOT NULL, status TINYINT NOT NULL)";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});

export default mysql