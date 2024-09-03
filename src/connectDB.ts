import mysql from 'mysql2/promise';
export const connection = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Lucia',
  database: 'miranda',
});



