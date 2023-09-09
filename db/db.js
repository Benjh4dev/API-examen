import sqlite3 from "sqlite3";
import "dotenv/config";


const DB_FILE = process.env.DBFILE || 'mydatabase.db';

const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
      console.error('Error al conectar con la base de datos:', err.message);
    } else {
      console.log('Conexión exitosa con la base de datos:');
    }
  });

export default db;