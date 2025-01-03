import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'] })); // Allow only frontend origin
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB size limit
    fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.pdf', '.docx', '.txt'];
        if (!allowedExtensions.includes(path.extname(file.originalname))) {
            return cb(new Error('Only PDF, DOCX, and TXT files are allowed!'));
        }
        cb(null, true);
    },
});

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL password
    database: 'myform', // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected!');
    }
});

// API Endpoint to save form data
app.post('/submit-form', upload.single('resume'), (req, res) => {
    const {
        firstname,
        lastname,
        email,
        contact,
        gender,
        subject,
        resume,
        url,   
     choice,
        about,
    } = req.body;

    const Resume = req.file ? req.file.filename : null; // Get the uploaded file name

    const sql = `INSERT INTO user (firstname, lastname, email, contact, gender, subject, resume, url, choice, about) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        firstname,
        lastname,
        email,
        contact,
        gender,
        JSON.stringify(subject), // Store as JSON string
        Resume,
        url,
        choice,
        about,
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).json({ message: 'Failed to save data', error: err.message });
        }
        res.status(200).json({ message: 'Data saved successfully' });
    });
});

// Start the server
const PORT = 5005;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});