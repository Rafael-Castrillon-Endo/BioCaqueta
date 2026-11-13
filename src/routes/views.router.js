import express from 'express';
import Avistamiento from '../models/Avistamiento.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const filtro = {};
        if (req.query.categoria) {
            filtro.categoria = req.query.categoria;
        }

        const avistamientos = await Avistamiento.find(filtro).sort({ fechaRegistro: -1 }).lean();
        res.render('home', { avistamientos, filtroActual: req.query.categoria || '' });
    } catch (error) {
        console.log('Error GET / ->', error.message);
        res.status(500).send('Error al cargar los avistamientos');
    }
});

router.get('/editar/:id', async (req, res) => {
    try {
        const avistamiento = await Avistamiento.findById(req.params.id).lean();

        if(!avistamiento) {
            return res.status(404).send('Avistamiento no encontrado');
        }

        res.render('editar', { avistamiento });
    } catch(error) {
        console.log('Error GET /editar/:id ->', error.message);
        res.status(500).send('Error al cargar el avistamiento');
    }
});

export default router;
