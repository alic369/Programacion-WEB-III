import multer from "multer";
import fs from "fs";
import path from "path";

export default function crearUpload(carpeta) {

    const destino = path.join(process.cwd(), "uploads", carpeta);

    if (!fs.existsSync(destino)) {
        fs.mkdirSync(destino, { recursive: true });
    }

    const storage = multer.diskStorage({

        destination(req, file, cb) {
            cb(null, destino);
        },

        filename(req, file, cb) {

            const extension = path.extname(file.originalname);

            const nombre =
                Date.now() +
                "-" +
                Math.round(Math.random() * 1000000) +
                extension;

            cb(null, nombre);
        }

    });

    return multer({

        storage,

        limits: {
            fileSize: 2 * 1024 * 1024
        },

        fileFilter(req, file, cb) {

            const permitidos = [
                "image/png",
                "image/jpeg",
                "image/jpg",
                "image/webp"
            ];

            if (!permitidos.includes(file.mimetype)) {
                return cb(new Error("Formato de imagen no permitido."));
            }

            cb(null, true);

        }

    });

}