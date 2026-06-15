import { obtEmpleado, obtEmpleadoTodo, obtEmpleadosActivo, obtTodo, obtUsuarioPorEmail, registraEmpleado, registraDueno, desactivaEmpleado, activaEmpleado, modificaEmpleado, eliminaEmpleado, } from "../modelos/usuarioModelo.js";

import { check, validationResult } from 'express-validator';

import bcrypt from 'bcrypt';

export const obtEmpleados = async (req, res) => {
    try {
        const empleados = await obtEmpleadoTodo();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtEmpleadosActivos = async (req, res) => {
    try {
        const empleados = await obtEmpleadosActivo();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtEmpleadoPorID = async (req, res) => {
    try {
        const empleado = await obtEmpleado(req.params.id);        
        if (!empleado)
            return res.status(404).json({ error: 'Empleado no encontrado' });

        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtUsuarios = async (req, res) => {
    try {
        const usuarios = await obtTodo();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const registrarEmpleado = async (req, res) => {
    try {
        await check('nombre').trim().notEmpty().withMessage('El nombre no puede ir vacío').run(req);
        await check('email').notEmpty().isEmail().withMessage('El email no puede ir vacío').run(req);

        await check('pwdu').notEmpty().withMessage('El password no puede ir vacío').run(req);
        await check('pwdu').isLength({ min: 8 }).withMessage('Debe tener minimo 8 caracteres').run(req);
        await check('pwdu').matches(/[A-Z]/).withMessage('Debe tener al menos una mayuscula').run(req);
        await check('pwdu').matches(/[a-z]/).withMessage('Debe tener al menos una minusculo').run(req);
        await check('pwdu').matches(/[0-9]/).withMessage('Debe tener al menos un numero').run(req);

        const errores = validationResult(req);        
        if (!errores.isEmpty())
            return res.status(400).send({mensaje:errores.array()});
        
        const existente = await obtUsuarioPorEmail(req.body.email);            
        if (existente)
            return res.status(400).json({error: 'El email ya está registrado'});    
        
        const hash = await bcrypt.hash(req.body.pwdu,  10);
        req.body.pwdu = hash;

        const empleadoNuevo = await registraEmpleado(req.body);
        res.status(201).json(empleadoNuevo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const registrarDueno = async (req, res) => {
    try {
        await check('nombre').trim().notEmpty().withMessage('El nombre no puede ir vacío').run(req);
        await check('email').notEmpty().isEmail().withMessage('El email no puede ir vacío').run(req);

        await check('pwdu').notEmpty().withMessage('El password no puede ir vacío').run(req);
        await check('pwdu').isLength({ min: 8 }).withMessage('Debe tener minimo 8 caracteres').run(req);
        await check('pwdu').matches(/[A-Z]/).withMessage('Debe tener al menos una mayuscula').run(req);
        await check('pwdu').matches(/[a-z]/).withMessage('Debe tener al menos una minusculo').run(req);
        await check('pwdu').matches(/[0-9]/).withMessage('Debe tener al menos un numero').run(req);

        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).send({ mensaje: errores.array() });
        }

        const existente = await obtUsuarioPorEmail(req.body.email);
        if (existente) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        const hash = await bcrypt.hash(req.body.pwdu, 10);
        req.body.pwdu = hash;

        const duenoNuevo = await registraDueno(req.body);
        res.status(201).json(duenoNuevo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const activarEmpleado = async (req, res) => {
    try {
        const empleado = await obtEmpleado(req.params.id);
        if (!empleado)
            return res.status(404).json({ error: 'Empleado no encontrado' });
        
        await activaEmpleado(req.params.id);
        res.status(200).json({ mensaje: 'Empleado activado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const desactivarEmpleado = async (req, res) => {
    try {
        const empleado = await obtEmpleado(req.params.id);
        if (!empleado)
            return res.status(404).json({ error: 'Empleado no encontrado' });
        
        await desactivaEmpleado(req.params.id);
        res.status(200).json({ mensaje: 'Empleado desactivado existosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const modificarEmpleado = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0)
            return res.status(400).json({
                error: 'No se enviaron campos para actualizar'});

        const empleado = await obtEmpleado(req.params.id);
        if (!empleado)
            return res.status(404).json({ error: 'Empleado no encontrado' });
        
        await check('nombre').optional().trim().notEmpty().withMessage('El nombre no puede ir vacío').run(req);
        await check('email').optional().notEmpty().isEmail().withMessage('El email no puede ir vacío').run(req);
       
        const errores = validationResult(req);
        if (!errores.isEmpty())
            return res.status(400).send({mensaje:errores.array()});
        
        if (req.body.email !== undefined) {
            const existente = await obtUsuarioPorEmail(req.body.email);            
            if (existente && existente.id != req.params.id)
                return res.status(400).json({error: 'El email ya está registrado'});    
        }

        const empleadoAct = await modificaEmpleado(req.params.id, req.body);
        res.status(200).json(empleadoAct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarEmpleado = async (req, res) => {
    try {
        const empleado = await obtEmpleado(req.params.id);
        if (!empleado)
            return res.status(404).json({ error: 'Empleado no encontrado' });
        
        await eliminaEmpleado(req.params.id);

        res.status(200).json({ mensaje: 'Empleado eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

