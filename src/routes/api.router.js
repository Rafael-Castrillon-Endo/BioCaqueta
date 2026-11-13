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

router.put('/:id', async (req, res) => {

    try {
        const actualizado = await Avistamiento.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new : true,
                runValidators : true
            }
        );

        if(!actualizado){
            return res.status(404).json({
                state : 404,
                message : "Avistamiento no encontrado"
            });
        }

        res.status(200).json(actualizado);
    } catch(error) {
        console.log('Error /api/avistamientos/:id ', error.message);
        res.status(400).json({
            state : 400,
            message : error.message
        });
    }

});

router.post('/update/:id', async (req, res) => {
    try {
        await Avistamiento.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new : true,
                runValidators : true
            }
        );

        res.redirect('/');
    } catch(error){
        console.log('Error /api/avistamientos/:id ', error.message);
        res.status(400).json({
            state : 400,
            message : error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Avistamiento.findByIdAndDelete(req.params.id);

        if(!eliminado){
            return res.status(404).json({
                state : 404,
                message : "Avistamiento no encontrado"
            })
        }

        res.status(200).json(eliminado)
    } catch(error) {
        console.log('Error /api/avistamiento/:id (delete) ', error.message);
        res.status(400).json({
            state : 400,
            message : error.message
        })
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        await Avistamiento.findByIdAndDelete(req.params.id);

        res.redirect('/');
    } catch(error) {
        console.log('Error /api/avistamiento/:id (delete) ', error.message);
        res.status(400).json({
            state : 400,
            message : error.message
        })
    }
});


export default router;
