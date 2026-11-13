import mongoose from "mongoose";

const conexionURL = process.env.MONGO_URL;

const conectarDB = async () => {
    try {
        await mongoose.connect(conexionURL);
        console.log('MongoDB conectado');
    } catch(error) {
        console.log('Error al conectar a MongoDB', error.message)
        process.exit(1);
    }
};

export default conectarDB;