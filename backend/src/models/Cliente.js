export class Cliente {
    constructor(tipo, localizacion, id) {
        this.id = id;
        this.ferry_id = null;
        this.estado = "Creado";
        this.tipo = tipo
        this.localizacion = localizacion
    }

    // Métodos getter y setter
    getFerryId() {
        return this.ferry_id;
    }

    setFerryId(ferry_id) {
        this.ferry_id = ferry_id
    }

    getEstado() {
        return this.estado;
    }

    setEstado(estado) {
        this.estado = estado;
    }

    getTipo() {
        return this.tipo;
    }

    setTipo(tipo) {
        this.tipo = tipo;
    }

    getLocalizacion() {
        return this.localizacion;
    }

    setLocalizacion(localizacion) {
        this.localizacion = localizacion;
    }
}