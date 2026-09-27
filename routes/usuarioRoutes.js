import express from "express";
import { formularioLogin, formularioRegistro, registrar, confirmar, formularioOlvidePassword,  resetPassword, comprobarToken, nuevoPassword} from "../controllers/usuarioController.js";

const router = express.Router();

// Routing
router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

router.get('/confirmar/:token', confirmar);

router.get('/olvide-password', formularioOlvidePassword);
router.post('/olvide-password', resetPassword);

// Almacena el nuevo password
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);


// router.get('/', function(req, res){
//     res.json({msg: 'Hola mundo en express'});
// });

// router.post('/', function(req, res){
//     res.send({msg: 'Respuesta tipo Post'});
// });

// para encapsular varias rutas, recomendable usar con controllers
// router.route('/')
//     .get(function(req, res){
//         res.json({msg: 'Hola mundo en express'});
//     })
//     .post(function(req, res){
//         res.send({msg: 'Respuesta tipo Post'});
//     })

export default router;