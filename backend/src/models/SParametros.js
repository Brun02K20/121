export class SParametros {
    // Variable estática para almacenar la instancia única
    static instance = null;

    // Constructor privado (simulado con una verificación para el Singleton)
    constructor() {
        if (SParametros.instance) {
            throw new Error("Use SParametros.getInstance() para obtener la instancia única.");
        }

        // Inicialización con los valores predeterminados
        this.media_recorrido = 60;
        this.desviacion_recorrido = 5;
        this.media_carga_auto = 2;
        this.desviacion_carga_auto = 1;
        this.media_carga_camion = 4;
        this.desviacion_carga_camion = 1;
        this.media_descarga_auto = 1;
        this.desviacion_descarga_auto = 0.5;
        this.media_descarga_camion = 2;
        this.desviacion_descarga_camion = 0.5;
        this.media_llegada_auto_cont_manana = 15; // de 0 a 300
        this.desviacion_llegada_auto_cont_manana = 5;
        this.media_llegada_auto_cont_tarde = 30; // de 300 a 750
        this.desviacion_llegada_auto_cont_tarde = 5;
        this.media_llegada_camion_cont_manana = 20; // de 0 a 240
        this.desviacion_llegada_camion_cont_manana = 3;
        this.media_llegada_camion_cont_tarde = 120; // de 240 a 750
        this.desviacion_llegada_camion_cont_tarde = 10;
        this.media_llegada_auto_isla = 12;
        this.desviacion_llegada_auto_isla = 5;
        this.media_llegada_camion_isla = 60;
        this.desviacion_llegada_camion_isla = 30;
        this.tiempo_mantenimiento = 300;
        this.funcionamiento_ferrys_apertura = 60;


        // Guardar la instancia única
        SParametros.instance = this;
    }

    // Método estático para obtener la instancia única
    static getInstance() {
        if (!SParametros.instance) {
            new SParametros(); // Crea la instancia única si no existe
        }
        return SParametros.instance;
    }

    // Getters y setters
    getMediaRecorrido() {
        return this.media_recorrido;
    }

    setMediaRecorrido(media_recorrido) {
        this.media_recorrido = media_recorrido;
    }

    getDesviacionRecorrido() {
        return this.desviacion_recorrido;
    }

    setDesviacionRecorrido(desviacion_recorrido) {
        this.desviacion_recorrido = desviacion_recorrido;
    }

    getMediaCargaAuto() {
        return this.media_carga_auto;
    }

    setMediaCargaAuto(media_carga_auto) {
        this.media_carga_auto = media_carga_auto;
    }

    getDesviacionCargaAuto() {
        return this.desviacion_carga_auto;
    }

    setDesviacionCargaAuto(desviacion_carga_auto) {
        this.desviacion_carga_auto = desviacion_carga_auto;
    }

    getMediaCargaCamion() {
        return this.media_carga_camion;
    }

    setMediaCargaCamion(media_carga_camion) {
        this.media_carga_camion = media_carga_camion;
    }

    getDesviacionCargaCamion() {
        return this.desviacion_carga_camion;
    }

    setDesviacionCargaCamion(desviacion_carga_camion) {
        this.desviacion_carga_camion = desviacion_carga_camion;
    }

    getMediaDescargaAuto() {
        return this.media_descarga_auto;
    }

    setMediaDescargaAuto(media_descarga_auto) {
        this.media_descarga_auto = media_descarga_auto;
    }

    getDesviacionDescargaAuto() {
        return this.desviacion_descarga_auto;
    }

    setDesviacionDescargaAuto(desviacion_descarga_auto) {
        this.desviacion_descarga_auto = desviacion_descarga_auto;
    }

    getMediaDescargaCamion() {
        return this.media_descarga_camion;
    }

    setMediaDescargaCamion(media_descarga_camion) {
        this.media_descarga_camion = media_descarga_camion;
    }

    getDesviacionDescargaCamion() {
        return this.desviacion_descarga_camion;
    }

    setDesviacionDescargaCamion(desviacion_descarga_camion) {
        this.desviacion_descarga_camion = desviacion_descarga_camion;
    }

    getMediaLlegadaAutoContManana() {
        return this.media_llegada_auto_cont_manana;
    }

    setMediaLlegadaAutoContManana(media_llegada_auto_cont_manana) {
        this.media_llegada_auto_cont_manana = media_llegada_auto_cont_manana;
    }

    getDesviacionLlegadaAutoContManana() {
        return this.desviacion_llegada_auto_cont_manana;
    }

    setDesviacionLlegadaAutoContManana(desviacion_llegada_auto_cont_manana) {
        this.desviacion_llegada_auto_cont_manana = desviacion_llegada_auto_cont_manana;
    }

    getMediaLlegadaAutoContTarde() {
        return this.media_llegada_auto_cont_tarde;
    }

    setMediaLlegadaAutoContTarde(media_llegada_auto_cont_tarde) {
        this.media_llegada_auto_cont_tarde = media_llegada_auto_cont_tarde;
    }

    getDesviacionLlegadaAutoContTarde() {
        return this.desviacion_llegada_auto_cont_tarde;
    }

    setDesviacionLlegadaAutoContTarde(desviacion_llegada_auto_cont_tarde) {
        this.desviacion_llegada_auto_cont_tarde = desviacion_llegada_auto_cont_tarde;
    }

    getMediaLlegadaCamionContManana() {
        return this.media_llegada_camion_cont_manana;
    }

    setMediaLlegadaCamionContManana(media_llegada_camion_cont_manana) {
        this.media_llegada_camion_cont_manana = media_llegada_camion_cont_manana;
    }

    getDesviacionLlegadaCamionContManana() {
        return this.desviacion_llegada_camion_cont_manana;
    }

    setDesviacionLlegadaCamionContManana(desviacion_llegada_camion_cont_manana) {
        this.desviacion_llegada_camion_cont_manana = desviacion_llegada_camion_cont_manana;
    }

    getMediaLlegadaCamionContTarde() {
        return this.media_llegada_camion_cont_tarde;
    }

    setMediaLlegadaCamionContTarde(media_llegada_camion_cont_tarde) {
        this.media_llegada_camion_cont_tarde = media_llegada_camion_cont_tarde;
    }

    getDesviacionLlegadaCamionContTarde() {
        return this.desviacion_llegada_camion_cont_tarde;
    }

    setDesviacionLlegadaCamionContTarde(desviacion_llegada_camion_cont_tarde) {
        this.desviacion_llegada_camion_cont_tarde = desviacion_llegada_camion_cont_tarde;
    }

    getMediaLlegadaAutoIsla() {
        return this.media_llegada_auto_isla;
    }

    setMediaLlegadaAutoIsla(media_llegada_auto_isla) {
        this.media_llegada_auto_isla = media_llegada_auto_isla;
    }

    getDesviacionLlegadaAutoIsla() {
        return this.desviacion_llegada_auto_isla;
    }

    setDesviacionLlegadaAutoIsla(desviacion_llegada_auto_isla) {
        this.desviacion_llegada_auto_isla = desviacion_llegada_auto_isla;
    }

    getMediaLlegadaCamionIsla() {
        return this.media_llegada_camion_isla;
    }

    setMediaLlegadaCamionIsla(media_llegada_camion_isla) {
        this.media_llegada_camion_isla = media_llegada_camion_isla;
    }

    getDesviacionLlegadaCamionIsla() {
        return this.desviacion_llegada_camion_isla;
    }

    setDesviacionLlegadaCamionIsla(desviacion_llegada_camion_isla) {
        this.desviacion_llegada_camion_isla = desviacion_llegada_camion_isla;
    }

    getTiempoMantenimiento() {
        return this.tiempo_mantenimiento;
    }

    setTiempoMantenimiento(tiempo_mantenimiento) {
        this.tiempo_mantenimiento = tiempo_mantenimiento;
    }

    getFuncionamientoFerrysApertura() {
        return this.funcionamiento_ferrys_apertura;
    }

    setFuncionamientoFerrysApertura(funcionamiento_ferrys_apertura) {
        this.funcionamiento_ferrys_apertura = funcionamiento_ferrys_apertura;
    }

}