export const extraerErrores = (error) => {
    const data = error?.response?.data;
    if (data?.errores) return data.errores.map(e => e.msg);
    if (data?.error) return [data.error];

    const status = error?.response?.status;
    if (status === 404) return ["No se encontró el recurso"];
    if (status === 400) return ["Datos inválidos, revisa los campos"];
    if (status === 401) return ["No tienes permiso para esto"];
    if (status === 500) return ["Error en el servidor, intenta de nuevo"];
    if (!error?.response) return ["Sin conexión con el servidor"];

    return ["Error inesperado"];
};