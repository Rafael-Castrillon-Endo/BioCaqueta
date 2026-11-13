import express from 'express';
import Avistamiento from '../models/Avistamiento';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const avistamientos = await Avistamiento.find().sort({ fechaRegistro: -1 }).lean();
        res.render('home', { avistamientos });
    } catch (error) {
        console.log('Error GET / ->', error.message);
        res.status(500).send('Error al cargar los avistamientos');
    }
});