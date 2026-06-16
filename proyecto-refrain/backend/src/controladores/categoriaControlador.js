import {
    obtCategoriaTodo,
    obtCategoriasActiva,
    obtCategoria,
    obtFiltros,
    obtCategoriaPorNombre,
    insertaCategoria,
    activaCategoria,
    desactivaCategoria,
    actualizaCategoria,
    eliminaCategoria
} from '../modelos/categoriaModelo.js';

import { body, validationResult } from 'express-validator';

export const validarInsert = [
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('descripcion').optional().isString().withMessage('La descripción no es válida'),
    body('imagen_url').optional().isString().withMessage('La imagen no es válida')
];

export const validarUpdate = [
    body('nombre').optional().trim().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('descripcion').optional().isString().withMessage('La descripción no es válida'),
    body('imagen_url').optional().isString().withMessage('La imagen no es válida')
];

export const obtCategorias = async (req, res) => {
    try {
        const categorias = await obtCategoriaTodo();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtCategoriasActivas = async (req, res) => {
    try {
        const categorias = await obtCategoriasActiva();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtCategoriaPorID = async (req, res) => {
    try {
        const categoria = await obtCategoria(req.params.id);

        if (!categoria)
            return res.status(404).json({ error: 'Categoría no encontrada' });

        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtConFiltros = async (req, res) => {
    try {
        const { nombre, activo } = req.query;
        const categorias = await obtFiltros({ nombre, activo });
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const insertarCategoria = async (req, res) => {
    try {
        if (req.file) {
            req.body.imagen_url = `uploads/categorias/${req.file.filename}`;
        }

        const errores = validationResult(req);
        if (!errores.isEmpty())
            return res.status(400).json({ errores: errores.array() });

        const existente = await obtCategoriaPorNombre(req.body.nombre);
        if (existente)
            return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' });

        const categoriaNueva = await insertaCategoria(req.body);
        res.status(201).json(categoriaNueva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const activarCategoria = async (req, res) => {
    try {
        const categoria = await obtCategoria(req.params.id);
        if (!categoria)
            return res.status(404).json({ error: 'Categoría no encontrada' });

        await activaCategoria(req.params.id);
        res.status(200).json({ mensaje: 'Categoría activada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const desactivarCategoria = async (req, res) => {
    try {
        const categoria = await obtCategoria(req.params.id);
        if (!categoria)
            return res.status(404).json({ error: 'Categoría no encontrada' });

        await desactivaCategoria(req.params.id);
        res.status(200).json({ mensaje: 'Categoría desactivada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const modificarCategoria = async (req, res) => {
    try {
        if (req.file) {
            req.body.imagen_url = `uploads/categorias/${req.file.filename}`;
        }

        if (Object.keys(req.body).length === 0)
            return res.status(400).json({ error: 'Debes enviar al menos un campo para actualizar' });

        const categoria = await obtCategoria(req.params.id);
        if (!categoria)
            return res.status(404).json({ error: 'Categoría no encontrada' });

        const errores = validationResult(req);
        if (!errores.isEmpty())
            return res.status(400).json({ errores: errores.array() });

        const categoriaAct = await actualizaCategoria(req.params.id, req.body);
        if (!categoriaAct)
            return res.status(400).json({ error: 'Los campos enviados no son válidos' });

        res.status(200).json(categoriaAct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarCategoria = async (req, res) => {
    try {
        const categoria = await obtCategoria(req.params.id);
        if (!categoria)
            return res.status(404).json({ error: 'Categoría no encontrada' });

        await eliminaCategoria(req.params.id);
        res.status(200).json({ mensaje: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};