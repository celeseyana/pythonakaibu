import express from "express";
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cookieParser());
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

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({Message: "You are not logged in."})
    } else {
        jwt.verify(token, "886e7ac0addea5116e60cf0d77d7712708a33de58ee1362a026fa64a82de428b", (err, decoded) => {
            if (err) {
               return res.json({Message: "auth error stoopid"})
            } else {
                req.name = decoded.name;
                next();
           }
        })
    }
}

app.get('/api/quizdata', (req, res) => {
    const randomQuestionQuery = `
        SELECT q.id AS question_id, q.question_text, a.id AS answer_id, a.answer_text, a.is_correct
        FROM questions q
        LEFT JOIN answers a ON q.id = a.question_id
        ORDER BY RAND() LIMIT 1
    `;

    db.query(randomQuestionQuery, (err, results) => {
        if (err) return res.status(500).send(err);

        if (results.length > 0) {
            const quizdata = {
                id: results[0].question_id,
                text: results[0].question_text,
                answers: results
                    .filter(result => result.question_id === results[0].question_id)  // Only answers for this question
                    .map(result => ({
                        id: result.answer_id,  // Answer ID
                        text: result.answer_text,  // Answer text
                        is_correct: result.is_correct  // Boolean indicating correct answer
                })),
            };
            res.json(quizdata);
        } else {
            res.status(404).send('No questions found');
        }
    });
});

app.get('/',verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name})
})

app.post('/signup', (req, res) => {
    console.log(req.body)
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

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

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"})
})

app.listen(8081, () => {
    console.log("Running")
})

