import { validationResult } from 'express-validator';
import { Categoria, Precio, Propiedad } from '../models/index.js'

const admin = (req, res) => {
    res.render('propiedades/admin', {
        pagina: 'Mis Propiedades',
        barra: true
    })
}

const crear = async (req, res) => {

        // Consultar modelo de Precio y Categorias
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])

        res.render('propiedades/crear', {
        pagina: 'Crear Propiedad',
        barra: true,
        csrfToken: req.csrfToken(),
        categorias: categorias,
        precios,
        datos: {}
    })
}

const guardar = async (req, res) => {
    // Validación
    let resultado = validationResult(req);

    if(!resultado.isEmpty()){
        // Consultar modelo de Precio y Categoria
        const [ categorias, precios ] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])

        return res.render('propiedades/crear', {
            pagina: 'Crear Propiedad',
            barra: true,
            csrfToken: req.csrfToken(),
            categorias: categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
        })
    }

    // Crear un registro
    // console.log(req.body)
    const { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio, categoria: categoriaId } = req.body
    
    try{
        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            habitaciones, 
            estacionamiento, 
            wc,
            calle,
            lat,
            lng,         
            precioId: precio,
            categoriaId
        })
    }
    catch
    {
        console.error()
    }
}

export {
    admin,
    crear,
    guardar
}