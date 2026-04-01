const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());

const config = {
    user: "rxn",
    password: "rxn123",
    server: "DESKTOP-0ATND86",
    database: "FakeStop",
    options: {
        trustServerCertificate: true,
        trustedConnection: true,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'
    },
    port: 1433
};

app.get('/', (req, res) => {
    return res.json("Hello World");
});

app.get('/Games', async (req, res) => {
    try {

        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Games');

        return res.json(result);
    } catch (err) {
        console.log(err);
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

