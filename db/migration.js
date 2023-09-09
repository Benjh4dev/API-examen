import db from "../db/db.js";


const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    name TEXT
  )
`;


const insertSeedDataQueries = [
    `INSERT INTO users (email, name) VALUES ('user1@example.com', 'User 1')`,
    `INSERT INTO users (email, name) VALUES ('user2@example.com', 'User 2')`,
    `INSERT INTO users (email, name) VALUES ('user3@example.com', 'User 3')`,
  ];
  
  
  db.exec(createTableQuery, (err) => {
    if (err) {
      console.error('Error al crear la tabla "user":', err.message);
    } else {
      console.log('Tabla "users" creada con éxito.');
  
      
      insertSeedDataQueries.forEach((query, index) => {
        db.run(query, (err) => {
          if (err) {
            console.error(`Error al insertar el registro ${index + 1}:`, err.message);
          } else {
            console.log(`Registro ${index + 1} insertado con éxito.`);
          }
        });
      });
    }
  C
    
    db.close((err) => {
      if (err) {
        console.error('Error al cerrar la base de datos:', err.message);
      } else {
        console.log('Conexión con la base de datos cerrada.');
      }
    });
  });
