import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const conexionURL = process.env.MONGO_URL;
        await mongoose.connect(conexionURL);
        console.log('MongoDB conectado');
    } catch(error) {
        console.log('Error al conectar a MongoDB', error.message)
        process.exit(1);
    }
};

export default conectarDB;
