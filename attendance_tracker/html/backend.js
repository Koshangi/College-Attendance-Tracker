const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3031;

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database('./attendance.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        division TEXT NOT NULL
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY(student_id) REFERENCES students(id)
    )`);
});

app.use(express.static(path.join(__dirname, 'html'))); // Change 'public' to the actual directory containing your frontend files

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attandance.html'));
});

app.get('/students', (req, res) => {
    db.all('SELECT * FROM students', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.post('/students', (req, res) => {
    const { name, division } = req.body;
    db.run(
        'INSERT INTO students (name, division) VALUES (?, ?)',
        [name, division],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID });
            }
        }
    );
});

app.post('/attendance', (req, res) => {
    const { student_id, date, status } = req.body;
    db.run(
        'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)',
        [student_id, date, status],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID });
            }
        }
    );
});

app.get('/attendance/:student_id', (req, res) => {
    const student_id = req.params.student_id;
    db.all(
        'SELECT * FROM attendance WHERE student_id = ?',
        [student_id],
        (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(rows);
            }
        }
    );
});

// Start server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:${PORT}");
});
