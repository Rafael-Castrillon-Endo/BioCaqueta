import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { engine } from 'express-handlebars';
import conectarDB from './config/db.js';
import apiRouter from './routes/api.router.js';
import viewsRouter from './routes/views.router.js';

const app = express();
const PORT = process.env.PORT;
conectarDB();

app.engine('handlebars', engine({
    helpers: {
        eq: (a, b) => a === b,
        estadoClass: (estado) => {
            if (estado === 'Vulnerable') return 'bg-amber-100 text-amber-800 border-amber-200';
            if (estado === 'En peligro') return 'bg-red-100 text-red-800 border-red-200';
            return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        },
        formatFecha: (fecha) => {
            if (!fecha) return '';
            return new Date(fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));

app.use('/api/avistamientos', apiRouter);
app.use('/', viewsRouter);

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
