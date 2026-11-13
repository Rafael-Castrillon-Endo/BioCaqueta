import express from 'express';
import Avistamiento from '../models/Avistamiento.js';

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const filtro = {};
        if(req.query.categoria){
            filtro.categoria = req.query.categoria;
        }

        const avistamientos = await Avistamiento.find(filtro).sort({
            fechaRegistro : -1
        });

        res.status(200).json(avistamientos);
    } catch(error) {
        console.log('Error /api/avistamientos (get) -> ', error.message);
        res.status(500).json({
            state : 500,
            message : error.message
        });
    }

});

router.post('/', async (req, res) => {

    try {
        const nuevoAvistamiento = new Avistamiento(req.body);
        await nuevoAvistamiento.save();

        const esFormulario = req.headers['content-type']?.includes('application/x-www-form-urlencoded');

        if(esFormulario){
            return res.redirect('/');
        }

        res.status(201).json(nuevoAvistamiento);
    } catch(error) {
        console.log('Error /api/avistamientos (post) ->', error.message)
        res.status(400).json({
            state : 400,
            message : error.message
        });
    }

});


export default router;