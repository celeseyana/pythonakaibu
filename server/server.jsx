import express from "express";
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: [""],
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


app.listen(8081, () => {
    console.log("Running")
})

