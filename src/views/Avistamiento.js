import mongoose from 'mongoose';

const AvistamientoSchema = new mongoose.Schema (
    {

        nombreComun : {
            type : String,
            required : true
        },

        nombreCientifico : {
            type : String,
            required : true
        },

        categoria : {
            type : String,
            required : true,
            enum : ['Mamífero', 'Ave', 'Reptil', 'Anfibio','Flora']
        },

        zona : {
            type : String,
            required : true
        },

        estadoConservacion : {
            type : String,
            required : false,
            enum : ['Preocupación menor', 'Vulnerable', 'En peligro'],
            default : 'Preocupación menor'
        },

        investigador : {
            type : String,
            required : true
        },

        fechaRegistro : {
            type : Date,
            required : false,
            default : Date.now
        }
 
    }
);

export default mongoose.model('Avistamiento', AvistamientoSchema);