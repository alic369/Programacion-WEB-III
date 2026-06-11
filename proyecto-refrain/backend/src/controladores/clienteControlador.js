import {
    obtClienteTodo,
    obtCliente,
    obtClientePorEmail,
    obtFiltros,
    insertaCliente,
    actualizaCliente,
    eliminaCliente
} from '../modelos/clienteModelo.js';

import { check, validationResult } from 'express-validator';

export const obtClientes = async (req, res) => {
    try {

        const clientes = await obtClienteTodo();

        res.status(200).json(clientes);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtClientePorID = async (req, res) => {
    try {

        const cliente = await obtCliente(req.params.id);

        if (!cliente)
            return res.status(404).json({
                error: 'Cliente no encontrado'
            });

        res.status(200).json(cliente);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtConFiltros = async (req, res) => {
    try {

        const {
            nombre,
            email,
            telefono
        } = req.query;

        const clientes = await obtFiltros({
            nombre,
            email,
            telefono
        });

        res.status(200).json(clientes);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const insertarCliente = async (req, res) => {
    try {

        await check('nombre')
            .trim()
            .notEmpty()
            .withMessage('El nombre no puede ir vacío')
            .run(req);

        await check('email')
            .optional()
            .isEmail()
            .withMessage('Email no válido')
            .run(req);

        await check('telefono')
            .optional()
            .isString()
            .run(req);

        const errores = validationResult(req);

        if (!errores.isEmpty())
            return res.status(400).send({
                mensaje: errores.array()
            });

        if (req.body.email) {

            const existente =
                await obtClientePorEmail(req.body.email);

            if (existente)
                return res.status(400).json({
                    error: 'El email ya está registrado'
                });
        }

        const clienteNuevo =
            await insertaCliente(req.body);

        res.status(201).json(clienteNuevo);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const modificarCliente = async (req, res) => {
    try {

        if (Object.keys(req.body).length === 0)
            return res.status(400).json({
                error: 'No se enviaron campos para actualizar'
            });

        const cliente = await obtCliente(req.params.id);

        if (!cliente)
            return res.status(404).json({
                error: 'Cliente no encontrado'
            });

        await check('nombre')
            .optional()
            .trim()
            .notEmpty()
            .withMessage('El nombre no puede ir vacío')
            .run(req);

        await check('email')
            .optional()
            .isEmail()
            .withMessage('Email no válido')
            .run(req);

        await check('telefono')
            .optional()
            .isString()
            .run(req);

        const errores = validationResult(req);

        if (!errores.isEmpty())
            return res.status(400).send({
                mensaje: errores.array()
            });

        if (req.body.email !== undefined) {

            const existente =
                await obtClientePorEmail(req.body.email);

            if (
                existente &&
                existente.id != req.params.id
            ) {
                return res.status(400).json({
                    error: 'El email ya está registrado'
                });
            }
        }

        const clienteAct =
            await actualizaCliente(
                req.params.id,
                req.body
            );

        if (!clienteAct)
            return res.status(400).json({
                error: 'No se enviaron campos válidos'
            });

        res.status(200).json(clienteAct);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarCliente = async (req, res) => {
    try {

        const cliente =
            await obtCliente(req.params.id);

        if (!cliente)
            return res.status(404).json({
                error: 'Cliente no encontrado'
            });

        await eliminaCliente(req.params.id);

        res.status(200).json({
            mensaje: 'Cliente eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};