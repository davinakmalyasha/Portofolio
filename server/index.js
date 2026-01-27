const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken'); 
const SECRET_KEY = "rahasia_negara_davin_123"; 
const bcrypt = require('bcrypt');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use('/images', express.static('public/images'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images') 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

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


const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers['authorization']; 

    if (!tokenHeader) {
        return res.status(403).send("Akses Ditolak! Mana tokennya?");
    }
    const token = tokenHeader.split(' ')[1]; 

    if (!token) return res.status(403).send("Token format salah");

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).send("Token Gagal / Kadaluarsa");
        req.userId = decoded.id;
        next(); 
    });
};

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

app.post('/projects', verifyToken, upload.array('image', 5), (req, res) => {
    const { title, description, tech_stack, link_github, link_demo } = req.body; 
    if (!title || !description || !tech_stack) {
        return res.status(400).json({ message: "Woi, data jangan kosong dong!" });
    }
    let imagePath = null;
    if (req.files && req.files.length > 0) {
        imagePath = req.files.map(file => file.filename).join(',');
    }

    const sql = `INSERT INTO projects (title, description, tech_stack, image, link_github, link_demo) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [title, description, tech_stack, imagePath, link_github, link_demo];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err); 
            res.status(500).send(err);
        } else {
            res.send("Project berhasil disimpan");
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

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    
    db.query(sql, [email], (err, result) => {
        if (err) res.status(500).send({ error: "Error server" });
            if (result.length > 0) {
            const user = result[0];
            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (isPasswordValid) {
                const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({ message: "Login Berhasil", token: token });
            } else {
                res.status(401).json({ message: "Password Salah" });
            }
        } else {
            res.status(401).json({ message: "Email Tidak Ditemukan" });
        }
    });
});

app.get('/about-stats', (req, res) => {
  const sql = "SELECT * FROM about_stats WHERE id = 1";
  
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]); 
  });
});
app.listen(PORT, () => {
    console.log('Server jalan di port http://localhost:${PORT}');
});
