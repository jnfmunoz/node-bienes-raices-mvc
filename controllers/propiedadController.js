import Categoria from "../models/Categoria.js";
import Precio from "../models/Precio.js";

const admin = (req, res) => {
    res.render('propiedades/admin', {
        pagina: 'Mis Propiedades',
        barra: true
    })
}

const crear = (req, res) => {

        // Consultar modelo de Precio y Categorias
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])

        res.render('propiedades/crear', {
        pagina: 'Crear Propiedad',
        barra: true,
        categorias: categorias,
        precios
    })
}

export {
    admin,
    crear
}