var pg = require('pg');
var connectionString = process.env.DATABASE_URL || process.env.DB_HOST;

var client = new pg.Client(connectionString);
client.connect();
var query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });