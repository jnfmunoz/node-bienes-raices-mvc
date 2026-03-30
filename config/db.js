import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config({path: '.env'});

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS ?? '', {
    host: process.env.BD_HOST,
    port: '3306', // default
    dialect: 'mysql',
    define: {
        timestamps: true // agrega automáticamente createdAt y updatedAt a todas las tablas
    },
    pool: {
        max: 5, // máximo de conexiones simultáneas a la BD
        min: 0, // mínimo de conexiones mantenidas abiertas
        acquire: 30000, // tiempo máximo (ms) para intentar obtener una conexión antes de marcar error
        idle: 10000 // tiempo (ms) que una conexión puede estar inactiva antes de cerrarse
    },
    // operatorsAliases: false
});

export default db;
