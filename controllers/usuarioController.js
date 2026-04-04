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
    const usuario = await Usuario.create(req.body)

    res.json(usuario)
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
