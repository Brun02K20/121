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
    static E_ESPERANDO_VIAJE = "Esperando viaje";
    static E_VIAJANDO_FERRY = "Viajando en ferry";
    static E_ESPERANDO_DESCARGA = "Esperando descarga";
    static E_SIENDO_DESCARGADO = "Siendo descargado";
    static E_FINALIZADO = "Finalizado";

    // Tipos de clientes
    static T_AUTO = "Auto";
    static T_CAMION = "Camion";

    // Localizaciones de origen
    static L_CONTINENTE = "Continente";
    static L_ISLA = "Isla";

    // Eventos posibles
    static E_LLEGADA_AUTO_CONT = "Llegada auto continente";
    static E_LLEGADA_CAMION_CONT = "Llegada camion continente";
    static E_LLEGADA_AUTO_ISLA = "Llegada auto isla";
    static E_LLEGADA_CAMION_ISLA = "Llegada camion isla";
    static E_FIN_CARGA_AUTO = "Fin carga auto";
    static E_FIN_CARGA_CAMION = "Fin carga camion";
    static E_FIN_DESCARGA_AUTO = "Fin descarga auto";
    static E_FIN_DESCARGA_CAMION = "Fin descarga camion";
    static E_FIN_MANTENIMIENTO = "Fin mantenimiento";
    static E_FIN_RECORRIDO_FERRY_1 = "Fin recorrido ferry 1";
    static E_FIN_RECORRIDO_FERRY_2 = "Fin recorrido ferry 2";
    static E_FUNCIONAMIENTO_FERRYS = "Funcionamiento ferrys";
}