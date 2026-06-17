import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../config/bd.js";
import { registraLog } from "../modelos/logModelo.js";

const router = express.Router();

const obtenerIP = (req) => {
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

    return ip;
};

const verificarCaptcha = async (captchaToken, ip) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    if (!secret) {
        return {
            ok: false,
            mensaje: "CAPTCHA no configurado"
        };
    }

    if (!captchaToken) {
        return {
            ok: false,
            mensaje: "Debes completar el CAPTCHA"
        };
    }

    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", captchaToken);

    if (ip) {
        params.append("remoteip", ip);
    }

    const respuesta = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params
        }
    );

    const data = await respuesta.json();

    return {
        ok: Boolean(data.success),
        data
    };
};

router.post("/login", async (req, res) => {
  try {
    const { email, password, captchaToken } = req.body;

    const ip = obtenerIP(req);

    const captcha = await verificarCaptcha(captchaToken, ip);
    if (!captcha.ok) {
            return res.status(400).json({
                message: captcha.mensaje || "CAPTCHA inválido"
            });
        }

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

        const ip = obtenerIP(req);

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