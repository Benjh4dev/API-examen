import { Router } from "express";
import db from "../../db/db.js"
import { validateUser } from "../schemas/user.js";

const router = Router();

router.get("/users", (req, res) => {
    db.all("SELECT * FROM user", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
}
);

router.post("/users", (req, res) => {
    try {
        const { name, email } = req.body;

    const res = validateUser(req.body);

    if (!res.success) {
        res.status(400).json({ error: res.error });
        return;
    }

    const query = `INSERT INTO user (name, email) VALUES (?, ?)`;
    db.run(query, [name, email], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const id = this.lastID;
        res.status(201).json({ success: "User created", id: id });
    });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    

});

router.put("/users/:id", (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;

    const validationResult = validateUser(req.body);

    if (!validationResult.success) {
        res.status(400).json({ error: validationResult.error });
        return;
    }

    const query = "UPDATE user SET name = ?, email = ? WHERE id = ?";
    db.run(query, [name, email, userId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json({ success: "User updated", rowsAffected: this.changes });
    });
});


router.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    const query = "DELETE FROM user WHERE id = ?";
    db.run(query, [userId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json({ success: "User deleted", rowsAffected: this.changes });
    });
});

export { router as usersRouter}



