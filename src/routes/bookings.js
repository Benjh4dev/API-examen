import { Router } from 'express';
import db from "../../db/db.js"
import { validateBooking } from "../schemas/booking.js";

const router = Router();

router.get('/bookings', (req, res) => {
    db.all('SELECT * FROM booking', (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

  router.post('/bookings', (req, res) => {
    try {
      
      const validationResult = validateBooking(req.body);
  
      if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error });
      }
  
      const { user_id, fecha_in, fecha_fin, type } = validationResult.data;
  

      const query = `
        INSERT INTO booking (user_id, fecha_in, fecha_fin, type)
        VALUES (?, ?, ?, ?)
      `;

      db.run(query, [user_id, fecha_in.toISOString().split('T')[0], fecha_fin.toISOString().split('T')[0], type], function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
  

        const newBookingId = this.lastID;
  

        return res.status(201).json({ success: 'Booking created', id: newBookingId });
      });
    } catch (error) {

      return res.status(500).json({ error: error.message });
    }
  });

  router.put('/bookings/:id', (req, res) => {
    try {
      let sql = 'SELECT * FROM booking WHERE id = ?';
      db.get(sql, [req.params.id], async (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        if (row) {
          const resp = validateBooking(req.body);
          if (!resp.success) {
            res.status(400).json({ error: resp.error });
            return;
          }
  
          sql = 'UPDATE bookings SET user_id = ?, fecha_in = ?, fecha_fin = ?, type = ? WHERE id = ?';
          db.run(
            sql,
            [
              resp.data.user_id,
              resp.data.fecha_in.toISOString().split('T')[0], // Obtén la fecha en formato 'YYYY-MM-DD'
              resp.data.fecha_fin.toISOString().split('T')[0], // Obtén la fecha en formato 'YYYY-MM-DD'
              resp.data.type,
              req.params.id
            ],
            (err) => {
              if (err) {
                res.status(500).json({ error: err.message });
                return;
              }
              res.json({ success: 'Booking updated' });
            }
          );
        } else {
          res.status(404).json({ error: 'Booking not found' });
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get('/bookings/:id', (req, res) => {
    let sql = `SELECT * FROM booking WHERE user_id = ?`;
    db.all(sql, [req.params.id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (rows) {
            res.json(rows);
        } else {
            res.status(404).json({ error: "Booking not found" });
        }
    });
});

router.delete("/bookings/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM booking WHERE id = ?";
    db.run(query, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json({ success: "Booking deleted", rowsAffected: this.changes });
    });
});




export { router as bookingsRouter}