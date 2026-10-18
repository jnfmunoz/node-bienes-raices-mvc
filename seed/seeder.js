import { exit } from "node:process"
import categorias from "./categorias.js";
import precios from "./precios.js";
import Categoria from "../models/Categoria.js";
import Precio from "../models/Precio.js";
import db from '../config/db.js';

const importarDatos = async () => {
    try {
        // Autenticar la bd
        await db.authenticate();

        // Generar las columnas
        await db.sync()

        // Insertar datos
        await Categoria.bulkCreate(categorias);
        console.log('Datos importados correctamente');
        exit();

    }
    catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === "-i"){
    importarDatos();
}