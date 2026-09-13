import express from "express";
import { formularioLogin, formularioRegistro, registrar, confirmar, formularioOlvidePassword,  resetPassword} from "../controllers/usuarioController.js";

const router = express.Router();

// Routing
router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

router.get('/confirmar/:token', confirmar);

router.get('/olvide-password', formularioOlvidePassword);
router.post('/olvide-password', resetPassword); // clase 53

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