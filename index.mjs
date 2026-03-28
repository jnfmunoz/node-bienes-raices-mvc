import express from 'express'; // ECMAScript Modules
import usuarioRoutes from './routes/usuarioRoutes.js';

// Crear la app
const app = express()

// Carpeta pública
app.use(express.static('public'));

// Routing
app.use('/auth', usuarioRoutes);

// Habilitar Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Definir un puerto y arrancar el proyecto
const port = 3000;

app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});