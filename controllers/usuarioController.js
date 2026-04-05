import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'       
        // autenticado: false
    });
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
    });
}

const registrar = async (req, res) => {
    // console.log(req.body) // leer información del formulario

    await check('nombre').notEmpty().withMessage('El nombre no puede estar vacío').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres').run(req)
    await check('repetir_password').equals('password').withMessage('Las password no son iguales').run(req)

    let resultado = validationResult(req)

    // Verificar que el resultado esté vacío
    if(!resultado.isEmpty()) {
        // Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    // Verificar que el usuario no esté duplicado
    const existeUsuario = await Usuario.findOne({ where : { email : req.body.email } })
    console.log(existeUsuario)
    return;

    // const usuario = await Usuario.create(req.body)
    // res.json(usuario)
}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a Bienes Raíces'
    });
}

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword,
}
