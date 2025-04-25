import { StorageManager, STORAGE_KEYS } from '../data/storage.js';

// Agregar validación y sanitización de datos
export function validarPlaca(placa) {
    const regexPlaca = /^[A-Z]{3}\d{3}$/;
    return regexPlaca.test(placa.toUpperCase());
}

export function guardarDatosCliente(datos) {
    let clientes = StorageManager.obtener(STORAGE_KEYS.CLIENTES);
    clientes.push({
        ...datos,
        id: Date.now(),
        fechaRegistro: new Date().toISOString()
    });
    return StorageManager.guardar(STORAGE_KEYS.CLIENTES, clientes);
}

export function buscarHistorialCliente(placa) {
    const clientes = StorageManager.obtener(STORAGE_KEYS.CLIENTES);
    return clientes.filter(cliente => cliente.placa === placa);
}

export function verificarDisponibilidad(fecha, hora, tipoLavado) {
    const reservasExistentes = StorageManager.obtener(STORAGE_KEYS.RESERVAS);
    return !reservasExistentes.some(reserva => 
        reserva.fecha === fecha && 
        reserva.hora === hora && 
        reserva.tipoLavado === tipoLavado
    );
}

export function crearReserva(fecha, hora, tipoLavado) {
    const reserva = {
        id: Date.now(),
        fecha,
        hora,
        tipoLavado,
        estado: 'pendiente',
        fechaCreacion: new Date().toISOString()
    };

    const reservas = StorageManager.obtener(STORAGE_KEYS.RESERVAS);
    reservas.push(reserva);
    StorageManager.guardar(STORAGE_KEYS.RESERVAS, reservas);
    return reserva;
}