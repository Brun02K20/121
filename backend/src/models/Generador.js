export class Generador {

    constructor() {
        this.precision = 2;
    }

    // Método para truncar el número a la precisión indicada
    truncar(nro) {
        return Math.floor(nro * Math.pow(10, this.precision)) / Math.pow(10, this.precision);
    }

    generarNumeroAleatorio() {
        return Math.random();
    }

    // este seria el tiempo de duracion de la actividad. Aplica para todas las actividades de los eventos posibles
    generar_tiempo_box_muller(media, desviacion, rnd1, rnd2) {
        const z0 = Math.sqrt(-2.0 * Math.log(rnd1)) * Math.cos(2.0 * Math.PI * rnd2);
        const z1 = Math.sqrt(-2.0 * Math.log(rnd1)) * Math.sin(2.0 * Math.PI * rnd2);
        const norm_z0 = this.truncar(media + z0 * desviacion);
        const norm_z1 = this.truncar(media + z1 * desviacion);

        if (norm_z0 < norm_z1) {
            return norm_z1
        } else {
            return norm_z0
        }
    }
}