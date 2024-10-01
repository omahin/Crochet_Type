import { model, Schema } from "mongoose";

const CrochetSchema = new Schema({
    created_at: {
        type: String,
        required: true,
},
    fio: {
        type: String,
        required: true,
},
    tex: {
        type: Number,
        required: true,
},
    composicao: {
        type: String,
        required: true,
},
    comprimento: {
        type: String,
        required: true,
},
    peso: {
        type: String,
        required: true,
},
    agulha_croche_minimo: {
        type: String,
        required: true,
},
    agulha_croche_maximo: {
        type: String,
        required: true,
},
    agulha_trico_minimo: {
        type: String,
        required: true,
},
    agulha_trico_maximo: {
        type: String,
        required: true,
},
    quantidade_cores: {
        type: Number,
        required: true,
},
    malha_rendimento_dimensao: {
        type: String,
        required: true,
},
    malha_rendimento_agulha_trico: {
        type: String,
        required: true,
},
    status: {
        type: String,
        required: true,
},  
});

export const CrochetModel = model('crochets', CrochetSchema);