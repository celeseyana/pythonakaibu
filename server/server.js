import express from "express";
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST, GET"],
        credentials: true
    }
))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({ Message: "Server Side Error knock knock mf" });
        if (data.length > 0) {
            const name = data[0].name;
            const token = jwt.sign({ name }, "886e7ac0addea5116e60cf0d77d7712708a33de58ee1362a026fa64a82de428b", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({Status: "Success"})
        } else {
            return res.json({Message: "dawg u r not in here mane"});
        }
    })
})

app.listen(8081, () => {
    console.log("Running")
})

