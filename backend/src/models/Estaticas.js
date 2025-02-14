export class Estaticas {
    // Estados posibles de los Ferrys
    static E_LIBRE = "Libre";
    static E_CARGANDO = "Cargando";
    static E_DESCARGANDO = "Descargando";
    static E_MANTENIMIENTO = "Mantenimiento";
    static E_VIAJANDO = "Viajando";
    static E_FIN_ACTIVIDAD_DIA = "Fin actividad dia";

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

    // Localizaciones posibles de autos y de ferrys
    static L_CONTINENTE = "Continente";
    static L_ISLA = "Isla";
    static L_OCEANO = "Oceano";

    // Eventos posibles
    static E_LLEGADA_AUTO_CONT = "Llegada auto continente";
    static E_LLEGADA_CAMION_CONT = "Llegada camion continente";

    static E_FIN_CARGA_AUTO_F1 = "Fin carga auto F1";
    static E_FIN_CARGA_CAMION_F1 = "Fin carga camion F1";
    static E_FIN_CARGA_AUTO_F2 = "Fin carga auto F2";
    static E_FIN_CARGA_CAMION_F2 = "Fin carga camion F2";

    static E_INICIO_MANTENIMIENTO = "Inicio mantenimiento";
    static E_FIN_MANTENIMIENTO = "Fin mantenimiento";
    static E_FIN_RECORRIDO_FERRY_1 = "Fin recorrido ferry 1";
    static E_FIN_RECORRIDO_FERRY_2 = "Fin recorrido ferry 2";

    static E_LLEGADA_AUTO_ISLA = "Llegada auto isla";
    static E_LLEGADA_CAMION_ISLA = "Llegada camion isla";
    static E_FUNCIONAMIENTO_FERRYS = "Funcionamiento ferrys";
    static E_HABILITACION_LLEGADAS_ISLA = "Habilitacion llegadas isla";


    static E_FIN_DESCARGA_AUTO_F1 = "Fin descarga auto F1";
    static E_FIN_DESCARGA_CAMION_F1 = "Fin descarga camion F1";
    static E_FIN_DESCARGA_AUTO_F2 = "Fin descarga auto F2";
    static E_FIN_DESCARGA_CAMION_F2 = "Fin descarga camion F2";

    static E_SALIDA_ESTIMADA_F2 = "Salida estimada F2";
    static E_CORTE_LLEGADAS_ISLA = "Corte llegadas isla";
    static E_CORTE_LLEGADAS_CONT = "Corte llegadas continente";
    static E_CHEQUEO_FIN_DIA = "Chequeo fin dia";
}