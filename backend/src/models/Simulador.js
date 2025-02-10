import { Generador } from "./Generador.js";
import { Cliente } from "./Cliente.js";
import { Estaticas } from "./Estaticas.js";
import { SParametros } from "./SParametros.js";

export class Simulador {
    constructor() {
        this.array = [];
        this.iteracion0 = {};
        this.array_a_mostrar = [];
        this.ultimo_clte_id = 0;
        this.generador = new Generador();

        // Preparar iteracion 0
        this.prepararIteracion0();
    }

    prepararIteracion0() {
        // relojes y datos base
        this.iteracion0.nroEvento = 0;
        this.iteracion0.tipo_evento = "Inicio";
        this.iteracion0.reloj_dias = 1;
        this.iteracion0.reloj_mins = 0;

        // Eventos
        // Funcionamiento de Ferrys
        this.iteracion0.func_ferrys = 60;

        // Llegada de autos al continente
        this.iteracion0.rnd1_llegada_autos_cont = this.generador.generarNumeroAleatorio();
        this.iteracion0.rnd2_llegada_autos_cont = this.generador.generarNumeroAleatorio();
        this.iteracion0.t_llegada_autos_cont = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_llegada_auto_cont_manana, SParametros.getInstance().desviacion_llegada_auto_cont_manana, this.iteracion0.rnd1_llegada_autos_cont, this.iteracion0.rnd2_llegada_autos_cont);
        this.iteracion0.prox_llegada_autos_cont = this.iteracion0.t_llegada_autos_cont + this.iteracion0.reloj_mins;

        // Llegada de camiones al continente
        this.iteracion0.rnd1_llegada_camiones_cont = this.generador.generarNumeroAleatorio();
        this.iteracion0.rnd2_llegada_camiones_cont = this.generador.generarNumeroAleatorio();
        this.iteracion0.t_llegada_camiones_cont = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_llegada_camion_cont_manana, SParametros.getInstance().desviacion_llegada_camion_cont_manana, this.iteracion0.rnd1_llegada_camiones_cont, this.iteracion0.rnd2_llegada_camiones_cont);
        this.iteracion0.prox_llegada_camiones_cont = this.iteracion0.t_llegada_camiones_cont + this.iteracion0.reloj_mins;

        // Llegada de autos a la isla
        this.iteracion0.rnd1_llegada_autos_isla = 0;
        this.iteracion0.rnd2_llegada_autos_isla = 0;
        this.iteracion0.t_llegada_autos_isla = 0;
        this.iteracion0.prox_llegada_autos_isla = 0;

        // Llegada de camiones a la isla
        this.iteracion0.rnd1_llegada_camiones_isla = 0;
        this.iteracion0.rnd2_llegada_camiones_isla = 0;
        this.iteracion0.t_llegada_camiones_isla = 0;
        this.iteracion0.prox_llegada_camiones_isla = 0;

        // Fin de carga de auto
        this.iteracion0.rnd1_fin_carga_auto = 0;
        this.iteracion0.rnd2_fin_carga_auto = 0;
        this.iteracion0.t_fin_carga_auto = 0;
        this.iteracion0.fin_carga_auto = 0;

        // Fin de carga de camion
        this.iteracion0.rnd1_fin_carga_camion = 0;
        this.iteracion0.rnd2_fin_carga_camion = 0;
        this.iteracion0.t_fin_carga_camion = 0;
        this.iteracion0.fin_carga_camion = 0;

        // Fin de descarga de auto
        this.iteracion0.rnd1_fin_descarga_auto = 0;
        this.iteracion0.rnd2_fin_descarga_auto = 0;
        this.iteracion0.t_fin_descarga_auto = 0;
        this.iteracion0.fin_descarga_auto = 0;

        // Fin de descarga de camion
        this.iteracion0.rnd1_fin_descarga_camion = 0;
        this.iteracion0.rnd2_fin_descarga_camion = 0;
        this.iteracion0.t_fin_descarga_camion = 0;
        this.iteracion0.fin_descarga_camion = 0;

        // fin de mantenimiento
        this.iteracion0.t_mantenimiento = 0;
        this.iteracion0.fin_mantenimiento = 0;

        // fin de recorrido para los 2 ferrys
        this.iteracion0.rnd1_fin_recorrido = 0;
        this.iteracion0.rnd2_fin_recorrido = 0;
        this.iteracion0.t_fin_recorrido = 0;
        this.iteracion0.fin_recorrido_ferry_1 = 0;
        this.iteracion0.fin_recorrido_ferry_2 = 0;

        // Servidores: Ferry 1 y Ferry 2
        this.iteracion0.ferry_1 = {
            estado: Estaticas.E_LIBRE,
            mantenimiento: false,
            capacidad_restante: 10,
            localizacion: Estaticas.L_CONTINENTE
        }

        this.iteracion0.ferry_2 = {
            estado: Estaticas.E_LIBRE,
            mantenimiento: false,
            capacidad_restante: 20,
            localizacion: Estaticas.L_CONTINENTE
        }

        this.iteracion0.ultimo_mantenimiento = 0;
        this.iteracion0.hora_salida_ferry_1 = 0;
        this.iteracion0.hora_salida_estimada_ferry_2 = 0;
        this.iteracion0.cola_continente = 0;
        this.iteracion0.cola_isla = 0;

        // Estadisticas
        //A: Cola maxima en continente y en isla
        this.iteracion0.cola_maxima_cont = 0;
        this.iteracion0.cola_maxima_isla = 0;

        // B: Promedio de autos y de autobuses en continente y en isla
        // Autos: 
        this.iteracion0.acum_autos_cont = 0;
        this.iteracion0.acum_autos_isla = 0;
        this.iteracion0.cantidad_dias = this.iteracion0.reloj_dias;
        this.iteracion0.promedio_autos_cont = this.iteracion0.acum_autos_cont / this.iteracion0.cantidad_dias;
        this.iteracion0.promedio_autos_isla = this.iteracion0.acum_autos_isla / this.iteracion0.cantidad_dias;

        // Camiones
        this.iteracion0.acum_camiones_cont = 0;
        this.iteracion0.acum_camiones_isla = 0;
        this.iteracion0.promedio_camiones_cont = this.iteracion0.acum_camiones_cont / this.iteracion0.cantidad_dias;
        this.iteracion0.promedio_camiones_isla = this.iteracion0.acum_camiones_isla / this.iteracion0.cantidad_dias;

        // C: Cantidad de autos que deben esperar al dia siguiente
        this.iteracion0.acum_autos_esperan_hasta_dia_sgte = 0;
        this.iteracion0.promedio_autos_esperan_hasta_dia_sgte = this.iteracion0.acum_autos_esperan_hasta_dia_sgte / this.iteracion0.cantidad_dias;

        this.iteracion0.clientes = [];

        this.array.push(this.iteracion0);
        this.array_a_mostrar.push(this.iteracion0);
    }

    // Todos los eventos siempre van a devolver la fila actual con los cambios correspondientes
    // Primer tipo de evento: Llegada de autos al continente
    llegada_auto_al_continente(fila_anterior) {
        let fila_acutal = structuredClone(fila_anterior);

        fila_acutal.nroEvento += 1;

        let cliente = new Cliente(Estaticas.T_AUTO, Estaticas.L_CONTINENTE);
        cliente.id = this.ultimo_clte_id + 1;
        this.ultimo_clte_id += 1;

        fila_acutal.tipo_evento = `${Estaticas.E_LLEGADA_AUTO_CONT} id ${cliente.id}`;
        fila_acutal.reloj_mins = fila_anterior.prox_llegada_autos_cont;

        if (fila_acutal.reloj_mins > 60) {
            if (fila_anterior.ferry_1.capacidad_restante >= 1 && !fila_anterior.ferry_1.mantenimiento) {
                cliente.ferry_id = 1;
                if (fila_anterior.ferry_1.localizacion == Estaticas.L_CONTINENTE) {
                    if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE) {
                        fila_acutal.ferry_1.estado = Estaticas.E_CARGANDO
                        fila_acutal.ferry_1.capacidad_restante -= 1;
                        cliente.estado = Estaticas.E_CARGANDO;

                        // calcular fin de carga
                        fila_acutal.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                        fila_acutal.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                        fila_acutal.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_acutal.rnd1_fin_carga_auto, fila_acutal.rnd2_fin_carga_auto);
                        fila_acutal.fin_carga_auto = fila_acutal.t_fin_carga_auto + fila_acutal.reloj_mins;
                    } else {
                        fila_acutal.cola_continente += 1;
                        fila_acutal.cola_maxima_cont = Math.max(fila_acutal.cola_continente, fila_anterior.cola_maxima_cont);
                        cliente.estado = Estaticas.E_ESPERANDO_CARGA;
                    }
                } else {
                    if (fila_anterior.ferry_2.capacidad_restante >= 1 && !fila_anterior.ferry_2.mantenimiento) {
                        cliente.ferry_id = 2;
                        if (fila_anterior.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
                            if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE) {
                                fila_acutal.ferry_2.estado = Estaticas.E_CARGANDO
                                fila_acutal.ferry_2.capacidad_restante -= 1;
                                cliente.estado = Estaticas.E_CARGANDO;

                                // calcular fin de carga
                                fila_acutal.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_acutal.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_acutal.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_acutal.rnd1_fin_carga_auto, fila_acutal.rnd2_fin_carga_auto);
                                fila_acutal.fin_carga_auto = fila_acutal.t_fin_carga_auto + fila_acutal.reloj_mins;
                            } else {
                                fila_acutal.cola_continente += 1;
                                fila_acutal.cola_maxima_cont = Math.max(fila_acutal.cola_continente, fila_anterior.cola_maxima_cont);
                                cliente.estado = Estaticas.E_ESPERANDO_CARGA;
                            }
                        } else {
                            fila_acutal.cola_continente += 1;
                            fila_acutal.cola_maxima_cont = Math.max(fila_acutal.cola_continente, fila_anterior.cola_maxima_cont);
                            cliente.estado = Estaticas.E_ESPERANDO_CARGA;
                        }
                    } else {
                        fila_acutal.cola_continente += 1;
                        fila_acutal.cola_maxima_cont = Math.max(fila_acutal.cola_continente, fila_anterior.cola_maxima_cont);
                        cliente.estado = Estaticas.E_ESPERANDO_CARGA;
                    }
                }
            } else {
                if (fila_anterior.ferry_2.capacidad_restante >= 1 && !fila_anterior.ferry_2.mantenimiento) {
                    cliente.ferry_id = 2;
                    if (fila_anterior.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
                        if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE) {
                            fila_acutal.ferry_2.estado = Estaticas.E_CARGANDO
                            fila_acutal.ferry_2.capacidad_restante -= 1;
                            cliente.estado = Estaticas.E_CARGANDO;

                            // calcular fin de carga
                            fila_acutal.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                            fila_acutal.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                            fila_acutal.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_acutal.rnd1_fin_carga_auto, fila_acutal.rnd2_fin_carga_auto);
                            fila_acutal.fin_carga_auto = fila_acutal.t_fin_carga_auto + fila_acutal.reloj_mins;
                        } else {
                            fila_acutal.cola_continente += 1;
                            fila_acutal.cola_maxima_cont = Math.max(fila_acutal.cola_continente, fila_anterior.cola_maxima_cont);
                            cliente.estado = Estaticas.E_ESPERANDO_CARGA;
                        }
                    } else {
                        fila_acutal.cola_continente += 1;
                        fila_acutal.cola_maxima_cont = Math.max(fila_acutal.cola_continente, fila_anterior.cola_maxima_cont);
                        cliente.estado = Estaticas.E_ESPERANDO_CARGA;
                    }
                } else {
                    fila_acutal.cola_continente += 1;
                    fila_acutal.cola_maxima_cont = Math.max(fila_acutal.cola_continente, fila_anterior.cola_maxima_cont);
                    cliente.estado = Estaticas.E_ESPERANDO_CARGA;
                }
            }
        } else {
            fila_acutal.cola_continente += 1;
            fila_acutal.cola_maxima_cont = Math.max(fila_acutal.cola_continente, fila_anterior.cola_maxima_cont);
            cliente.estado = Estaticas.E_ESPERANDO_CARGA;
        }

        fila_acutal.clientes.push(cliente);

        // calcular proxima llegada de auto
        if (fila_acutal.reloj_mins > 300) {
            fila_acutal.rnd1_llegada_autos_cont = this.generador.generarNumeroAleatorio();
            fila_acutal.rnd2_llegada_autos_cont = this.generador.generarNumeroAleatorio();
            fila_acutal.t_llegada_autos_cont = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_llegada_auto_cont_tarde, SParametros.getInstance().desviacion_llegada_auto_cont_tarde, fila_acutal.rnd1_llegada_autos_cont, fila_acutal.rnd2_llegada_autos_cont);
            fila_acutal.prox_llegada_autos_cont = fila_acutal.t_llegada_autos_cont + fila_acutal.reloj_mins;
        } else {
            fila_acutal.rnd1_llegada_autos_cont = this.generador.generarNumeroAleatorio();
            fila_acutal.rnd2_llegada_autos_cont = this.generador.generarNumeroAleatorio();
            fila_acutal.t_llegada_autos_cont = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_llegada_auto_cont_manana, SParametros.getInstance().desviacion_llegada_auto_cont_manana, fila_acutal.rnd1_llegada_autos_cont, fila_acutal.rnd2_llegada_autos_cont);
            fila_acutal.prox_llegada_autos_cont = fila_acutal.t_llegada_autos_cont + fila_acutal.reloj_mins;
        }

        this.array.push(fila_acutal);
        this.array_a_mostrar.push(fila_acutal);
        return fila_acutal
    }

    //  Segundo Tipo de Evento: Llegada de camiones al continente
    llegada_camion_al_continente(fila_anterior) {

    }

    // 3er tipo de evento: Funcionamiento de Ferrys: 
    funcionamiento_ferrys(fila_anterior) {

    }

    // 4to tipo de evento: Fin de carga de auto 
    fin_carga_auto(fila_anterior) {

    }

    // 5to tipo de evento: Fin de carga de camion
    fin_carga_camion(fila_anterior) {

    }

    // 6to tipo de evento: Fin de descarga de auto
    fin_descarga_auto(fila_anterior) {

    }

    // 7mo tipo de evento: Fin de descarga de camion
    fin_descarga_camion(fila_anterior) {

    }

    // 8vo tipo de evento: Fin de mantenimiento
    fin_mantenimiento(fila_anterior) {

    }

    // 9no y 10mo tipo de evento: Fin de recorrido para los 2 ferrys
    fin_recorrido_f1(fila_anterior) {

    }

    fin_recorrido_f2(fila_anterior) {

    }

    // 11vo tipo de evento: Llegada de autos a la isla
    llegada_auto_a_isla(fila_anterior) {

    }

    // 12vo tipo de evento: Llegada de camiones a la isla
    llegada_camion_a_isla(fila_anterior) {

    }

    simular() {
        try {
            let iteracion = 0
            while (iteracion < 2) {
                iteracion += 1;
                let proximo_evento = this.determinar_proximo_evento(this.array[this.array.length - 1]);
                console.log(proximo_evento);
                // proximo_evento = {tipo: "", valor: 0}

                switch (proximo_evento.tipo) {
                    case Estaticas.E_LLEGADA_AUTO_CONT:
                        this.llegada_auto_al_continente(this.array[this.array.length - 1]);
                        break;
                    default:
                        console.log("No hay eventos pendientes");
                        break;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    buscar_auto_a_cargar_de_ferry1(fila_anterior) {
        // buscar el primer auto o camion que este esperando a ser cargado en el ferry 1
        let cliente = fila_anterior.clientes.find(clte => clte.ferry_id == 1 && clte.estado == Estaticas.E_ESPERANDO_CARGA);
        return cliente;
    }

    buscar_auto_a_cargar_de_ferry2(fila_anterior) {
        // buscar el primer auto o camion que este esperando a ser cargado en el ferry 2
        let cliente = fila_anterior.clientes.find(clte => clte.ferry_id == 2 && clte.estado == Estaticas.E_ESPERANDO_CARGA);
        return cliente
    }

    determinar_proximo_evento(fila_anterior) {
        let proximo_evento = {
            tipo: "",
            valor: 0
        }

        let valores = [
            fila_anterior.prox_llegada_autos_cont,
            fila_anterior.prox_llegada_camiones_cont,
            fila_anterior.fin_carga_auto,
            fila_anterior.fin_carga_camion,
            fila_anterior.fin_descarga_auto,
            fila_anterior.fin_descarga_camion,
            fila_anterior.fin_mantenimiento,
            fila_anterior.fin_recorrido_ferry_1,
            fila_anterior.fin_recorrido_ferry_2,
            fila_anterior.prox_llegada_autos_isla,
            fila_anterior.prox_llegada_camiones_isla,
            fila_anterior.func_ferrys
        ]

        // filtrar todos los valores que sean mayores a 0
        valores = valores.filter(val => val > 0);

        let minimo = Math.min(...valores);
        let index = valores.indexOf(minimo);

        switch (index) {
            case 0:
                proximo_evento.tipo = Estaticas.E_LLEGADA_AUTO_CONT;
                proximo_evento.valor = minimo;
                break;
            case 1:
                proximo_evento.tipo = Estaticas.E_LLEGADA_CAMION_CONT;
                proximo_evento.valor = minimo;
                break;
            case 2:
                proximo_evento.tipo = Estaticas.E_FIN_CARGA_AUTO;
                proximo_evento.valor = minimo;
                break;
            case 3:
                proximo_evento.tipo = Estaticas.E_FIN_CARGA_CAMION;
                proximo_evento.valor = minimo;
                break;
            case 4:
                proximo_evento.tipo = Estaticas.E_FIN_DESCARGA_AUTO;
                proximo_evento.valor = minimo;
                break;
            case 5:
                proximo_evento.tipo = Estaticas.E_FIN_DESCARGA_CAMION;
                proximo_evento.valor = minimo;
                break;
            case 6:
                proximo_evento.tipo = Estaticas.E_FIN_MANTENIMIENTO;
                proximo_evento.valor = minimo;
                break;
            case 7:
                proximo_evento.tipo = Estaticas.E_FIN_RECORRIDO_FERRY_1;
                proximo_evento.valor = minimo;
                break;
            case 8:
                proximo_evento.tipo = Estaticas.E_FIN_RECORRIDO_FERRY_2;
                proximo_evento.valor = minimo;
                break;
            case 9:
                proximo_evento.tipo = Estaticas.E_LLEGADA_AUTO_ISLA;
                proximo_evento.valor = minimo;
                break;
            case 10:
                proximo_evento.tipo = Estaticas.E_LLEGADA_CAMION_ISLA;
                proximo_evento.valor = minimo;
                break;
            case 11:
                proximo_evento.tipo = Estaticas.E_FUNCIONAMIENTO_FERRYS;
                proximo_evento.valor = minimo;
                break;
            default:
                break;
        }

        return proximo_evento;
    }
}