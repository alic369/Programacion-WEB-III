import {
    obtCategoriaTodo,
    obtCategoriasActiva,
    obtCategoria,
    obtFiltros,
    insertaCategoria,
    activaCategoria,
    desactivaCategoria,
    actualizaCategoria,
    eliminaCategoria
} from '../modelos/categoriaModelo.js';

import { check, validationResult } from 'express-validator';

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
            return res.status(404).json({
                error: 'Categoria no encontrada'
            });

        res.status(200).json(categoria);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtConFiltros = async (req, res) => {
    try {
        const { nombre, activo } = req.query;

        const categorias = await obtFiltros({
            nombre,
            activo
        });

        res.status(200).json(categorias);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const insertarCategoria = async (req, res) => {
    try {

        await check('nombre')
            .trim()
            .notEmpty()
            .withMessage('El nombre no puede ir vacío')
            .run(req);

        await check('descripcion')
            .optional()
            .isString()
            .run(req);

        await check('imagen_url')
            .optional()
            .isString()
            .run(req);

        const errores = validationResult(req);

        if (!errores.isEmpty())
            return res.status(400).send({
                mensaje: errores.array()
            });

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
            return res.status(404).json({
                error: 'Categoria no encontrada'
            });

        await activaCategoria(req.params.id);

        res.status(200).json({
            mensaje: 'Categoria activada exitosamente'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const desactivarCategoria = async (req, res) => {
    try {

        const categoria = await obtCategoria(req.params.id);

        if (!categoria)
            return res.status(404).json({
                error: 'Categoria no encontrada'
            });

        await desactivaCategoria(req.params.id);

        res.status(200).json({
            mensaje: 'Categoria desactivada exitosamente'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const modificarCategoria = async (req, res) => {
    try {

        if (Object.keys(req.body).length === 0)
            return res.status(400).json({
                error: 'No se enviaron campos para actualizar'
            });

        const categoria = await obtCategoria(req.params.id);

        if (!categoria)
            return res.status(404).json({
                error: 'Categoria no encontrada'
            });

        await check('nombre')
            .optional()
            .trim()
            .notEmpty()
            .withMessage('El nombre no puede ir vacío')
            .run(req);

        await check('descripcion')
            .optional()
            .isString()
            .run(req);

        await check('imagen_url')
            .optional()
            .isString()
            .run(req);

        const errores = validationResult(req);

        if (!errores.isEmpty())
            return res.status(400).send({
                mensaje: errores.array()
            });

        const categoriaAct = await actualizaCategoria(
            req.params.id,
            req.body
        );

        if (!categoriaAct)
            return res.status(400).json({
                error: 'No se enviaron campos válidos'
            });

        res.status(200).json(categoriaAct);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarCategoria = async (req, res) => {
    try {

        const categoria = await obtCategoria(req.params.id);

        if (!categoria)
            return res.status(404).json({
                error: 'Categoria no encontrada'
            });

        await eliminaCategoria(req.params.id);

        res.status(200).json({
            mensaje: 'Categoria eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};