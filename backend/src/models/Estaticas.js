export class Estaticas {
    // Estados posibles de los Ferrys
    static E_LIBRE = "Libre";
    static E_CARGANDO = "Cargando";
    static E_DESCARGANDO = "Descargando";
    static E_MANTENIMIENTO = "Mantenimiento";
    static E_VIAJANDO = "Viajando";

    // Estados posibles de los clientes (autos y camiones)
    static E_CREADO = "Creado";
    static E_ESPERANDO_CARGA = "Esperando carga";
    static E_SIENDO_CARGADO = "Siendo cargado";
    static E_VIAJANDO_FERRY = "Viajando en ferry";
    static E_ESPERANDO_DESCARGA = "Esperando descarga";
    static E_SIENDO_DESCARGADO = "Siendo descargado";
    static E_FINALIZADO = "Finalizado";

    // Tipos de clientes
    static T_AUTO = "Auto";
    static T_CAMION = "Camion";
}