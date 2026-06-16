import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    LoaderCircle,
    LockKeyhole,
    LogIn,
    Mail,
    ShieldCheck
} from "lucide-react";
import api from "../services/api";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let user = null;

        try {
            user = JSON.parse(localStorage.getItem("user"));
        } catch {
            user = null;
        }

        if (!user?.rol) return;

        navigate(user.rol === "dueno" ? "/dueno" : "/inicio-empleado", {
            replace: true,
        });
    }, [navigate]);

    const validate = () => {
        if (!email.trim()) {
            setError("El correo es obligatorio.");
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setError("Ingresa un correo válido.");
            return false;
        }

        if (!password.trim()) {
            setError("La contraseña es obligatoria.");
            return false;
        }

        return true;
    };

    const login = async (e) => {
        e.preventDefault();
        setError("");

        if (!validate()) return;

        try {
            setLoading(true);

            const { data: res } = await api.post("/auth/login", {
                email: email.trim(),
                password,
            });

            const usuario = res?.user ?? res?.usuario ?? res;

            if (!usuario?.rol) {
                setError("La respuesta del servidor no contiene el rol del usuario.");
                return;
            }

            localStorage.setItem("user", JSON.stringify(usuario));

            if (res?.token) {
                localStorage.setItem("token", res.token);
            }

            navigate(usuario.rol === "dueno" ? "/estadisticas" : "/empleado", {
                replace: true,
            });
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Credenciales incorrectas."
            );
        } finally {
            setLoading(false);
        }
    };

    const inputBase = {
        width: "100%",
        boxSizing: "border-box",
        border: "1.5px solid #CBD5E1",
        borderRadius: "10px",
        background: "#F8FAFC",
        padding: "10px 12px 10px 38px",
        fontSize: "13px",
        color: "#0F172A",
        outline: "none",
        fontFamily: "inherit",
    };

    return (
        <div
            style={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                fontFamily: "Inter, 'Segoe UI', sans-serif",
            }}
        >
            <div
                style={{
                    width: "58%",
                    flexShrink: 0,
                    height: "100%",
                    background:
                        "linear-gradient(150deg, #111827 0%, #1E1B4B 45%, #312E81 100%)",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "48px 52px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "-60px",
                            left: "-60px",
                            width: "300px",
                            height: "300px",
                            borderRadius: "50%",
                            background: "rgba(99,102,241,0.15)",
                            filter: "blur(70px)",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            bottom: "-80px",
                            right: "-40px",
                            width: "340px",
                            height: "340px",
                            borderRadius: "50%",
                            background: "rgba(139,92,246,0.12)",
                            filter: "blur(70px)",
                        }}
                    />
                </div>

                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                    }}
                >
                    <div
                        style={{
                            width: "44px",
                            height: "44px",
                            flexShrink: 0,
                            borderRadius: "12px",
                            border: "1px solid rgba(255,255,255,0.2)",
                            background: "rgba(255,255,255,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "17px",
                            fontWeight: 900,
                        }}
                    >
                        R
                    </div>
                    <div>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "14px",
                                fontWeight: 800,
                                letterSpacing: "0.12em",
                            }}
                        >
                            REFRÁIN
                        </p>
                        <p
                            style={{
                                margin: 0,
                                marginTop: "2px",
                                fontSize: "11px",
                                color: "rgba(255,255,255,0.45)",
                            }}
                        >
                            Sistema de Gestión Comercial
                        </p>
                    </div>
                </div>

                <div style={{ position: "relative", zIndex: 1 }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "7px",
                            border: "1px solid rgba(255,255,255,0.15)",
                            background: "rgba(255,255,255,0.07)",
                            padding: "6px 14px",
                            borderRadius: "999px",
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.7)",
                            marginBottom: "22px",
                        }}
                    >
                        <ShieldCheck size={13} />
                        Acceso seguro para administradores y empleados
                    </div>

                    <h2
                        style={{
                            margin: 0,
                            fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                            fontWeight: 900,
                            lineHeight: 1.2,
                            letterSpacing: "-0.02em",
                            color: "#F1F5F9",
                        }}
                    >
                        Control total de ventas, clientes y productos desde un solo lugar.
                    </h2>

                    <p
                        style={{
                            margin: "18px 0 0",
                            fontSize: "14px",
                            lineHeight: 1.75,
                            color: "rgba(255,255,255,0.5)",
                        }}
                    >
                        Un panel claro, directo y sin distracciones para operar el sistema con rapidez.
                    </p>

                    <div
                        style={{
                            marginTop: "36px",
                            borderTop: "1px solid rgba(255,255,255,0.1)",
                            paddingTop: "32px",
                            display: "grid",
                            gridTemplateColumns: "repeat(3,1fr)",
                            gap: "12px",
                        }}
                    >
                        {[
                            { n: "01", label: "Ingreso controlado por rol" },
                            { n: "02", label: "Gestión centralizada" },
                            { n: "03", label: "Flujo simple y rápido" },
                        ].map(({ n, label }) => (
                            <div
                                key={n}
                                style={{
                                    borderRadius: "12px",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    background: "rgba(255,255,255,0.05)",
                                    padding: "16px 14px",
                                }}
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: "14px",
                                        fontWeight: 900,
                                        color: "rgba(255,255,255,0.75)",
                                    }}
                                >
                                    {n}
                                </p>
                                <p
                                    style={{
                                        margin: "8px 0 0",
                                        fontSize: "11px",
                                        lineHeight: 1.5,
                                        color: "rgba(255,255,255,0.4)",
                                    }}
                                >
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        paddingTop: "18px",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.28)",
                    }}
                >
                    Proyecto Programación Web III
                </div>
            </div>

            <div
                style={{
                    flex: 1,
                    height: "100%",
                    background: "#EEF2F7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 32px",
                }}
            >
                <div style={{ width: "100%", maxWidth: "360px" }}>
                    <div
                        style={{
                            background: "white",
                            borderRadius: "20px",
                            border: "1px solid #E2E8F0",
                            padding: "40px 36px",
                            boxShadow: "0 4px 24px rgba(15,23,42,0.08)",
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: "10px",
                                fontWeight: 700,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "#6366F1",
                            }}
                        >
                            Acceso al sistema
                        </p>
                        <h2
                            style={{
                                margin: "10px 0 6px",
                                fontSize: "22px",
                                fontWeight: 900,
                                letterSpacing: "-0.02em",
                                color: "#0F172A",
                            }}
                        >
                            Iniciar sesión
                        </h2>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "13px",
                                color: "#94A3B8",
                                lineHeight: 1.6,
                            }}
                        >
                            Ingresa con tus credenciales para continuar.
                        </p>

                        <div
                            style={{
                                margin: "24px 0",
                                borderTop: "1px solid #F1F5F9",
                            }}
                        />

                        <form
                            onSubmit={login}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "18px",
                            }}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    style={{
                                        display: "block",
                                        marginBottom: "7px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        color: "#334155",
                                    }}
                                >
                                    Correo electrónico
                                </label>
                                <div style={{ position: "relative" }}>
                                    <Mail
                                        size={14}
                                        style={{
                                            position: "absolute",
                                            left: "12px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            color: "#94A3B8",
                                            pointerEvents: "none",
                                        }}
                                    />
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="correo@ejemplo.com"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (error) setError("");
                                        }}
                                        autoComplete="email"
                                        style={inputBase}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = "#6366F1";
                                            e.target.style.background = "#fff";
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = "#CBD5E1";
                                            e.target.style.background = "#F8FAFC";
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    style={{
                                        display: "block",
                                        marginBottom: "7px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        color: "#334155",
                                    }}
                                >
                                    Contraseña
                                </label>
                                <div style={{ position: "relative" }}>
                                    <LockKeyhole
                                        size={14}
                                        style={{
                                            position: "absolute",
                                            left: "12px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            color: "#94A3B8",
                                            pointerEvents: "none",
                                        }}
                                    />
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (error) setError("");
                                        }}
                                        autoComplete="current-password"
                                        style={{ ...inputBase, paddingRight: "40px" }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = "#6366F1";
                                            e.target.style.background = "#fff";
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = "#CBD5E1";
                                            e.target.style.background = "#F8FAFC";
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        aria-label={
                                            showPassword
                                                ? "Ocultar contraseña"
                                                : "Mostrar contraseña"
                                        }
                                        style={{
                                            position: "absolute",
                                            right: "10px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            background: "none",
                                            border: "none",
                                            padding: "4px",
                                            cursor: "pointer",
                                            color: "#94A3B8",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                </div>
                            </div>

                            {error ? (
                                <div
                                    style={{
                                        borderRadius: "10px",
                                        border: "1px solid #FCA5A5",
                                        background: "#FEF2F2",
                                        padding: "10px 14px",
                                        fontSize: "12px",
                                        color: "#DC2626",
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {error}
                                </div>
                            ) : null}

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    width: "100%",
                                    borderRadius: "10px",
                                    background: loading ? "#818CF8" : "#4F46E5",
                                    color: "white",
                                    border: "none",
                                    padding: "11px 16px",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    cursor: loading ? "not-allowed" : "pointer",
                                    transition: "background 0.15s, transform 0.1s",
                                    fontFamily: "inherit",
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading) e.currentTarget.style.background = "#4338CA";
                                }}
                                onMouseLeave={(e) => {
                                    if (!loading) e.currentTarget.style.background = "#4F46E5";
                                }}
                                onMouseDown={(e) => {
                                    if (!loading) e.currentTarget.style.transform = "scale(0.99)";
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                }}
                            >
                                {loading ? (
                                    <>
                                        <LoaderCircle size={14} className="animate-spin" />
                                        Ingresando...
                                    </>
                                ) : (
                                    <>
                                        <LogIn size={14} />
                                        Ingresar
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "12px",
                            color: "#94A3B8",
                            marginTop: "20px",
                        }}
                    >
                        Acceso restringido según rol del usuario.
                    </p>
                </div>
            </div>
        </div>
    );
}