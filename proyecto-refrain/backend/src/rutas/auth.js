import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({
      user: {
        id: 1,
        nombre: "Administrador",
        rol: "dueno",
      },
    });
  }

  return res.status(401).json({ message: "Credenciales inválidas" });
});

export default router;