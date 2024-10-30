const express = require('express');
const router = express.Router();
const db = require('../configs/database');

router.get('/', (req, res) => {
    db.query('SELECT * FROM todolist_app', (err, results) => {
        if (err) {
            console.error('Error executing query: ', err.stack);
            return res.status(500).send('Internal server error');
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { title, description } = req.body;
    db.query('INSERT INTO todolist_app (title, description) VALUES (?, ?)', [title, description], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err.stack);
            return res.status(500).send('Internal server error');
        }
        res.status(201).json({ id: results.insertId, title, description });
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    db.query('UPDATE todolist_app SET title = ?, description = ? WHERE id = ?', [title, description, id], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err.stack);
            return res.status(500).send('Internal server error');
        }
        if (results.affectedRows === 0) return res.status(404).send('Task not found');
        res.status(200).json({ id, title, description });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todolist_app WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err.stack);
            return res.status(500).send('Internal server error');
        }
        if (results.affectedRows === 0) return res.status(404).send('Task not found');
        res.status(200).send('Task deleted');
    });
});

module.exports = router;
