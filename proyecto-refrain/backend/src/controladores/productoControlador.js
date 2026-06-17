import {
    obtProductoTodo,
    obtDisponibles,
    obtProducto,
    obtFiltros,
    insertaProducto,
    desactivaProducto,
    activaProducto,
    actualizaProducto,
    eliminaProducto } from '../modelos/productoModelo.js';
import { obtCategoria } from "../modelos/categoriaModelo.js";
import { check, validationResult } from 'express-validator';

export const obtProductos = async (req, res) => {
    try {
        const productos = await obtProductoTodo();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtProductosDisponibles = async (req, res) => {
    try {
        const productos = await obtDisponibles();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtProductoPorID = async (req, res) => {
    try {
        const producto = await obtProducto(req.params.id);        
        if (!producto)
            return res.status(404).json({ error: 'Producto no encontrado' });

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtConFiltros = async (req, res) => {
    try {
        const { nombre, categoria_id, activo } = req.query;
        const productos = await obtFiltros({ nombre, categoria_id, activo });
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const insertarProducto = async (req, res) => {
    try {
        // Manejar errores
        await check('nombre').trim().notEmpty().withMessage('El nombre no puede ir vacío').run(req);
        await check('precio').isNumeric().withMessage('Valor no válido').custom(resultado => resultado > 0).withMessage('Precio no válido').run(req);
        await check('stock').isNumeric().withMessage('Valor no válido').custom(resultado => resultado >= 0).withMessage('Stock no válido').run(req);
        await check('categoria_id').isNumeric().withMessage('Valor no válido').custom(resultado => resultado > 0).withMessage('Categoria no válida').run(req);
        await check('imagen_url').optional().isString().run(req);

        const errores = validationResult(req);        
        if (!errores.isEmpty())
            return res.status(400).send({mensaje:errores.array()});

        const categoria = await obtCategoria(req.body.categoria_id);
        if (!categoria)
            return res.status(404).json({ error: 'Categoria no encontrada' });
        if (!categoria.activo)
            return res.status(404).json({ error: 'Categoria desactivada' });

        const productoNuevo = await insertaProducto(req.body);
        res.status(201).json(productoNuevo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const activarProducto = async (req, res) => {
    try {
        const producto = await obtProducto(req.params.id);
        if (!producto)
            return res.status(404).json({ error: 'Producto no encontrado' });
        
        await activaProducto(req.params.id);
        res.status(200).json({ mensaje: 'Producto activado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const desactivarProducto = async (req, res) => {
    try {
        const producto = await obtProducto(req.params.id);
        if (!producto)
            return res.status(404).json({ error: 'Producto no encontrado' });
        
        await desactivaProducto(req.params.id);
        res.status(200).json({ mensaje: 'Producto eliminado existosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarProducto = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0)
            return res.status(400).json({
                error: 'No se enviaron campos para actualizar'});

        const producto = await obtProducto(req.params.id);
        if (!producto)
            return res.status(404).json({ error: 'Producto no encontrado' });

        // Manejar errores
        await check('nombre').optional().trim().notEmpty().withMessage('El nombre no puede ir vacío').run(req);
        await check('precio').optional().isNumeric().withMessage('Valor no válido').custom(resultado => resultado > 0).withMessage('Precio no válido').run(req);
        await check('stock').optional().isNumeric().withMessage('Valor no válido').custom(resultado => resultado >= 0).withMessage('Stock no válido').run(req);
        await check('categoria_id').optional().isNumeric().withMessage('Valor no válido').custom(resultado => resultado > 0).withMessage('Categoria no válida').run(req);
        await check('imagen_url').optional().isString().run(req);
        
        const errores = validationResult(req);
        if (!errores.isEmpty())
            return res.status(400).send({mensaje:errores.array()});

        if (req.body.categoria_id !== undefined) {
            const categoria = await obtCategoria(req.body.categoria_id);

            if (!categoria)
                return res.status(404).json({ error: 'Categoria nueva no encontrada' });

            if (!categoria.activo)
                return res.status(400).json({ error: 'Categoria desactivada' });
        }
        
        const productoAct = await actualizaProducto(req.params.id, req.body);
        res.status(200).json(productoAct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        const producto = await obtProducto(req.params.id);
        if (!producto)
            return res.status(404).json({ error: 'Producto no encontrado' });
        
        await eliminaProducto(req.params.id);
        res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

