import express from 'express';
import dotenv from 'dotenv'
import conectarDB from './config/db.js';
import apiRouter from './routes/api.router.js';
import viewsRouter from './routes/views.router.js';
import { engine } from 'express-handlebars';

dotenv.config();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');
const app = express();
const PORT = process.env.PORT;
conectarDB();

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));

app.use('/api/avistamientos', apiRouter);
app.use('/', viewsRouter);


app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));