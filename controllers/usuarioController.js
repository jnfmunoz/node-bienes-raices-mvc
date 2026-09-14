import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'
import { generarId } from '../helpers/tokens.js'
import { emailRegistro } from '../helpers/emails.js'

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

    // Validación
    await check('nombre').notEmpty().withMessage('El nombre no puede estar vacío').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres').run(req)
    // await check('repetir_password').custom('password').withMessage('Las password no son iguales').run(req)
    await check('repetir_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no son iguales')
        }
        return true
    })
    .run(req)

    let resultado = validationResult(req)

    // return re.json(resultado.array())

    // verificar que el resultado esté vacío
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

    // extraer los datos
    const { nombre, email, password } = req.body

    // verificar que el usuario no esté duplicado
    const existeUsuario = await Usuario.findOne({ where : { email } })
    
    if (existeUsuario){
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: [{msg: 'El usuario ya está registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    // console.log(existeUsuario)
    // return; // es para probar el método eisteUsuario

    //Almacenar un usuario 
    const usuario = await Usuario.create({    
        nombre,
        email,
        password,
        token: generarId()
    })

    // Envía email de confirmación
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token,
    })

    

    // Mostrar mensaje de confirmación
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos enviado Un email de confirmación, presiona en el enlace'
    })

    // const usuario = await Usuario.create(req.body)
    // res.json(usuario)
}

// Función que comprueba una cuenta
const confirmar = async (req, res, next) => {

    // console.log('Comprobando...')

    const { token } = req.params;
    // console.log(token);

    // Verificar si el token es válido
    const usuario = await Usuario.findOne({where: {token}});
    // console.log(usuario);

    if(!usuario){
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta nuevamente',
            error: true
        })
    }

    // Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    // console.log(usuario)

    res.render('auth/confirmar-cuenta', {
            pagina: 'Cuenta confirmada',
            mensaje: 'Cuenta confirmada correctamente',
    })

    

    next();

}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a Bienes Raíces'
    });
}

const resetPassword = (req, res) => {

}

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword,
    resetPassword,
}
