const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ded98ff0607',
    database: 'onepageregister',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected success! ');
});

app.post('/info/submit', (req, res) => {
    const { name, phoneNumber, selectedDate } = req.body;
    const date = new Date(selectedDate);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

    const insertQuery = 'INSERT INTO lpinfo (name, phone_number, date_time) VALUES (?, ?, ?)';
    connection.query(insertQuery, [name, phoneNumber, formattedDate], (error, results, fields) => {
        if (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'Error inserting data into the database.' });
        } else {
            console.log('Data inserted successfully');
            res.json({ message: 'Data inserted successfully.' });
        }
    });
});

const port = 8080; // Change this to the port number you want to use
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
