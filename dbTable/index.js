import pg from 'pg';
import dotenv from 'dotenv'

const { Client } = pg;
const config = dotenv.config()
console.log('config>>>>>>', config)
const client = new Client({
    host: config.parsed.DB_HOST,
    user: config.parsed.DB_USERNAME,
    database: config.parsed.DB_DATABASE,
    password: config.parsed.DB_PASSWORD,
});

console.log('client>>>>>>', client)
const execute = async (query) => {
    try {
        await client.connect();     // gets connection
        await client.query(query);  // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();         // closes connection
    }
};
// Create table sql query if not exists
// id - psql auto generated serial
// desc - unique field for cat fact
const query = `
    CREATE TABLE IF NOT EXISTS "catFact" (
	    "id" SERIAL,
	    "desc" TEXT NOT NULL UNIQUE
    );`;

execute(query).then(result => {
    if (result) {
        console.log('Table created');
    }
});
export default pg