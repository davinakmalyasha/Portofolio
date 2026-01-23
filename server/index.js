const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'portofolio_davin'
});

db.connect(err => {
 if(err) {
    console.error("Database ga nyambung", err);
 } else {
    console.log('Database Nyambung');
 }
});


app.get('/', (req, res) => {    
    res.send('Halo dari davin');
});



app.get('/projects', (req, res) => {    
    const sql = "SELECT * FROM projects";
    db.query(sql, (err, results) => {
        if(err) {
            console.error("Error ngequery", err);
            res.status(500).send("Error server");
        } else {
            res.json(results);
        }
    });
});

app.post('/projects', (req, res) => {
   
    const { title, description, tech_stack } = req.body;
    const sql = "INSERT INTO projects (title, description, tech_stack) VALUES (?, ?, ?)";
    
    db.query(sql, [title, description, tech_stack], (err, result) => {
        if(err) {
            console.error("Error nambah data", err);
            res.status(500).send("Gagal nambah data");
        } else {
            res.status(201).json({ message: "Berhasil nambah project!", id: result.insertId });
        }
    });
});

app.delete('/projects/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM projects WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if(err) {
            console.error("Gagal hapus", err);
            res.status(500).send("Error hapus data");
        } else {
            res.json({ message: "Project dihapus!" });
        }
    });
});


app.get('/projects/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM projects WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if(err) {
            res.status(500).send("Error ambil data");
        } else {
            res.json(result[0]);
        }
    });
});

app.put('/projects/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, tech_stack } = req.body;

    const sql = "UPDATE projects SET title = ?, description = ?, tech_stack = ? WHERE id = ?";
    const values = [title, description, tech_stack, id];

    db.query(sql, values, (err, result) => {
        if(err) {
            console.error("Gagal update", err);
            res.status(500).send("Error update data");
        } else {
            res.json({ message: "Berhasil update project!" });
        }
    });
});


app.listen(PORT, () => {
    console.log('Server jalan di port http://localhost:${PORT}');
});
