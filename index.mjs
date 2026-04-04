import express from 'express'; // ECMAScript Modules
import usuarioRoutes from './routes/usuarioRoutes.js';
import db from './config/db.js';

// Crear la app
const app = express()

// Carpeta pública
app.use(express.static('public'));

// Habilitar lectura de datos del formulario
app.use(express.urlencoded({extended:true}))

// Routing
app.use('/auth', usuarioRoutes);

// Conexión a la base de datos
try {
    await db.authenticate();
    console.log('Conexión exitosa a la base de datos');
} catch (error) {
    console.log(error);
}

// Habilitar Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Definir un puerto y arrancar el proyecto
const port = 3000;

app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});