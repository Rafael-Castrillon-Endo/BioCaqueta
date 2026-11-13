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
        console.log('Error /api/avistamientos -> ', error.message);
        res.status(500).json({
            estado : 500,
            message : error.message
        });
    }

});


export default router;