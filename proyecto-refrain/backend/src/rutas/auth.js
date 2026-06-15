import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../config/bd.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE email = ? AND activo = TRUE",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = rows[0];

    const passwordOk = await bcrypt.compare(password, user.pwdu);

    if (!passwordOk) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    return res.json({
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error en login",
      error: error.message,
    });
  }
});

export default router;