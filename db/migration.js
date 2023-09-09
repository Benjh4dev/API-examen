import db from "../db/db.js";

const createTableQueryUsers = `
  CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    name TEXT
  )
`;

const createTableQueryBookings = `
  CREATE TABLE IF NOT EXISTS booking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    fecha_in DATE,
    fecha_fin DATE,
    type TEXT
  )
`;

const insertSeedDataQueriesUsers = [
  `INSERT INTO user (email, name) VALUES ('user1@example.com', 'User 1')`,
  `INSERT INTO user (email, name) VALUES ('user2@example.com', 'User 2')`,
  `INSERT INTO user (email, name) VALUES ('user3@example.com', 'User 3')`,
  `INSERT INTO user (email, name) VALUES ('user4@example.com', 'User 4')`,
  `INSERT INTO user (email, name) VALUES ('user5@example.com', 'User 5')`
];

const insertSeedDataQueriesBookings = [
  `INSERT INTO booking (user_id, fecha_in, fecha_fin, type) VALUES (1, '2023-09-10', '2023-09-12', 'a')`,
  `INSERT INTO booking (user_id, fecha_in, fecha_fin,  type) VALUES (2, '2023-09-11', '2023-09-13', 'b')`,
  `INSERT INTO booking (user_id, fecha_in, fecha_fin,  type) VALUES (3, '2023-09-12', '2023-09-14', 'c')`,
  `INSERT INTO booking (user_id, fecha_in, fecha_fin,  type) VALUES (4, '2023-09-13', '2023-09-15', 'd')`,
  `INSERT INTO booking (user_id, fecha_in, fecha_fin,  type) VALUES (5, '2023-09-14', '2023-09-16', 'a')`,
  `INSERT INTO booking (user_id, fecha_in, fecha_fin,  type) VALUES (4, '2023-09-13', '2023-09-15', 'd')`,
  `INSERT INTO booking (user_id, fecha_in, fecha_fin,  type) VALUES (5, '2023-09-14', '2023-09-16', 'a')`
];

db.exec(createTableQueryUsers, (err) => {
  if (err) {
    console.error('Error al crear la tabla "users":', err.message);
  } else {
    console.log('Tabla "users" creada con éxito.');

    insertSeedDataQueriesUsers.forEach((query, index) => {
      db.run(query, (err) => {
        if (err) {
          console.error(`Error al insertar el registro ${index + 1} en la tabla "users":`, err.message);
        } else {
          console.log(`Registro ${index + 1} insertado con éxito en la tabla "users".`);
        }
      });
    });
  }

  // Crear la tabla "bookings" después de crear la tabla "users"
  db.exec(createTableQueryBookings, (err) => {
    if (err) {
      console.error('Error al crear la tabla "booking":', err.message);
    } else {
      console.log('Tabla "bookings" creada con éxito.');

      insertSeedDataQueriesBookings.forEach((query, index) => {
        db.run(query, (err) => {
          if (err) {
            console.error(`Error al insertar el registro ${index + 1} en la tabla "bookings":`, err.message);
          } else {
            console.log(`Registro ${index + 1} insertado con éxito en la tabla "bookings".`);
          }
        });
      });
    }

    db.close((err) => {
      if (err) {
        console.error('Error al cerrar la base de datos:', err.message);
      } else {
        console.log('Conexión con la base de datos cerrada.');
      }
    });
  });
});
