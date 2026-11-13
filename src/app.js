import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));

app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));