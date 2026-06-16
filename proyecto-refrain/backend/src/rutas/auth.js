import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../config/bd.js";
import { registraLog } from "../modelos/logModelo.js";

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

    const ipRaw =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      req.ip || 
      "";

    let ip = ipRaw.split(",")[0].trim();
    if (ip === "::1" || ip === "::ffff:127.0.0.1") {
        ip = "127.0.0.1";
    } else {
        ip = ip.replace("::ffff:", "");
    }

    await registraLog(
      user.id,
      ip,
      req.headers["user-agent"] || "",
      "ingreso"
    );

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

router.post("/logout", async (req, res) => {

    try {

        const { usuario_id } = req.body;

        if (!usuario_id) {
            return res.status(400).json({
                message: "Usuario no válido"
            });
        }

        const ipRaw =
          req.headers["x-forwarded-for"] ||
          req.socket.remoteAddress ||
          req.ip || 
          "";

        let ip = ipRaw.split(",")[0].trim();
        if (ip === "::1" || ip === "::ffff:127.0.0.1") {
            ip = "127.0.0.1";
        } else {
            ip = ip.replace("::ffff:", "");
        }

        await registraLog(
            usuario_id,
            ip,
            req.headers["user-agent"] || "",
            "salida"
        );

        return res.status(200).json({
            message: "Sesión cerrada correctamente"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al cerrar sesión",
            error: error.message
        });

    }

});

export default router;