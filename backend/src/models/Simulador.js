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

        // Fin de carga de auto(i);i=1,2
        this.iteracion0.rnd1_fin_carga_auto = 0;
        this.iteracion0.rnd2_fin_carga_auto = 0;
        this.iteracion0.t_fin_carga_auto = 0;
        this.iteracion0.fin_carga_auto_f1 = 0;
        this.iteracion0.fin_carga_auto_f2 = 0;

        // Fin de carga de camion(i);i=1,2
        this.iteracion0.rnd1_fin_carga_camion = 0;
        this.iteracion0.rnd2_fin_carga_camion = 0;
        this.iteracion0.t_fin_carga_camion = 0;
        this.iteracion0.fin_carga_camion_f1 = 0;
        this.iteracion0.fin_carga_camion_f2 = 0;

        // Fin de descarga de auto(i);i=1,2
        this.iteracion0.rnd1_fin_descarga_auto = 0;
        this.iteracion0.rnd2_fin_descarga_auto = 0;
        this.iteracion0.t_fin_descarga_auto = 0;
        this.iteracion0.fin_descarga_auto_f1 = 0;
        this.iteracion0.fin_descarga_auto_f2 = 0;

        // Fin de descarga de camion(i);i=1,2
        this.iteracion0.rnd1_fin_descarga_camion = 0;
        this.iteracion0.rnd2_fin_descarga_camion = 0;
        this.iteracion0.t_fin_descarga_camion = 0;
        this.iteracion0.fin_descarga_camion_f1 = 0;
        this.iteracion0.fin_descarga_camion_f2 = 0;

        // fin de mantenimiento
        this.iteracion0.inicio_mantenimiento = 0;
        this.iteracion0.t_mantenimiento = 0;
        this.iteracion0.fin_mantenimiento = 0;

        // chequeo habilitacion para llegadas_isla y corte de llegadas a continente y a isla
        this.iteracion0.habilitacion_llegadas_isla = 180;
        this.iteracion0.corte_llegadas_isla = 660;
        this.iteracion0.corte_llegadas_cont = 750;
        this.iteracion0.fin_act_f1 = false; // cuando estas 2 variables sean true, se termina el dia
        this.iteracion0.fin_act_f2 = false;
        this.iteracion0.chequeo_fin_act_dia = 780;

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
            localizacion: Estaticas.L_CONTINENTE,
            ult_loc_tierra: Estaticas.L_CONTINENTE
        }

        this.iteracion0.ferry_2 = {
            estado: Estaticas.E_LIBRE,
            mantenimiento: false,
            capacidad_restante: 20,
            localizacion: Estaticas.L_CONTINENTE,
            ult_loc_tierra: Estaticas.L_CONTINENTE
        }

        this.iteracion0.ultimo_mantenimiento = 0; // que ferry sufrio el ultimo mantenimiento
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
        this.iteracion0.acum_autos_cont = 0; // de continente a isla
        this.iteracion0.acum_autos_isla = 0; // de isla a continente
        this.iteracion0.cantidad_dias = this.iteracion0.reloj_dias;
        this.iteracion0.promedio_autos_cont = this.iteracion0.acum_autos_cont / this.iteracion0.cantidad_dias;
        this.iteracion0.promedio_autos_isla = this.iteracion0.acum_autos_isla / this.iteracion0.cantidad_dias;

        // Camiones
        this.iteracion0.acum_camiones_cont = 0; // de continente a isla
        this.iteracion0.acum_camiones_isla = 0; // de isla a continente
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
    // 1er tipo de evento: Llegada de autos al continente
    llegada_auto_al_continente(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // Paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;
        fila_actual.tipo_evento = `Llegada auto continente id: ${this.ultimo_clte_id + 1}`;
        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.prox_llegada_autos_cont;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la llegada de autos al continente
        fila_actual.rnd1_llegada_autos_cont = 0;
        fila_actual.rnd2_llegada_autos_cont = 0;
        fila_actual.t_llegada_autos_cont = 0;
        fila_actual.prox_llegada_autos_cont = 0;

        // Paso 2: Generar el auto
        let auto = new Cliente(Estaticas.T_AUTO, Estaticas.L_CONTINENTE, this.ultimo_clte_id + 1, Estaticas.L_ISLA);
        this.ultimo_clte_id += 1;

        // Paso 3: Saber que hora es la fila actual
        if (fila_actual.reloj_mins > 60) {
            // si ya pasaron 60 mins, es que abrieron los ferrys, sin embargo, debemos saber si hay otros autos esperando carga
            if (fila_anterior.cola_continente >= 1) {
                // buscar todos los autos en la cola continente
                let autos_en_cola = fila_anterior.clientes.filter(c => c.estado == Estaticas.E_ESPERANDO_CARGA && c.localizacion == Estaticas.L_CONTINENTE);

                // preguntar si todos esos autos en cola son camiones
                let son_todos_camiones = autos_en_cola.every(c => c.tipo == Estaticas.T_CAMION);

                // si son todos camiones
                if (son_todos_camiones) {
                    // si son todos camiones, debo preguntar si hay capacidad >= 1 en el ferry 1
                    if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE && fila_anterior.ferry_1.localizacion == Estaticas.L_CONTINENTE && fila_anterior.ferry_1.capacidad_restante >= 1) {
                        // si hay capacidad en el ferry 1, el auto se sube al ferry 1
                        fila_actual.ferry_1.capacidad_restante -= 1;
                        auto.ferry_id = 1;
                        auto.estado = Estaticas.E_SIENDO_CARGADO;
                        fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;

                        // calcular el tiempo de carga del auto en el ferry 1
                        fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                        fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;

                    } else {
                        // pregunto si hay capacidad en el ferry 2
                        if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE && fila_anterior.ferry_2.localizacion == Estaticas.L_CONTINENTE && fila_anterior.ferry_2.capacidad_restante >= 1) {
                            // si hay capacidad en el ferry 1, el auto se sube al ferry 2
                            fila_actual.ferry_2.capacidad_restante -= 1;
                            auto.ferry_id = 2;
                            auto.estado = Estaticas.E_SIENDO_CARGADO;
                            fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;

                            // calcular el tiempo de carga del auto en el ferry 2
                            fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                            fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                            fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                            fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                        } else {
                            // no hay capacidad en ningun ferry, por ende, se va a la cola
                            fila_actual.cola_continente += 1;
                            auto.estado = Estaticas.E_ESPERANDO_CARGA;

                            if (fila_actual.cola_continente > fila_anterior.cola_maxima_cont) {
                                fila_actual.cola_maxima_cont = fila_actual.cola_continente;
                            }
                        }
                    }
                } else {
                    // si no son todos camiones, directamente a la cola
                    fila_actual.cola_continente += 1;
                    auto.estado = Estaticas.E_ESPERANDO_CARGA;

                    if (fila_actual.cola_continente > fila_anterior.cola_maxima_cont) {
                        fila_actual.cola_maxima_cont = fila_actual.cola_continente;
                    }
                }
            } else {
                // si no hay autos esperando, debo saber si hay ferrys disponibles en el continente, empezando por el ferry 1
                if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE && fila_anterior.ferry_1.localizacion == Estaticas.L_CONTINENTE) {
                    // si el ferry 1 esta libre, debo saber ahora si entra un auto en el ferry
                    if (fila_anterior.ferry_1.capacidad_restante >= 1) {
                        // si hay espacio en el ferry, el auto se sube al ferry
                        fila_actual.ferry_1.capacidad_restante -= 1;
                        auto.ferry_id = 1;
                        auto.estado = Estaticas.E_SIENDO_CARGADO;
                        fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;

                        // calcular el tiempo de carga del auto en el ferry 1
                        fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                        fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                    } else {
                        // si no hay espacio en el ferry 1, debo preguntar si el ferry 2 esta libre en el continente
                        if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE && fila_anterior.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
                            // si esta libre el ferry 2, debo preguntar si hay espacio en el ferry 2
                            if (fila_anterior.ferry_2.capacidad_restante >= 1) {
                                // si hay espacio en el ferry 2, cargar el auto en el ferry 2
                                fila_actual.ferry_2.capacidad_restante -= 1;
                                auto.ferry_id = 2;
                                auto.estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;

                                // calcular el tiempo de carga del auto en el ferry 2
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                            } else {
                                // si no hay espacio en el ferry 2, el auto va a la cola continente
                                fila_actual.cola_continente += 1;
                                auto.estado = Estaticas.E_ESPERANDO_CARGA;

                                if (fila_actual.cola_continente > fila_anterior.cola_maxima_cont) {
                                    fila_actual.cola_maxima_cont = fila_actual.cola_continente;
                                }
                            }
                        } else {
                            // si el ferry 2 no esta libre, el auto va a la cola continente
                            fila_actual.cola_continente += 1;
                            auto.estado = Estaticas.E_ESPERANDO_CARGA;

                            if (fila_actual.cola_continente > fila_anterior.cola_maxima_cont) {
                                fila_actual.cola_maxima_cont = fila_actual.cola_continente;
                            }
                        }
                    }
                } else {
                    // si no esta libre el ferry 1 en el ferry 1, debo preguntar si el ferry 2 esta libre en el continente
                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE && fila_anterior.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
                        // si esta libre el ferry 2, debo preguntar si hay espacio en el ferry 2
                        if (fila_anterior.ferry_2.capacidad_restante >= 1) {
                            // si hay espacio en el ferry 2, cargar el auto en el ferry 2
                            fila_actual.ferry_2.capacidad_restante -= 1;
                            auto.ferry_id = 2;
                            auto.estado = Estaticas.E_SIENDO_CARGADO;
                            fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;

                            // calcular el tiempo de carga del auto en el ferry 2
                            fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                            fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                            fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                            fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                        } else {
                            // si no hay espacio en el ferry 2, el auto va a la cola continente
                            fila_actual.cola_continente += 1;
                            auto.estado = Estaticas.E_ESPERANDO_CARGA;

                            if (fila_actual.cola_continente > fila_anterior.cola_maxima_cont) {
                                fila_actual.cola_maxima_cont = fila_actual.cola_continente;
                            }
                        }
                    } else {
                        // si el ferry 2 no esta libre, el auto va a la cola continente
                        fila_actual.cola_continente += 1;
                        auto.estado = Estaticas.E_ESPERANDO_CARGA;

                        if (fila_actual.cola_continente > fila_anterior.cola_maxima_cont) {
                            fila_actual.cola_maxima_cont = fila_actual.cola_continente;
                        }
                    }
                }
            }
        } else {
            // si no han pasado 60 mins es porque los ferrys no estan disponibles
            fila_actual.cola_continente += 1;
            auto.estado = Estaticas.E_ESPERANDO_CARGA;

            if (fila_actual.cola_continente > fila_anterior.cola_maxima_cont) {
                fila_actual.cola_maxima_cont = fila_actual.cola_continente;
            }
        }

        // Paso 4: Agregar el auto a la lista de clientes
        fila_actual.clientes.push(auto);

        // Paso 5: Calcular la proxima llegada de autos al continente dependiendo de la hora actual
        if (fila_actual.reloj_mins > 300) { // estamos en la tarde
            fila_actual.rnd1_llegada_autos_cont = this.generador.generarNumeroAleatorio();
            fila_actual.rnd2_llegada_autos_cont = this.generador.generarNumeroAleatorio();
            fila_actual.t_llegada_autos_cont = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_llegada_auto_cont_tarde, SParametros.getInstance().desviacion_llegada_auto_cont_tarde, fila_actual.rnd1_llegada_autos_cont, fila_actual.rnd2_llegada_autos_cont);
            fila_actual.prox_llegada_autos_cont = fila_actual.t_llegada_autos_cont + fila_actual.reloj_mins;
        } else { // estamos en la mañana
            fila_actual.rnd1_llegada_autos_cont = this.generador.generarNumeroAleatorio();
            fila_actual.rnd2_llegada_autos_cont = this.generador.generarNumeroAleatorio();
            fila_actual.t_llegada_autos_cont = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_llegada_auto_cont_manana, SParametros.getInstance().desviacion_llegada_auto_cont_manana, fila_actual.rnd1_llegada_autos_cont, fila_actual.rnd2_llegada_autos_cont);
            fila_actual.prox_llegada_autos_cont = fila_actual.t_llegada_autos_cont + fila_actual.reloj_mins;
        }

        this.array.push(fila_actual);
        return fila_actual
    }

    // 2do tipo de evento: Llegada de camiones al continente
    llegada_camion_al_continente(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // Paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;
        fila_actual.tipo_evento = `Llegada camion continente id: ${this.ultimo_clte_id + 1}`;
        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.prox_llegada_camiones_cont;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la llegada de camiones al continente
        fila_actual.rnd1_llegada_camiones_cont = 0;
        fila_actual.rnd2_llegada_camiones_cont = 0;
        fila_actual.t_llegada_camiones_cont = 0;
        fila_actual.prox_llegada_camiones_cont = 0;

        // Paso 2: Generar el camion
        let camion = new Cliente(Estaticas.T_CAMION, Estaticas.L_CONTINENTE, this.ultimo_clte_id + 1, Estaticas.L_ISLA);
        this.ultimo_clte_id += 1;

        // Paso 3: Saber que hora es la fila actual
        if (fila_actual.reloj_mins > 60) {
            // si ya pasaron 60 mins, es que abrieron los ferrys, sin embargo, debemos saber si hay otros autos o camiones esperando carga
            if (fila_anterior.cola_continente >= 1) {
                // si hay autos o camiones esperando, el nuevo camion se va a la cola continente
                fila_actual.cola_continente += 1;
                camion.estado = Estaticas.E_ESPERANDO_CARGA;

                if (fila_actual.cola_continente > fila_anterior.cola_maxima_cont) {
                    fila_actual.cola_maxima_cont = fila_actual.cola_continente;
                }
            } else {
                // si no hay autos esperando, debo saber si hay ferrys disponibles, empezando por el ferry 1, ademas, debe estar en el continente
                if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE && fila_anterior.ferry_1.localizacion == Estaticas.L_CONTINENTE) {
                    // si el ferry 1 esta libre, debo saber ahora si entra un camion en el ferry
                    if (fila_anterior.ferry_1.capacidad_restante >= 2) {
                        // si hay espacio en el ferry, el camion se sube al ferry
                        fila_actual.ferry_1.capacidad_restante -= 2;
                        camion.ferry_id = 1;
                        camion.estado = Estaticas.E_SIENDO_CARGADO;
                        fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;

                        // calcular el tiempo de carga del camion en el ferry 1
                        fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                        fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                    } else {
                        // si no hay espacio en el ferry 1, debo preguntar si el ferry 2 esta libre en el continente
                        if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE && fila_anterior.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
                            // si esta libre el ferry 2, debo preguntar si hay espacio en el ferry 2
                            if (fila_anterior.ferry_2.capacidad_restante >= 2) {
                                // si hay espacio en el ferry 2, cargar el camion en el ferry 2
                                fila_actual.ferry_2.capacidad_restante -= 2;
                                camion.ferry_id = 2;
                                camion.estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;

                                // calcular el tiempo de carga del camion en el ferry 2
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                            } else {
                                // si no hay espacio en el ferry 2, el camion va a la cola continente
                                fila_actual.cola_continente += 1;
                                camion.estado = Estaticas.E_ESPERANDO_CARGA;

                                if (fila_actual.cola_continente > fila_anterior.cola_maxima_cont) {
                                    fila_actual.cola_maxima_cont = fila_actual.cola_continente;
                                }
                            }
                        } else {
                            // si el ferry 2 no esta libre, el camion va a la cola continente
                            fila_actual.cola_continente += 1;
                            camion.estado = Estaticas.E_ESPERANDO_CARGA;

                            if (fila_actual.cola_continente > fila_anterior.cola_maxima_cont) {
                                fila_actual.cola_maxima_cont = fila_actual.cola_continente;
                            }
                        }
                    }
                } else {
                    // si no esta libre el ferry 1, debo preguntar si el ferry 2 esta libre en el continente
                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE && fila_anterior.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
                        // si esta libre el ferry 2, debo preguntar si hay espacio en el ferry 2
                        if (fila_anterior.ferry_2.capacidad_restante >= 2) {
                            // si hay espacio en el ferry 2, cargar el camion en el ferry 2
                            fila_actual.ferry_2.capacidad_restante -= 2;
                            camion.ferry_id = 2;
                            camion.estado = Estaticas.E_SIENDO_CARGADO;
                            fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;

                            // calcular el tiempo de carga del camion en el ferry 2
                            fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                            fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                            fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                            fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                        } else {
                            // si no hay espacio en el ferry 2, el camion va a la cola continente
                            fila_actual.cola_continente += 1;
                            camion.estado = Estaticas.E_ESPERANDO_CARGA;

                            if (fila_actual.cola_continente > fila_anterior.cola_maxima_cont) {
                                fila_actual.cola_maxima_cont = fila_actual.cola_continente;
                            }
                        }
                    } else {
                        // si el ferry 2 no esta libre, el camion va a la cola continente
                        fila_actual.cola_continente += 1;
                        camion.estado = Estaticas.E_ESPERANDO_CARGA;

                        if (fila_actual.cola_continente > fila_anterior.cola_maxima_cont) {
                            fila_actual.cola_maxima_cont = fila_actual.cola_continente;
                        }
                    }
                }
            }
        } else {
            // si no han pasado 60 mins es porque los ferrys no estan disponibles
            fila_actual.cola_continente += 1;
            camion.estado = Estaticas.E_ESPERANDO_CARGA;

            if (fila_actual.cola_continente > fila_anterior.cola_maxima_cont) {
                fila_actual.cola_maxima_cont = fila_actual.cola_continente;
            }
        }

        // Paso 4: Agregar el auto a la lista de clientes
        fila_actual.clientes.push(camion);

        // Paso 5: Calcular la proxima llegada de camiones al continente dependiendo de la hora actual
        if (fila_actual.reloj_mins > 240) { // estamos en la tarde
            fila_actual.rnd1_llegada_camiones_cont = this.generador.generarNumeroAleatorio();
            fila_actual.rnd2_llegada_camiones_cont = this.generador.generarNumeroAleatorio();
            fila_actual.t_llegada_camiones_cont = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_llegada_camion_cont_tarde, SParametros.getInstance().desviacion_llegada_camion_cont_tarde, fila_actual.rnd1_llegada_camiones_cont, fila_actual.rnd2_llegada_camiones_cont);
            fila_actual.prox_llegada_camiones_cont = fila_actual.t_llegada_camiones_cont + fila_actual.reloj_mins;
        } else { // estamos en la mañana
            fila_actual.rnd1_llegada_camiones_cont = this.generador.generarNumeroAleatorio();
            fila_actual.rnd2_llegada_camiones_cont = this.generador.generarNumeroAleatorio();
            fila_actual.t_llegada_camiones_cont = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_llegada_camion_cont_manana, SParametros.getInstance().desviacion_llegada_camion_cont_manana, fila_actual.rnd1_llegada_camiones_cont, fila_actual.rnd2_llegada_camiones_cont);
            fila_actual.prox_llegada_camiones_cont = fila_actual.t_llegada_camiones_cont + fila_actual.reloj_mins;
        }

        this.array.push(fila_actual);
        return fila_actual
    }

    // 3er tipo de evento: Funcionamiento de Ferrys: 
    funcionamiento_ferrys(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // Paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;
        fila_actual.tipo_evento = "Funcionamiento de Ferrys";
        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.func_ferrys;
        fila_actual.func_ferrys = 0;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // en esta parte del proceso, los ferrys 1 y 2 estan en el continente siempre. 
        // tener en cuenta que puede haber un ferry en mantenimiento. Por eso el primer paso es saber si 
        // los 2 ferrys estan libres o si hay alguno en mantenimiento. 

        // La capacidad de los ferrys en esta parte puede variar, puede ser su maximo o cualquier otra >= 0
        if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE && fila_anterior.ferry_2.estado == Estaticas.E_LIBRE) {
            // pregunto si el fery 1 ya esta lleno
            if (fila_anterior.ferry_1.capacidad_restante == 0) {
                // esta lleno
                // recorrido a la isla por parte del ferry 1
                fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                // calcular el tiempo de llegada del ferry 1
                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
            } else {
                // tiene 1 o mas espacios
                if (fila_anterior.ferry_1.capacidad_restante == 1) {
                    // exactamente un espacio
                    // pregunto si hay algun tipo de auto esperando en la cola del continente
                    if (fila_anterior.cola_continente >= 1) {
                        // hay autos en la cola
                        // busco si hay algun AUTO esperando en la cola del continente
                        let auto_a_cargar = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_CONTINENTE);
                        if (auto_a_cargar) {
                            // hay un auto esperando y hay espacio en el ferry 1 y este esta libre, a cargarlo
                            fila_actual.cola_continente -= 1;
                            fila_actual.ferry_1.capacidad_restante -= 1;
                            fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                            fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                            fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                            // calcular el tiempo de carga del auto en el ferry 1
                            fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                            fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                            fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                            fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                        }
                    }
                } else {
                    // mas de un espacio
                    // pregunto si hay algun tipo de auto esperando en la cola del continente
                    if (fila_anterior.cola_continente >= 1) {
                        // hay autos en la cola
                        // busco si hay algun auto cualquiera esperando en la cola del continente
                        let auto_a_cargar = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.localizacion == Estaticas.L_CONTINENTE);
                        if (auto_a_cargar) {
                            if (auto_a_cargar.tipo == Estaticas.T_CAMION) {
                                // cargar el camion
                                // si hay espacio en el ferry, el camion se sube al ferry
                                fila_actual.cola_continente -= 1;
                                fila_actual.ferry_1.capacidad_restante -= 2;
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                // calcular el tiempo de carga del camion en el ferry 1
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;

                            } else {
                                // cargar el auto
                                // si hay espacio en el ferry, el auto se sube al ferry
                                fila_actual.cola_continente -= 1;
                                fila_actual.ferry_1.capacidad_restante -= 1;
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                // calcular el tiempo de carga del auto en el ferry 1
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                            }
                        }
                    }
                }
            }

            // pregunto si el fery 2 ya esta lleno
            if (fila_anterior.ferry_2.capacidad_restante == 0) {
                // esta lleno
                // recorrido a la isla por parte del ferry 2
                fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                // calcular el tiempo de llegada del ferry 2
                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
            } else {
                // tiene 1 o mas espacios
                if (fila_anterior.ferry_2.capacidad_restante == 1) {
                    // exactamente un espacio
                    // pregunto si hay algun tipo de auto esperando en la cola del continente
                    if (fila_anterior.cola_continente >= 1) {
                        // hay autos en la cola
                        // busco si hay algun AUTO esperando en la cola del continente
                        let auto_a_cargar = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_CONTINENTE);
                        if (auto_a_cargar) {
                            // hay un auto esperando y hay espacio en el ferry 2 y este esta libre, a cargarlo
                            fila_actual.cola_continente -= 1;
                            fila_actual.ferry_2.capacidad_restante -= 1;
                            fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                            fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                            fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 2;

                            // calcular el tiempo de carga del auto en el ferry 2
                            fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                            fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                            fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                            fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                        }
                    }
                } else {
                    // mas de un espacio
                    // pregunto si hay algun tipo de auto esperando en la cola del continente
                    if (fila_anterior.cola_continente >= 1) {
                        // hay autos en la cola
                        // busco si hay algun auto cualquiera esperando en la cola del continente
                        let auto_a_cargar = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.localizacion == Estaticas.L_CONTINENTE);
                        if (auto_a_cargar) {
                            if (auto_a_cargar.tipo == Estaticas.T_CAMION) {
                                // cargar el camion
                                // si hay espacio en el ferry, el camion
                                fila_actual.cola_continente -= 1;
                                fila_actual.ferry_2.capacidad_restante -= 2;
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 2;

                                // calcular el tiempo de carga del camion en el ferry 2
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                            } else {
                                // cargar el auto
                                // si hay espacio en el ferry, el auto se
                                fila_actual.cola_continente -= 1;
                                fila_actual.ferry_2.capacidad_restante -= 1;
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 2;

                                // calcular el tiempo de carga del auto en el ferry 2
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                            }
                        }
                    }
                }
            }
        } else {
            // hay alguno en mantenimiento
            if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE) {
                // ferry 2 es el que esta en mantenimiento

                // pregunto si el fery 1 ya esta lleno
                if (fila_anterior.ferry_1.capacidad_restante == 0) {
                    // esta lleno
                    // recorrido a la isla por parte del ferry 1
                    fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                    fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                    // calcular el tiempo de llegada del ferry 1
                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                    fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                } else {
                    // tiene 1 o mas espacios
                    if (fila_anterior.ferry_1.capacidad_restante == 1) {
                        // exactamente un espacio
                        // pregunto si hay algun tipo de auto esperando en la cola del continente
                        if (fila_anterior.cola_continente >= 1) {
                            // hay autos en la cola
                            // busco si hay algun AUTO esperando en la cola del continente
                            let auto_a_cargar = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_CONTINENTE);
                            if (auto_a_cargar) {
                                // hay un auto esperando y hay espacio en el ferry 1 y este esta libre, a cargarlo
                                fila_actual.cola_continente -= 1;
                                fila_actual.ferry_1.capacidad_restante -= 1;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                // calcular el tiempo de carga del auto en el ferry 1
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                            }
                        }
                    } else {
                        // mas de un espacio
                        // pregunto si hay algun tipo de auto esperando en la cola del continente
                        if (fila_anterior.cola_continente >= 1) {
                            // hay autos en la cola
                            // busco si hay algun auto cualquiera esperando en la cola del continente
                            let auto_a_cargar = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.localizacion == Estaticas.L_CONTINENTE);
                            if (auto_a_cargar) {
                                if (auto_a_cargar.tipo == Estaticas.T_CAMION) {
                                    // cargar el camion
                                    // si hay espacio en el ferry, el camion se sube al ferry
                                    fila_actual.cola_continente -= 1;
                                    fila_actual.ferry_1.capacidad_restante -= 2;
                                    fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                    fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                    fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                    // calcular el tiempo de carga del camion en el ferry 1
                                    fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                    fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;

                                } else {
                                    // cargar el auto
                                    // si hay espacio en el ferry, el auto se sube al ferry
                                    fila_actual.cola_continente -= 1;
                                    fila_actual.ferry_1.capacidad_restante -= 1;
                                    fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                    fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                    fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                    // calcular el tiempo de carga del auto en el ferry 1
                                    fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                    fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                                }
                            }
                        }
                    }
                }
            } else {
                // ferry 1 es el que esta en mantenimiento
                if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE) {
                    // ferry 2 libre
                    // pregunto si el fery 2 ya esta lleno
                    if (fila_anterior.ferry_2.capacidad_restante == 0) {
                        // esta lleno
                        // recorrido a la isla por parte del ferry 2
                        fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                        fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                        fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                        fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                        // calcular el tiempo de llegada del ferry 2
                        fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                        fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                    } else {
                        // tiene 1 o mas espacios
                        if (fila_anterior.ferry_2.capacidad_restante == 1) {
                            // exactamente un espacio
                            // pregunto si hay algun tipo de auto esperando en la cola del continente
                            if (fila_anterior.cola_continente >= 1) {
                                // hay autos en la cola
                                // busco si hay algun AUTO esperando en la cola del continente
                                let auto_a_cargar = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_CONTINENTE);
                                if (auto_a_cargar) {
                                    // hay un auto esperando y hay espacio en el ferry 2 y este esta libre, a cargarlo
                                    fila_actual.ferry_2.capacidad_restante -= 1;
                                    fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                    fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                    fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 2;

                                    // calcular el tiempo de carga del auto en el ferry 2
                                    fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                    fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                }
                            }
                        } else {
                            // mas de un espacio
                            // pregunto si hay algun tipo de auto esperando en la cola del continente
                            if (fila_anterior.cola_continente >= 1) {
                                // hay autos en la cola
                                // busco si hay algun auto cualquiera esperando en la cola del continente
                                let auto_a_cargar = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.localizacion == Estaticas.L_CONTINENTE);
                                if (auto_a_cargar) {
                                    if (auto_a_cargar.tipo == Estaticas.T_CAMION) {
                                        // cargar el camion
                                        // si hay espacio en el ferry, el camion
                                        fila_actual.cola_continente -= 1;
                                        fila_actual.ferry_2.capacidad_restante -= 2;
                                        fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                        fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                        fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 2;

                                        // calcular el tiempo de carga del camion en el ferry 2
                                        fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                        fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                        fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                        fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                                    } else {
                                        // cargar el auto
                                        // si hay espacio en el ferry, el auto se
                                        fila_actual.cola_continente -= 1;
                                        fila_actual.ferry_2.capacidad_restante -= 1;
                                        fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                        fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                        fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 2;

                                        // calcular el tiempo de carga del auto en el ferry 2
                                        fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                        fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                        fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                        fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    // ferry 2 en mantenimiento
                    // ferry 1 libre
                    // pregunto si el fery 1 ya esta lleno
                    if (fila_anterior.ferry_1.capacidad_restante == 0) {
                        // esta lleno
                        // recorrido a la isla por parte del ferry 1
                        fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                        fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                        fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                        fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                        // calcular el tiempo de llegada del ferry 1
                        fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                        fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                    } else {
                        // tiene 1 o mas espacios
                        if (fila_anterior.ferry_1.capacidad_restante == 1) {
                            // exactamente un espacio
                            // pregunto si hay algun tipo de auto esperando en la cola del continente
                            if (fila_anterior.cola_continente >= 1) {
                                // hay autos en la cola
                                // busco si hay algun AUTO esperando en la cola del continente
                                let auto_a_cargar = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_CONTINENTE);
                                if (auto_a_cargar) {
                                    // hay un auto esperando y hay espacio en el ferry 1 y este esta libre, a cargarlo
                                    fila_actual.cola_continente -= 1;
                                    fila_actual.ferry_1.capacidad_restante -= 1;
                                    fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                    fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                    fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                    // calcular el tiempo de carga del auto en el ferry 1
                                    fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                    fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                }
                            }
                        } else {
                            // mas de un espacio
                            // pregunto si hay algun tipo de auto esperando en la cola del continente
                            if (fila_anterior.cola_continente >= 1) {
                                // hay autos en la cola
                                // busco si hay algun auto cualquiera esperando en la cola del continente
                                let auto_a_cargar = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.localizacion == Estaticas.L_CONTINENTE);
                                if (auto_a_cargar) {
                                    if (auto_a_cargar.tipo == Estaticas.T_CAMION) {
                                        // cargar el camion
                                        // si hay espacio en el ferry, el camion
                                        fila_actual.cola_continente -= 1;
                                        fila_actual.ferry_1.capacidad_restante -= 1;
                                        fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                        fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                        fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                        // calcular el tiempo de carga del camion en el ferry 1
                                        fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                        fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                        fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                        fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                                    } else {
                                        // cargar el auto
                                        // si hay espacio en el ferry, el auto se
                                        fila_actual.cola_continente -= 1;
                                        fila_actual.ferry_1.capacidad_restante -= 1;
                                        fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                        fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                        fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                        // calcular el tiempo de carga del auto en el ferry 1
                                        fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                        fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                        fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                        fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        this.array.push(fila_actual);
        return fila_actual
    }

    // 4to y 5to tipo de evento: Fin de carga de auto f1 y f2
    fin_carga_auto_f1(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;

        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.fin_carga_auto_f1;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la fin de carga de autos en el ferry 1
        fila_actual.rnd1_fin_carga_auto = 0;
        fila_actual.rnd2_fin_carga_auto = 0;
        fila_actual.t_fin_carga_auto = 0;
        fila_actual.fin_carga_auto_f1 = 0;

        // paso 2: buscar el auto que se esta cargando en el ferry 1
        let cliente_cargado = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_SIENDO_CARGADO && clte.ferry_id == 1);
        fila_actual.tipo_evento = `Fin de carga auto en ferry 1 id: ${cliente_cargado.id}`;

        // paso 3: cambiar el estado del auto a esperando viaje
        fila_actual.clientes.find(clte => clte.id == cliente_cargado.id).estado = Estaticas.E_ESPERANDO_VIAJE;

        // paso 4: extraigo la localizacion del auto
        let localizacion_auto = cliente_cargado.localizacion;

        // paso 4.5: saber la hor aactual para saber si cortar aca el dia o no
        if (fila_actual.reloj_mins >= 780) {
            // si ya paso las 20hs, pregunto donde se cargo
            if (fila_anterior.ferry_1.localizacion == Estaticas.L_CONTINENTE) {
                // si se cargo en el continente, finalizo la actividad del dia
                fila_actual.ferry_1.estado = Estaticas.E_FIN_ACTIVIDAD_DIA;
                fila_actual.fin_act_f1 = true
            } else {
                // si termino de cargar en la isla, hago un viaje al continente
                fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                // calcular el tiempo de llegada del ferry 1
                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
            }
        } else {
            // paso 5: saber en que localizacion se encuentra el auto, por ende saber donde esta el ferry 1
            if (localizacion_auto == Estaticas.L_CONTINENTE) {
                // esta en el continente
                // debo saber si hay autos esperando en la cola del continente
                if (fila_anterior.cola_continente >= 1) {
                    // hay cola en continente
                    // busco el primer auto o camion que este esperando en la cola del continente
                    let cliente_a_cargar = this.buscar_auto_a_cargar_en_continente(fila_anterior);

                    // solo si hay un cliente, debo seguir el proceso
                    if (cliente_a_cargar) {
                        // una vez encontrado el cliente, debo saber que tipo de cliente es: 
                        if (cliente_a_cargar.tipo == Estaticas.T_CAMION) {
                            // es un camion
                            // debo preguntar si hay espacio en el ferry 1 para cargar el camion
                            if (fila_anterior.ferry_1.capacidad_restante >= 2) {
                                // hay espacio en el ferry 1
                                // cargar el camion
                                // si hay cola en el continente debo restarle 1
                                fila_actual.cola_continente -= 1;
                                fila_actual.ferry_1.capacidad_restante -= 2;
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del camion en el ferry 1
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                            } else {
                                // por aca no entra el camion, pero puede o no entrar mas nada o entrar un auto
                                if (fila_anterior.ferry_1.capacidad_restante == 1) {
                                    // pregunto si hay un auto esperando en la cola del continente
                                    let auto_esperando = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_CONTINENTE);
                                    if (auto_esperando) {
                                        // hay un auto esperando en la cola del continente y hay justo un espacio en el ferry 2
                                        // entonces cargo el auto
                                        fila_actual.cola_continente -= 1;
                                        fila_actual.ferry_1.capacidad_restante -= 1;
                                        fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).ferry_id = 1;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).estado = Estaticas.E_SIENDO_CARGADO;

                                        // calcular el tiempo de carga del auto en el ferry 1
                                        fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                        fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                    } else {
                                        // no hay autos esperando pero hay un espacio, asi que el ferry pasa a estar libre
                                        fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                                    }
                                }

                                // si no entra el camion, consulto si ya puedo hacer el viaje del ferry 1
                                if (fila_anterior.ferry_1.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 1 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 1
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // no hay espacio en el ferry 1
                                // entonces debo preguntar si el ferry 2 esta en el continente
                                if (fila_anterior.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
                                    // entonces debo preguntar si el ferry 2 esta libre
                                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 2
                                        if (fila_anterior.ferry_2.capacidad_restante >= 2) {
                                            // hay espacio en el ferry 2
                                            // cargar el camion
                                            // si hay cola en el continente debo restarle 1
                                            fila_actual.cola_continente -= 1;
                                            fila_actual.ferry_2.capacidad_restante -= 2;
                                            fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del camion en el ferry 2
                                            fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                            fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                                        } else {
                                            // puede que no entre el camion, pero puede o no entrar mas nada o entrar un auto
                                            if (fila_anterior.ferry_2.capacidad_restante == 1) {
                                                // preguntar si hay autos esperando en la cola del continente 
                                                let auto_en_cola = fila_actual.clientes.find(clte => clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_CONTINENTE && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                                                if (auto_en_cola) {
                                                    // hay autos esperando en la cola del continente
                                                    // entonces debo cargar el auto en el ferry 2
                                                    fila_actual.cola_continente -= 1;
                                                    fila_actual.ferry_2.capacidad_restante -= 1;
                                                    fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).ferry_id = 2;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).estado = Estaticas.E_SIENDO_CARGADO;

                                                    // calcular el tiempo de carga del auto en el ferry 2
                                                    fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                                    fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                                } else {
                                                    // ferry 2 no tiene espacio para camiones y no hay autos esperando
                                                    // entonces el ferry
                                                    fila_actual.ferry_2.localizacion = Estaticas.L_CONTINENTE;
                                                    fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                                                }
                                            } else {
                                                // la capacidad esta al maxmo, asi que inicia viaje
                                                fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                                                fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                                // calcular el tiempo de llegada del ferry 2
                                                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                                fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                            }
                                        }
                                    } // si no esta libre, que no pase nada
                                } // si no esta en el continente, que no pase nada
                            }
                        } else {
                            // es un auto
                            // debo preguntar si hay espacio en el ferry 1 para cargar el auto
                            if (fila_anterior.ferry_1.capacidad_restante >= 1) {
                                // hay espacio en el ferry 1
                                // cargar el auto
                                // si hay cola en el continente debo restarle 1
                                fila_actual.cola_continente -= 1;
                                fila_actual.ferry_1.capacidad_restante -= 1;
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del auto en el ferry 1
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                            } else {
                                // no hay espacio en el ferry 1
                                // si no entra el auto, consulto si ya puedo hacer el viaje del ferry 1
                                if (fila_anterior.ferry_1.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 1 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 1
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // entonces debo preguntar si el ferry 2 esta en el continente
                                if (fila_anterior.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
                                    // entonces debo preguntar si el ferry 2 esta libre
                                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 2
                                        if (fila_anterior.ferry_2.capacidad_restante >= 1) {
                                            // hay espacio en el ferry 1
                                            // cargar el auto
                                            // si hay cola en el continente debo restarle 1
                                            fila_actual.cola_continente -= 1;
                                            fila_actual.ferry_2.capacidad_restante -= 1;
                                            fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del auto en el ferry 2
                                            fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                            fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                        } else {
                                            // el espacio = 0 por ende ya puede iniciar viaje
                                            fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                                            fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                                            fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                            fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                            // calcular el tiempo de llegada del ferry 2
                                            fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                            fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                        }
                                    } // si no esta libre, que no pase nada
                                }
                            }
                        }
                    }
                } else {
                    // no hay cola en continente
                    // debo saber si el ferry 1 ya completo su capacidad de carga
                    if (fila_actual.ferry_1.capacidad_restante == 0) {
                        // si ya completo su capacidad de carga, entonces el ferry 1 se va a la isla
                        fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                        fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                        fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                        fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                        // calcular el tiempo de viaje del ferry 1
                        fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                        fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                    }

                    if (fila_anterior.ferry_1.capacidad_restante != 0) {
                        fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                    }
                }
            } else {
                // esta en la isla
                // debo saber si hay autos esperando en la cola de la isla
                if (fila_anterior.cola_isla >= 1) {
                    // hay cola en isla
                    // busco el primer auto o camion que este esperando en la cola de la isla
                    let cliente_a_cargar = this.buscar_auto_a_cargar_en_isla(fila_anterior);

                    // solo si hay un cliente, debo seguir el proceso
                    if (cliente_a_cargar) {
                        // una vez encontrado el cliente, debo saber que tipo de cliente es: 
                        if (cliente_a_cargar.tipo == Estaticas.T_CAMION) {
                            // es un camion
                            // debo preguntar si hay espacio en el ferry 1 para cargar el camion
                            if (fila_anterior.ferry_1.capacidad_restante >= 2) {
                                // hay espacio en el ferry 1
                                // cargar el camion
                                // si hay cola en la isla debo restarle 1
                                fila_actual.cola_isla -= 1;
                                fila_actual.ferry_1.capacidad_restante -= 2;
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del camion en el ferry 1
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                            } else {
                                // si no hay 2 espacios es porque hay o 1 o 0, si hay 0 ya lo hicimos, pero si hay 1:
                                if (fila_anterior.ferry_1.capacidad_restante == 1) {
                                    // pregunto si hay un auto esperando en la cola de la isla
                                    let auto_esperando = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_ISLA);
                                    if (auto_esperando) {
                                        // hay un auto esperando en la cola de la isla y hay justo un espacio en el ferry 1
                                        // entonces cargo el auto
                                        fila_actual.cola_isla -= 1;
                                        fila_actual.ferry_1.capacidad_restante -= 1;
                                        fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).ferry_id = 1;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).estado = Estaticas.E_SIENDO_CARGADO;

                                        // calcular el tiempo de carga del auto en el ferry 1
                                        fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                        fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                    }
                                }

                                // si no entra el camion, consulto si ya puedo hacer el viaje del ferry 1
                                if (fila_anterior.ferry_1.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 1 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 1
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // no hay espacio en el ferry 1
                                // entonces debo preguntar si el ferry 2 esta en la isla
                                if (fila_anterior.ferry_2.localizacion == Estaticas.L_ISLA) {
                                    // entonces debo preguntar si el ferry 2 esta libre
                                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 2
                                        if (fila_anterior.ferry_2.capacidad_restante >= 2) {
                                            // hay espacio en el ferry 2
                                            // cargar el camion
                                            // si hay cola en la isla debo restarle 1
                                            fila_actual.cola_isla -= 1;
                                            fila_actual.ferry_2.capacidad_restante -= 2;
                                            fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del camion en el ferry 2
                                            fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                            fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                                        } else {
                                            // puede haber o 1 espacio o 0 espacios
                                            if (fila_anterior.ferry_2.capacidad_restante == 1) {
                                                // hay un espacio
                                                let auto_en_cola = fila_actual.clientes.find(clte => clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_ISLA && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                                                if (auto_en_cola) {
                                                    // hay un auto esperando en la cola de la isla y hay justo un espacio en el ferry
                                                    // entonces cargo el auto
                                                    fila_actual.cola_isla -= 1;
                                                    fila_actual.ferry_2.capacidad_restante -= 1;
                                                    fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).ferry_id = 2;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).estado = Estaticas.E_SIENDO_CARGADO;

                                                    // calcular el tiempo de carga del auto en el ferry 2
                                                    fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                                    fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                                } else {
                                                    // ferry 1 libre
                                                    fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                                                }
                                            } else {
                                                // no hay mas espacios, por ende inicio recorrido
                                                fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                                                fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                                // calcular el tiempo de llegada del ferry 2
                                                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                                fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                            }
                                        }
                                    } // si no esta libre, que no pase nada
                                } // si no esta en la isla, que no pase nada
                            }
                        } else {
                            // es un auto
                            // debo preguntar si hay espacio en el ferry 1 para cargar el auto
                            if (fila_anterior.ferry_1.capacidad_restante >= 1) {
                                // hay espacio en el ferry 1
                                // cargar el auto
                                // si hay cola en la isla debo restarle 1
                                fila_actual.cola_isla -= 1;
                                fila_actual.ferry_1.capacidad_restante -= 1;
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del auto en el ferry 1
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                            } else {
                                // si no entra el camion, consulto si ya puedo hacer el viaje del ferry 1
                                if (fila_anterior.ferry_1.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 1 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 1
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // no hay espacio en el ferry 1
                                // entonces debo preguntar si el ferry 2 esta en la isla
                                if (fila_anterior.ferry_2.localizacion == Estaticas.L_ISLA) {
                                    // entonces debo preguntar si el ferry 2 esta libre
                                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 2
                                        if (fila_anterior.ferry_2.capacidad_restante >= 1) {
                                            // hay espacio en el ferry 1
                                            // cargar el auto
                                            // si hay cola en la isla debo restarle 1
                                            fila_actual.cola_isla -= 1;
                                            fila_actual.ferry_2.capacidad_restante -= 1;
                                            fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del auto en el ferry 2
                                            fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                            fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                        } // si no hay espacio tampoco en el ferry 2, que no pase nada
                                    } // si no esta libre, que no pase nada
                                } // si no esta en la isla, que no pase nada
                            }
                        }
                    }
                } else {
                    // no hay cola en isla
                    // debo saber si el ferry 1 ya completo su capacidad de carga
                    if (fila_actual.ferry_1.capacidad_restante == 0) {
                        // si ya completo su capacidad de carga, entonces el ferry 1 se va al continente
                        fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                        fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                        fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                        fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                        // calcular el tiempo de viaje del ferry 1
                        fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                        fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                    }

                    if (fila_anterior.ferry_1.capacidad_restante != 0) {
                        fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                    }
                }
            }
        }

        // agregar la fila a la lista
        this.array.push(fila_actual);
        return fila_actual;
    }


    // 4to y 5to tipo de evento: Fin de carga de auto f1 y f2
    fin_carga_auto_f2(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;

        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.fin_carga_auto_f2;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la fin de carga de autos en el ferry 2
        fila_actual.rnd1_fin_carga_auto = 0;
        fila_actual.rnd2_fin_carga_auto = 0;
        fila_actual.t_fin_carga_auto = 0;
        fila_actual.fin_carga_auto_f2 = 0;

        // paso 2: buscar el auto que se esta cargando en el ferry 2
        let cliente_cargado = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_SIENDO_CARGADO && clte.ferry_id == 2);
        fila_actual.tipo_evento = `Fin de carga auto en ferry 2 id: ${cliente_cargado.id}`;

        // paso 3: cambiar el estado del auto a esperando viaje
        fila_actual.clientes.find(clte => clte.id == cliente_cargado.id).estado = Estaticas.E_ESPERANDO_VIAJE;

        // paso 4: extraigo la localizacion del auto
        let localizacion_auto = cliente_cargado.localizacion;

        if (fila_actual.reloj_mins >= 780) {
            // si ya paso las 20hs, pregunto donde se cargo
            if (fila_anterior.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
                // si se cargo en el continente, finalizo la actividad del dia
                fila_actual.ferry_2.estado = Estaticas.E_FIN_ACTIVIDAD_DIA;
                fila_actual.fin_act_f2 = true
            } else {
                // si termino de cargar en la isla, hago un viaje al continente
                fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                // calcular el tiempo de llegada del ferry 2
                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
            }
        } else {
            // paso 5: saber en que localizacion se encuentra el auto, por ende saber donde esta el ferry 2
            if (localizacion_auto == Estaticas.L_CONTINENTE) {
                // esta en el continente
                // debo saber si hay autos esperando en la cola del continente
                if (fila_anterior.cola_continente >= 1) {
                    // hay cola en continente
                    // busco el primer auto o camion que este esperando en la cola del continente
                    let cliente_a_cargar = this.buscar_auto_a_cargar_en_continente(fila_anterior);

                    // solo si hay un cliente, debo seguir el proceso
                    if (cliente_a_cargar) {
                        // una vez encontrado el cliente, debo saber que tipo de cliente es: 
                        if (cliente_a_cargar.tipo == Estaticas.T_CAMION) {
                            // es un camion
                            // debo preguntar si hay espacio en el ferry 2 para cargar el camion
                            if (fila_anterior.ferry_2.capacidad_restante >= 2) {
                                // hay espacio en el ferry 2
                                // cargar el camion
                                // si hay cola en el continente debo restarle 1
                                fila_actual.cola_continente -= 1;
                                fila_actual.ferry_2.capacidad_restante -= 2;
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del camion en el ferry 2
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                            } else {
                                // la capacidad aca tbn puede ser 1: 
                                if (fila_anterior.ferry_2.capacidad_restante == 1) {
                                    // pregunto si hay un auto esperando en la cola del continente
                                    let auto_esperando = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_CONTINENTE);
                                    if (auto_esperando) {
                                        // hay un auto esperando en la cola del continente y hay justo un espacio en el ferry 2
                                        // entonces cargo el auto
                                        fila_actual.cola_continente -= 1;
                                        fila_actual.ferry_2.capacidad_restante -= 1;
                                        fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).ferry_id = 2;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).estado = Estaticas.E_SIENDO_CARGADO;

                                        // calcular el tiempo de carga del auto en el ferry 2
                                        fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                        fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                    } else {
                                        // no hay autos esperando pero hay un espacio, asi que el ferry pasa a estar libre
                                        fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                                    }
                                }

                                // si no entra el camion, consulto si ya puedo hacer el viaje del ferry 2
                                if (fila_anterior.ferry_2.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 2 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 2
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // no hay espacio en el ferry 2
                                // entonces debo preguntar si el ferry 1 esta en el continente
                                if (fila_anterior.ferry_1.localizacion == Estaticas.L_CONTINENTE) {
                                    // entonces debo preguntar si el ferry 1 esta libre
                                    if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 1
                                        if (fila_anterior.ferry_1.capacidad_restante >= 2) {
                                            // hay espacio en el ferry 1
                                            // cargar el camion
                                            // si hay cola en el continente debo restarle 1
                                            fila_actual.cola_continente -= 1;
                                            fila_actual.ferry_1.capacidad_restante -= 2;
                                            fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del camion en el ferry 1
                                            fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                            fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                                        } else {
                                            // puede haber o un espacio, o 0 espacios
                                            if (fila_anterior.ferry_1.capacidad_restante == 1) {
                                                // hay un espacio
                                                let auto_en_cola = fila_actual.clientes.find(clte => clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_CONTINENTE && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                                                if (auto_en_cola) {
                                                    // hay un auto esperando en la cola del continente y hay justo un espacio en el ferry 1
                                                    // entonces cargo el auto
                                                    fila_actual.cola_continente -= 1;
                                                    fila_actual.ferry_1.capacidad_restante -= 1;
                                                    fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).ferry_id = 1;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).estado = Estaticas.E_SIENDO_CARGADO;

                                                    // calcular el tiempo de carga del auto en el ferry 1
                                                    fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                                    fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                                } else {
                                                    // entonces el ferry
                                                    fila_actual.ferry_1.localizacion = Estaticas.L_CONTINENTE;
                                                    fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                                                }
                                            } else {
                                                // no hay mas espacios, por ende inicio recorrido
                                                fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                                                fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                                // calcular el tiempo de llegada del ferry 1
                                                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                                fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                            }
                                        }
                                    } // si no esta libre, que no pase nada
                                } // si no esta en el continente, que no pase nada
                            }
                        } else {
                            // es un auto
                            // debo preguntar si hay espacio en el ferry 2 para cargar el auto
                            if (fila_anterior.ferry_2.capacidad_restante >= 1) {
                                // hay espacio en el ferry 2
                                // cargar el auto
                                // si hay cola en el continente debo restarle 1
                                fila_actual.cola_continente -= 1;
                                fila_actual.ferry_2.capacidad_restante -= 1;
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del auto en el ferry 2
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                            } else {
                                if (fila_anterior.ferry_2.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 2 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 2
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // no hay espacio en el ferry 2
                                // entonces debo preguntar si el ferry 1 esta en el continente
                                if (fila_anterior.ferry_1.localizacion == Estaticas.L_CONTINENTE) {
                                    // entonces debo preguntar si el ferry 1 esta libre
                                    if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 1
                                        if (fila_anterior.ferry_1.capacidad_restante >= 1) {
                                            // hay espacio en el ferry 1
                                            // cargar el auto
                                            // si hay cola en el continente debo restarle 1
                                            fila_actual.cola_continente -= 1;
                                            fila_actual.ferry_1.capacidad_restante -= 1;
                                            fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del auto en el ferry 1
                                            fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                            fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                        } // si no hay espacio tampoco en el ferry 2, que no pase nada
                                    } // si no esta libre, que no pase nada
                                }
                            }
                        }
                    }
                } else {
                    // no hay cola en continente
                    // debo saber si el ferry 2 ya completo su capacidad de carga
                    if (fila_actual.ferry_2.capacidad_restante == 0) {
                        // si ya completo su capacidad de carga, entonces el ferry 2 se va a la isla
                        fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                        fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                        fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                        fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                        // calcular el tiempo de viaje del ferry 2
                        fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                        fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                    }

                    if (fila_anterior.ferry_2.capacidad_restante != 0) {
                        fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                    }
                }
            } else {
                // esta en la isla
                // debo saber si hay autos esperando en la cola de la isla
                if (fila_anterior.cola_isla >= 1) {
                    // hay cola en isla
                    // busco el primer auto o camion que este esperando en la cola de la isla
                    let cliente_a_cargar = this.buscar_auto_a_cargar_en_isla(fila_anterior);

                    // solo si hay un cliente, debo seguir el proceso
                    if (cliente_a_cargar) {
                        // una vez encontrado el cliente, debo saber que tipo de cliente es: 
                        if (cliente_a_cargar.tipo == Estaticas.T_CAMION) {
                            // es un camion
                            // debo preguntar si hay espacio en el ferry 2 para cargar el camion
                            if (fila_anterior.ferry_2.capacidad_restante >= 2) {
                                // hay espacio en el ferry 2
                                // cargar el camion
                                // si hay cola en la isla debo restarle 1
                                fila_actual.cola_isla -= 1;
                                fila_actual.ferry_2.capacidad_restante -= 2;
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del camion en el ferry 2
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                            } else {
                                // si no hay 2 espacios es porque hay o 1 o 0, si hay 0 ya lo hicimos, pero si hay 1:
                                if (fila_anterior.ferry_2.capacidad_restante == 1) {
                                    // pregunto si hay un auto esperando en la cola de la isla
                                    let auto_esperando = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_ISLA);
                                    if (auto_esperando) {
                                        // hay un auto esperando en la cola de la isla y hay justo un espacio en el ferry 2
                                        // entonces cargo el auto
                                        fila_actual.cola_isla -= 1;
                                        fila_actual.ferry_2.capacidad_restante -= 1;
                                        fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).ferry_id = 2;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).estado = Estaticas.E_SIENDO_CARGADO;

                                        // calcular el tiempo de carga del auto en el ferry 2
                                        fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                        fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                    }
                                }

                                if (fila_anterior.ferry_2.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 2 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 2
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // no hay espacio en el ferry 2
                                // entonces debo preguntar si el ferry 1 esta en la isla
                                if (fila_anterior.ferry_2.localizacion == Estaticas.L_ISLA) {
                                    // entonces debo preguntar si el ferry 1 esta libre
                                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 1
                                        if (fila_anterior.ferry_1.capacidad_restante >= 2) {
                                            // hay espacio en el ferry 1
                                            // cargar el camion
                                            // si hay cola en la isla debo restarle 1
                                            fila_actual.cola_isla -= 1;
                                            fila_actual.ferry_1.capacidad_restante -= 2;
                                            fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del camion en el ferry 1
                                            fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                            fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                                        } else {
                                            // puede haber o 1 o 0 espacios
                                            if (fila_anterior.ferry_1.capacidad_restante == 1) {
                                                // 1 espacio
                                                let auto_en_cola = fila_actual.clientes.find(clte => clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_ISLA && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                                                if (auto_en_cola) {
                                                    // hay un auto esperando en la cola de la isla y hay justo un espacio en el ferry 1
                                                    // entonces cargo el auto}
                                                    fila_actual.cola_isla -= 1;
                                                    fila_actual.ferry_1.capacidad_restante -= 1;
                                                    fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).ferry_id = 1;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).estado = Estaticas.E_SIENDO_CARGADO;

                                                    // calcular el tiempo de carga del auto en el ferry 1
                                                    fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                                    fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                                } else {
                                                    // ferry 1 libre
                                                    fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                                                }
                                            } else {
                                                // 0 espacios
                                                // inicio recorrido
                                                fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                                                fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                                // calcular el tiempo de llegada del ferry 1
                                                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                                fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                            }
                                        }
                                    } // si no esta libre, que no pase nada
                                } // si no esta en la isla, que no pase nada
                            }
                        } else {
                            // es un auto
                            // debo preguntar si hay espacio en el ferry 2 para cargar el auto
                            if (fila_anterior.ferry_2.capacidad_restante >= 1) {
                                // hay espacio en el ferry 2
                                // cargar el auto
                                // si hay cola en la isla debo restarle 1
                                fila_actual.cola_isla -= 1;
                                fila_actual.ferry_2.capacidad_restante -= 1;
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del auto en el ferry 2
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                            } else {
                                if (fila_anterior.ferry_2.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 2 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 2
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // no hay espacio en el ferry 2
                                // entonces debo preguntar si el ferry 1 esta en la isla
                                if (fila_anterior.ferry_1.localizacion == Estaticas.L_ISLA) {
                                    // entonces debo preguntar si el ferry 1 esta libre
                                    if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 1
                                        if (fila_anterior.ferry_1.capacidad_restante >= 1) {
                                            // hay espacio en el ferry 1
                                            // cargar el auto
                                            // si hay cola en la isla debo restarle 1
                                            fila_actual.cola_isla -= 1;
                                            fila_actual.ferry_1.capacidad_restante -= 1;
                                            fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del auto en el ferry 1
                                            fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                            fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                        } // si no hay espacio tampoco en el ferry 1, que no pase nada
                                    } // si no esta libre, que no pase nada
                                } // si no esta en la isla, que no pase nada
                            }
                        }
                    }
                } else {
                    // no hay cola en isla
                    // debo saber si el ferry 2 ya completo su capacidad de carga
                    if (fila_actual.ferry_2.capacidad_restante == 0) {
                        // si ya completo su capacidad de carga, entonces el ferry 2 se va al continente
                        fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                        fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                        fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                        fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                        // calcular el tiempo de viaje del ferry 2
                        fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                        fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                    }

                    if (fila_anterior.ferry_2.capacidad_restante != 0) {
                        fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                    }
                }
            }
        }

        // agregar la fila a la lista
        this.array.push(fila_actual);
        return fila_actual;
    }

    // 6to y 7mo tipo de evento: Fin de carga de camion f1 y f2
    fin_carga_camion_f1(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;

        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.fin_carga_camion_f1;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la fin de carga de camiones en el ferry 1
        fila_actual.rnd1_fin_carga_camion = 0;
        fila_actual.rnd2_fin_carga_camion = 0;
        fila_actual.t_fin_carga_camion = 0;
        fila_actual.fin_carga_camion_f1 = 0;

        // paso 2: buscar el camion que se esta cargando en el ferry 1
        let cliente_cargado = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_SIENDO_CARGADO && clte.ferry_id == 1);
        fila_actual.tipo_evento = `Fin de carga camion en ferry 1 id: ${cliente_cargado.id}`;

        // paso 3: cambiar el estado del auto a esperando viaje
        fila_actual.clientes.find(clte => clte.id == cliente_cargado.id).estado = Estaticas.E_ESPERANDO_VIAJE;

        // paso 4: extraigo la localizacion del camion
        let localizacion_auto = cliente_cargado.localizacion;

        if (fila_actual.reloj_mins >= 780) {
            // si ya paso las 20hs, pregunto donde se cargo
            if (fila_anterior.ferry_1.localizacion == Estaticas.L_CONTINENTE) {
                // si se cargo en el continente, finalizo la actividad del dia
                fila_actual.ferry_1.estado = Estaticas.E_FIN_ACTIVIDAD_DIA;
                fila_actual.fin_act_f1 = true
            } else {
                // si termino de cargar en la isla, hago un viaje al continente
                fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                // calcular el tiempo de llegada del ferry 1
                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
            }
        } else {
            // paso 5: saber en que localizacion se encuentra el auto, por ende saber donde esta el ferry 1
            if (localizacion_auto == Estaticas.L_CONTINENTE) {
                // esta en el continente
                // debo saber si hay autos esperando en la cola del continente
                if (fila_anterior.cola_continente >= 1) {
                    // hay cola en continente
                    // busco el primer auto o camion que este esperando en la cola del continente
                    let cliente_a_cargar = this.buscar_auto_a_cargar_en_continente(fila_anterior);

                    // solo si hay un cliente, debo seguir el proceso
                    if (cliente_a_cargar) {
                        // una vez encontrado el cliente, debo saber que tipo de cliente es: 
                        if (cliente_a_cargar.tipo == Estaticas.T_CAMION) {
                            // es un camion
                            // debo preguntar si hay espacio en el ferry 1 para cargar el camion
                            if (fila_anterior.ferry_1.capacidad_restante >= 2) {
                                // hay espacio en el ferry 1
                                // cargar el camion
                                // si hay cola en el continente debo restarle 1
                                fila_actual.cola_continente -= 1;
                                fila_actual.ferry_1.capacidad_restante -= 2;
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del camion en el ferry 1
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                            } else {
                                // por aca no entra el camion, pero puede o no entrar mas nada o entrar un auto
                                if (fila_anterior.ferry_1.capacidad_restante == 1) {
                                    // pregunto si hay un auto esperando en la cola del continente
                                    let auto_esperando = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_CONTINENTE);
                                    if (auto_esperando) {
                                        // hay un auto esperando en la cola del continente y hay justo un espacio en el ferry 2
                                        // entonces cargo el auto
                                        fila_actual.cola_continente -= 1;
                                        fila_actual.ferry_1.capacidad_restante -= 1;
                                        fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).ferry_id = 1;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).estado = Estaticas.E_SIENDO_CARGADO;

                                        // calcular el tiempo de carga del auto en el ferry 1
                                        fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                        fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                    } else {
                                        // no hay autos esperando pero hay un espacio, asi que el ferry pasa a estar libre
                                        fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                                    }
                                }

                                // si no entra el camion, consulto si ya puedo hacer el viaje del ferry 1
                                if (fila_anterior.ferry_1.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 1 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 1
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // no hay espacio en el ferry 1
                                // entonces debo preguntar si el ferry 2 esta en el continente
                                if (fila_anterior.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
                                    // entonces debo preguntar si el ferry 2 esta libre
                                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 2
                                        if (fila_anterior.ferry_2.capacidad_restante >= 2) {
                                            // hay espacio en el ferry 2
                                            // cargar el camion
                                            // si hay cola en el continente debo restarle 1
                                            fila_actual.cola_continente -= 1;
                                            fila_actual.ferry_2.capacidad_restante -= 2;
                                            fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del camion en el ferry 2
                                            fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                            fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                                        } else {
                                            // puede que no entre el camion, pero puede o no entrar mas nada o entrar un auto
                                            if (fila_anterior.ferry_2.capacidad_restante == 1) {
                                                // preguntar si hay autos esperando en la cola del continente 
                                                let auto_en_cola = fila_actual.clientes.find(clte => clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_CONTINENTE && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                                                if (auto_en_cola) {
                                                    // hay autos esperando en la cola del continente
                                                    // entonces debo cargar el auto en el ferry 2
                                                    fila_actual.cola_continente -= 1;
                                                    fila_actual.ferry_2.capacidad_restante -= 1;
                                                    fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).ferry_id = 2;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).estado = Estaticas.E_SIENDO_CARGADO;

                                                    // calcular el tiempo de carga del auto en el ferry 2
                                                    fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                                    fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                                } else {
                                                    // ferry 2 no tiene espacio para camiones y no hay autos esperando
                                                    // entonces el ferry
                                                    fila_actual.ferry_2.localizacion = Estaticas.L_CONTINENTE;
                                                    fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                                                }
                                            } else {
                                                // la capacidad esta al maxmo, asi que inicia viaje
                                                fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                                                fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                                // calcular el tiempo de llegada del ferry 2
                                                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                                fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                            }
                                        }
                                    } // si no esta libre, que no pase nada
                                } // si no esta en el continente, que no pase nada
                            }
                        } else {
                            // es un auto
                            // debo preguntar si hay espacio en el ferry 1 para cargar el auto
                            if (fila_anterior.ferry_1.capacidad_restante >= 1) {
                                // hay espacio en el ferry 1
                                // cargar el auto
                                // si hay cola en el continente debo restarle 1
                                fila_actual.cola_continente -= 1;
                                fila_actual.ferry_1.capacidad_restante -= 1;
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del auto en el ferry 1
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                            } else {
                                // no hay espacio en el ferry 1
                                // si no entra el auto, consulto si ya puedo hacer el viaje del ferry 1
                                if (fila_anterior.ferry_1.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 1 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 1
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // entonces debo preguntar si el ferry 2 esta en el continente
                                if (fila_anterior.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
                                    // entonces debo preguntar si el ferry 2 esta libre
                                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 2
                                        if (fila_anterior.ferry_2.capacidad_restante >= 1) {
                                            // hay espacio en el ferry 2
                                            // cargar el auto
                                            // si hay cola en el continente debo restarle 1
                                            fila_actual.cola_continente -= 1;
                                            fila_actual.ferry_2.capacidad_restante -= 1;
                                            fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del auto en el ferry 2
                                            fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                            fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                        } else {
                                            // el espacio = 0 por ende ya puede iniciar viaje
                                            fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                                            fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                                            fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                            fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                            // calcular el tiempo de llegada del ferry 2
                                            fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                            fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                        }
                                    } // si no esta libre, que no pase nada
                                }
                            }
                        }
                    }
                } else {
                    // no hay cola en continente
                    // debo saber si el ferry 1 ya completo su capacidad de carga
                    if (fila_actual.ferry_1.capacidad_restante == 0) {
                        // si ya completo su capacidad de carga, entonces el ferry 1 se va a la isla
                        fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                        fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                        fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                        fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                        // calcular el tiempo de viaje del ferry 1
                        fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                        fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                    }

                    if (fila_anterior.ferry_1.capacidad_restante != 0) {
                        fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                    }
                }
            } else {
                // esta en la isla
                // debo saber si hay autos esperando en la cola de la isla
                if (fila_anterior.cola_isla >= 1) {
                    // hay cola en isla
                    // busco el primer auto o camion que este esperando en la cola de la isla
                    let cliente_a_cargar = this.buscar_auto_a_cargar_en_isla(fila_anterior);

                    // solo si hay un cliente, debo seguir el proceso
                    if (cliente_a_cargar) {
                        // una vez encontrado el cliente, debo saber que tipo de cliente es: 
                        if (cliente_a_cargar.tipo == Estaticas.T_CAMION) {
                            // es un camion
                            // debo preguntar si hay espacio en el ferry 1 para cargar el camion
                            if (fila_anterior.ferry_1.capacidad_restante >= 2) {
                                // hay espacio en el ferry 1
                                // cargar el camion
                                // si hay cola en la isla debo restarle 1
                                fila_actual.cola_isla -= 1;
                                fila_actual.ferry_1.capacidad_restante -= 2;
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del camion en el ferry 1
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                            } else {
                                // si no hay 2 espacios es porque hay o 1 o 0, si hay 0 ya lo hicimos, pero si hay 1:
                                if (fila_anterior.ferry_1.capacidad_restante == 1) {
                                    // pregunto si hay un auto esperando en la cola de la isla
                                    let auto_esperando = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_ISLA);
                                    if (auto_esperando) {
                                        // hay un auto esperando en la cola de la isla y hay justo un espacio en el ferry 1
                                        // entonces cargo el auto
                                        fila_actual.cola_isla -= 1;
                                        fila_actual.ferry_1.capacidad_restante -= 1;
                                        fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).ferry_id = 1;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).estado = Estaticas.E_SIENDO_CARGADO;

                                        // calcular el tiempo de carga del auto en el ferry 1
                                        fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                        fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                    }
                                }

                                // si no entra el camion, consulto si ya puedo hacer el viaje del ferry 1
                                if (fila_anterior.ferry_1.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 1 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 1
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // no hay espacio en el ferry 1
                                // entonces debo preguntar si el ferry 2 esta en la isla
                                if (fila_anterior.ferry_2.localizacion == Estaticas.L_ISLA) {
                                    // entonces debo preguntar si el ferry 2 esta libre
                                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 2
                                        if (fila_anterior.ferry_2.capacidad_restante >= 2) {
                                            // hay espacio en el ferry 2
                                            // cargar el camion
                                            // si hay cola en la isla debo restarle 1
                                            fila_actual.cola_isla -= 1;
                                            fila_actual.ferry_2.capacidad_restante -= 2;
                                            fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del camion en el ferry 2
                                            fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                            fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                                        } else {
                                            // puede haber o 1 espacio o 0 espacios
                                            if (fila_anterior.ferry_2.capacidad_restante == 1) {
                                                // hay un espacio
                                                let auto_en_cola = fila_actual.clientes.find(clte => clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_ISLA && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                                                if (auto_en_cola) {
                                                    // hay un auto esperando en la cola de la isla y hay justo un espacio en el ferry
                                                    // entonces cargo el auto
                                                    fila_actual.cola_isla -= 1;
                                                    fila_actual.ferry_2.capacidad_restante -= 1;
                                                    fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).ferry_id = 2;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).estado = Estaticas.E_SIENDO_CARGADO;

                                                    // calcular el tiempo de carga del auto en el ferry 2
                                                    fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                                    fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                                } else {
                                                    // ferry 2 libre
                                                    fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                                                }
                                            } else {
                                                // no hay mas espacios, por ende inicio recorrido
                                                fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                                                fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                                // calcular el tiempo de llegada del ferry 2
                                                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                                fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                            }
                                        }
                                    } // si no esta libre, que no pase nada
                                } // si no esta en la isla, que no pase nada
                            }
                        } else {
                            // es un auto
                            // debo preguntar si hay espacio en el ferry 1 para cargar el auto
                            if (fila_anterior.ferry_1.capacidad_restante >= 1) {
                                // hay espacio en el ferry 1
                                // cargar el auto
                                // si hay cola en la isla debo restarle 1
                                fila_actual.cola_isla -= 1;
                                fila_actual.ferry_1.capacidad_restante -= 1;
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del auto en el ferry 1
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                            } else {
                                // si no entra el camion, consulto si ya puedo hacer el viaje del ferry 1
                                if (fila_anterior.ferry_1.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 1 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 1
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // no hay espacio en el ferry 1
                                // entonces debo preguntar si el ferry 2 esta en la isla
                                if (fila_anterior.ferry_2.localizacion == Estaticas.L_ISLA) {
                                    // entonces debo preguntar si el ferry 2 esta libre
                                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 2
                                        if (fila_anterior.ferry_2.capacidad_restante >= 1) {
                                            // hay espacio en el ferry 1
                                            // cargar el auto
                                            // si hay cola en la isla debo restarle 1
                                            fila_actual.cola_isla -= 1;
                                            fila_actual.ferry_2.capacidad_restante -= 1;
                                            fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del auto en el ferry 2
                                            fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                            fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                        } // si no hay espacio tampoco en el ferry 2, que no pase nada
                                    } // si no esta libre, que no pase nada
                                } // si no esta en la isla, que no pase nada
                            }
                        }
                    }
                } else {
                    // no hay cola en isla
                    // debo saber si el ferry 1 ya completo su capacidad de carga
                    if (fila_actual.ferry_1.capacidad_restante == 0) {
                        // si ya completo su capacidad de carga, entonces el ferry 1 se va al continente
                        fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                        fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                        fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                        fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                        // calcular el tiempo de viaje del ferry 1
                        fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                        fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                    }

                    if (fila_anterior.ferry_1.capacidad_restante != 0) {
                        fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                    }
                }
            }
        }

        // agregar la fila a la lista
        this.array.push(fila_actual);
        return fila_actual;
    }

    // 6to y 7mo tipo de evento: Fin de carga de camion f1 y f2
    fin_carga_camion_f2(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;

        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.fin_carga_camion_f2;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la fin de carga de camiones en el ferry 2
        fila_actual.rnd1_fin_carga_camion = 0;
        fila_actual.rnd2_fin_carga_camion = 0;
        fila_actual.t_fin_carga_camion = 0;
        fila_actual.fin_carga_camion_f2 = 0;

        // paso 2: buscar el camion que se esta cargando en el ferry 2
        let cliente_cargado = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_SIENDO_CARGADO && clte.ferry_id == 2);
        fila_actual.tipo_evento = `Fin de carga camion en ferry 2 id: ${cliente_cargado.id}`;

        // paso 3: cambiar el estado del camion a esperando viaje
        fila_actual.clientes.find(clte => clte.id == cliente_cargado.id).estado = Estaticas.E_ESPERANDO_VIAJE;

        // paso 4: extraigo la localizacion del auto
        let localizacion_auto = cliente_cargado.localizacion;

        if (fila_actual.reloj_mins >= 780) {
            // si ya paso las 20hs, pregunto donde se cargo
            if (fila_anterior.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
                // si se cargo en el continente, finalizo la actividad del dia
                fila_actual.ferry_2.estado = Estaticas.E_FIN_ACTIVIDAD_DIA;
                fila_actual.fin_act_f2 = true
            } else {
                // si termino de cargar en la isla, hago un viaje al continente
                fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                // calcular el tiempo de llegada del ferry 2
                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
            }
        } else {
            // paso 5: saber en que localizacion se encuentra el auto, por ende saber donde esta el ferry 2
            if (localizacion_auto == Estaticas.L_CONTINENTE) {
                // esta en el continente
                // debo saber si hay autos esperando en la cola del continente
                if (fila_anterior.cola_continente >= 1) {
                    // hay cola en continente
                    // busco el primer auto o camion que este esperando en la cola del continente
                    let cliente_a_cargar = this.buscar_auto_a_cargar_en_continente(fila_anterior);

                    // solo si hay un cliente, debo seguir el proceso
                    if (cliente_a_cargar) {
                        // una vez encontrado el cliente, debo saber que tipo de cliente es: 
                        if (cliente_a_cargar.tipo == Estaticas.T_CAMION) {
                            // es un camion
                            // debo preguntar si hay espacio en el ferry 2 para cargar el camion
                            if (fila_anterior.ferry_2.capacidad_restante >= 2) {
                                // hay espacio en el ferry 2
                                // cargar el camion
                                // si hay cola en el continente debo restarle 1
                                fila_actual.cola_continente -= 1;
                                fila_actual.ferry_2.capacidad_restante -= 2;
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del camion en el ferry 2
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                            } else {
                                // la capacidad aca tbn puede ser 1: 
                                if (fila_anterior.ferry_2.capacidad_restante == 1) {
                                    // pregunto si hay un auto esperando en la cola del continente
                                    let auto_esperando = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_CONTINENTE);
                                    if (auto_esperando) {
                                        // hay un auto esperando en la cola del continente y hay justo un espacio en el ferry 2
                                        // entonces cargo el auto
                                        fila_actual.cola_continente -= 1;
                                        fila_actual.ferry_2.capacidad_restante -= 1;
                                        fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).ferry_id = 2;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).estado = Estaticas.E_SIENDO_CARGADO;

                                        // calcular el tiempo de carga del auto en el ferry 2
                                        fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                        fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                    } else {
                                        // no hay autos esperando pero hay un espacio, asi que el ferry pasa a estar libre
                                        fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                                    }
                                }

                                // si no entra el camion, consulto si ya puedo hacer el viaje del ferry 2
                                if (fila_anterior.ferry_2.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 2 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 2
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // no hay espacio en el ferry 2
                                // entonces debo preguntar si el ferry 1 esta en el continente
                                if (fila_anterior.ferry_1.localizacion == Estaticas.L_CONTINENTE) {
                                    // entonces debo preguntar si el ferry 1 esta libre
                                    if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 1
                                        if (fila_anterior.ferry_1.capacidad_restante >= 2) {
                                            // hay espacio en el ferry 1
                                            // cargar el camion
                                            // si hay cola en el continente debo restarle 1
                                            fila_actual.cola_continente -= 1;
                                            fila_actual.ferry_1.capacidad_restante -= 2;
                                            fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del camion en el ferry 1
                                            fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                            fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                                        } else {
                                            // puede haber o un espacio, o 0 espacios
                                            if (fila_anterior.ferry_1.capacidad_restante == 1) {
                                                // hay un espacio
                                                let auto_en_cola = fila_actual.clientes.find(clte => clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_CONTINENTE && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                                                if (auto_en_cola) {
                                                    // hay un auto esperando en la cola del continente y hay justo un espacio en el ferry 1
                                                    // entonces cargo el auto
                                                    fila_actual.cola_continente -= 1;
                                                    fila_actual.ferry_1.capacidad_restante -= 1;
                                                    fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).ferry_id = 1;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).estado = Estaticas.E_SIENDO_CARGADO;

                                                    // calcular el tiempo de carga del auto en el ferry 1
                                                    fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                                    fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                                } else {
                                                    // no hay mas espacios, por ende inicio recorrido
                                                    fila_actual.ferry_1.localizacion = Estaticas.L_CONTINENTE;
                                                    fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                                                }
                                            } else {
                                                // no hay mas espacios, por ende inicio recorrido
                                                fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                                                fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                                // calcular el tiempo de llegada del ferry 1
                                                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                                fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                            }
                                        }
                                    } // si no esta libre, que no pase nada
                                } // si no esta en el continente, que no pase nada
                            }
                        } else {
                            // es un auto
                            // debo preguntar si hay espacio en el ferry 2 para cargar el auto
                            if (fila_anterior.ferry_2.capacidad_restante >= 1) {
                                // hay espacio en el ferry 2
                                // cargar el auto
                                // si hay cola en el continente debo restarle 1
                                fila_actual.cola_continente -= 1;
                                fila_actual.ferry_2.capacidad_restante -= 1;
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del auto en el ferry 2
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                            } else {
                                if (fila_anterior.ferry_2.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 2 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 2
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // no hay espacio en el ferry 2
                                // entonces debo preguntar si el ferry 1 esta en el continente
                                if (fila_anterior.ferry_1.localizacion == Estaticas.L_CONTINENTE) {
                                    // entonces debo preguntar si el ferry 1 esta libre
                                    if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 1
                                        if (fila_anterior.ferry_1.capacidad_restante >= 1) {
                                            // hay espacio en el ferry 1
                                            // cargar el auto
                                            // si hay cola en el continente debo restarle 1
                                            fila_actual.cola_continente -= 1;
                                            fila_actual.ferry_1.capacidad_restante -= 1;
                                            fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del auto en el ferry 1
                                            fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                            fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                        } else {
                                            // el espacio = 0 por ende ya puede iniciar viaje
                                            fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                                            fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                                            fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                            fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                            // calcular el tiempo de llegada del ferry 1
                                            fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                            fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                        }
                                    } // si no esta libre, que no pase nada
                                }
                            }
                        }
                    }
                } else {
                    // no hay cola en continente
                    // debo saber si el ferry 2 ya completo su capacidad de carga
                    if (fila_actual.ferry_2.capacidad_restante == 0) {
                        // si ya completo su capacidad de carga, entonces el ferry 2 se va a la isla
                        fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                        fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                        fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                        fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                        // calcular el tiempo de viaje del ferry 2
                        fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                        fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                    }

                    if (fila_anterior.ferry_2.capacidad_restante != 0) {
                        fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                    }
                }
            } else {
                // esta en la isla
                // debo saber si hay autos esperando en la cola de la isla
                if (fila_anterior.cola_isla >= 1) {
                    // hay cola en isla
                    // busco el primer auto o camion que este esperando en la cola de la isla
                    let cliente_a_cargar = this.buscar_auto_a_cargar_en_isla(fila_anterior);

                    // solo si hay un cliente, debo seguir el proceso
                    if (cliente_a_cargar) {
                        // una vez encontrado el cliente, debo saber que tipo de cliente es: 
                        if (cliente_a_cargar.tipo == Estaticas.T_CAMION) {
                            // es un camion
                            // debo preguntar si hay espacio en el ferry 2 para cargar el camion
                            if (fila_anterior.ferry_2.capacidad_restante >= 2) {
                                // hay espacio en el ferry 2
                                // cargar el camion
                                // si hay cola en la isla debo restarle 1
                                fila_actual.cola_isla -= 1;
                                fila_actual.ferry_2.capacidad_restante -= 2;
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del camion en el ferry 2
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                            } else {
                                // si no hay 2 espacios es porque hay o 1 o 0, si hay 0 ya lo hicimos, pero si hay 1:
                                if (fila_anterior.ferry_2.capacidad_restante == 1) {
                                    // pregunto si hay un auto esperando en la cola de la isla
                                    let auto_esperando = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_ISLA);
                                    if (auto_esperando) {
                                        // hay un auto esperando en la cola de la isla y hay justo un espacio en el ferry 2
                                        // entonces cargo el auto
                                        fila_actual.cola_isla -= 1;
                                        fila_actual.ferry_2.capacidad_restante -= 1;
                                        fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).ferry_id = 2;
                                        fila_actual.clientes.find(clte => clte.id == auto_esperando.id).estado = Estaticas.E_SIENDO_CARGADO;

                                        // calcular el tiempo de carga del auto en el ferry 2
                                        fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                        fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                        fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                    }
                                }

                                if (fila_anterior.ferry_2.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 2 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 2
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // no hay espacio en el ferry 2
                                // entonces debo preguntar si el ferry 1 esta en la isla
                                if (fila_anterior.ferry_2.localizacion == Estaticas.L_ISLA) {
                                    // entonces debo preguntar si el ferry 1 esta libre
                                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 1
                                        if (fila_anterior.ferry_1.capacidad_restante >= 2) {
                                            // hay espacio en el ferry 1
                                            // cargar el camion
                                            // si hay cola en la isla debo restarle 1
                                            fila_actual.cola_isla -= 1;
                                            fila_actual.ferry_1.capacidad_restante -= 2;
                                            fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del camion en el ferry 1
                                            fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                            fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                                        } else {
                                            // puede haber o 1 o 0 espacios
                                            if (fila_anterior.ferry_1.capacidad_restante == 1) {
                                                // 1 espacio
                                                let auto_en_cola = fila_actual.clientes.find(clte => clte.tipo == Estaticas.T_AUTO && clte.localizacion == Estaticas.L_ISLA && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                                                if (auto_en_cola) {
                                                    // hay un auto esperando en la cola de la isla y hay justo un espacio en el ferry 1
                                                    // entonces cargo el auto
                                                    fila_actual.cola_isla -= 1;
                                                    fila_actual.ferry_1.capacidad_restante -= 1;
                                                    fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).ferry_id = 1;
                                                    fila_actual.clientes.find(clte => clte.id == auto_en_cola.id).estado = Estaticas.E_SIENDO_CARGADO;

                                                    // calcular el tiempo de carga del auto en el ferry 1
                                                    fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                                    fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                                    fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                                } else {
                                                    // ferry 1 libre
                                                    fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                                                }
                                            } else {
                                                // 0 espacios
                                                // inicio recorrido
                                                fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                                                fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                                // calcular el tiempo de llegada del ferry 1
                                                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                                fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                            }
                                        }
                                    } // si no esta libre, que no pase nada
                                } // si no esta en la isla, que no pase nada
                            }
                        } else {
                            // es un auto
                            // debo preguntar si hay espacio en el ferry 2 para cargar el auto
                            if (fila_anterior.ferry_2.capacidad_restante >= 1) {
                                // hay espacio en el ferry 2
                                // cargar el auto
                                // si hay cola en la isla debo restarle 1
                                fila_actual.cola_isla -= 1;
                                fila_actual.ferry_2.capacidad_restante -= 1;
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 2;
                                fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                // calcular el tiempo de carga del auto en el ferry 2
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                            } else {
                                if (fila_anterior.ferry_2.capacidad_restante == 0) {
                                    // como ya no entran mas autos, y el ferry 2 termino de cargar ese auto, entonces el ferry 1 puede hacer el viaje
                                    fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                                    fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                                    fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                                    // calcular el tiempo de llegada del ferry 2
                                    fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                                    fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                                    fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                                }

                                // no hay espacio en el ferry 2
                                // entonces debo preguntar si el ferry 1 esta en la isla
                                if (fila_anterior.ferry_1.localizacion == Estaticas.L_ISLA) {
                                    // entonces debo preguntar si el ferry 1 esta libre
                                    if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE) {
                                        // esta libre
                                        // debo preguntar si hay espacio en el ferry 1
                                        if (fila_anterior.ferry_1.capacidad_restante >= 1) {
                                            // hay espacio en el ferry 1
                                            // cargar el auto
                                            fila_actual.cola_isla -= 1;
                                            fila_actual.ferry_1.capacidad_restante -= 1;
                                            fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).ferry_id = 1;
                                            fila_actual.clientes.find(clte => clte.id == cliente_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;

                                            // calcular el tiempo de carga del auto en el ferry 1
                                            fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                            fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                            fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                                        } // si no hay espacio tampoco en el ferry 1, que no pase nada
                                    } // si no esta libre, que no pase nada
                                } // si no esta en la isla, que no pase nada
                            }
                        }
                    }
                } else {
                    // no hay cola en isla
                    // debo saber si el ferry 2 ya completo su capacidad de carga
                    if (fila_actual.ferry_2.capacidad_restante == 0) {
                        // si ya completo su capacidad de carga, entonces el ferry 2 se va al continente
                        fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                        fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                        fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.localizacion = Estaticas.L_OCEANO });
                        fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => { clte.estado = Estaticas.E_VIAJANDO_FERRY });

                        // calcular el tiempo de viaje del ferry 2
                        fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                        fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                    }

                    if (fila_anterior.ferry_2.capacidad_restante != 0) {
                        fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                    }
                }
            }
        }

        // agregar la fila a la lista
        this.array.push(fila_actual);
        return fila_actual;
    }

    // 8vo y 9no tipo de evento: Fin de recorrido para los 2 ferrys
    fin_recorrido_f1(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;
        fila_actual.tipo_evento = `Fin de recorrido para ferry 1 `;
        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.fin_recorrido_ferry_1;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la fin de recorrido del ferry 1
        fila_actual.rnd1_fin_recorrido = 0;
        fila_actual.rnd2_fin_recorrido = 0;
        fila_actual.t_fin_recorrido = 0;
        fila_actual.fin_recorrido_ferry_1 = 0;

        // es porque el ferry 1 llego al continente a mas de las 8 de la noche y vacio
        if (fila_actual.ferry_1.capacidad_restante == 10 && fila_actual.reloj_mins >= 780 && fila_actual.ferry_1.ult_loc_tierra == Estaticas.L_ISLA) {

            // seteo que esta en el continente y que esta en estado de fin de actividad del dia
            fila_actual.ferry_1.localizacion = Estaticas.L_CONTINENTE;
            fila_actual.ferry_1.ult_loc_tierra = Estaticas.L_CONTINENTE;
            fila_actual.ferry_1.estado = Estaticas.E_FIN_ACTIVIDAD_DIA;
            fila_actual.fin_act_f1 = true

        } else {
            // paso 2: saber la ultima localizacion terrestre del ferry 1
            if (fila_anterior.ferry_1.ult_loc_tierra == Estaticas.L_CONTINENTE) {
                // Partio de continente a isla

                // setear la localizacion del ferry 1 en la isla
                fila_actual.ferry_1.localizacion = Estaticas.L_ISLA;
                fila_actual.ferry_1.ult_loc_tierra = Estaticas.L_ISLA;
                fila_actual.ferry_1.estado = Estaticas.E_DESCARGANDO;

                // a todos esos clientes, en la fila actual, setearles el estado de ESPERANDO_DESCARGA en la isla
                fila_actual.clientes.forEach(clte => {
                    if (clte.ferry_id == 1 && clte.estado == Estaticas.E_VIAJANDO_FERRY) {
                        clte.estado = Estaticas.E_ESPERANDO_DESCARGA;
                        clte.localizacion = Estaticas.L_ISLA;
                    }
                })

                // al primero de esos clientes, setearle el estado de SIENDO DESCARGADO
                fila_actual.clientes.find(clte => clte.ferry_id == 1 && clte.estado == Estaticas.E_ESPERANDO_DESCARGA).estado = Estaticas.E_SIENDO_DESCARGADO;

                // una vez obtenido el cliente a descargar, debo saber si es un auto o un camion
                let cliente_a_descargar = fila_actual.clientes.find(clte => clte.ferry_id == 1 && clte.estado == Estaticas.E_SIENDO_DESCARGADO);

                if (cliente_a_descargar.tipo == Estaticas.T_CAMION) {
                    // es camion

                    // calcular el tiempo de descarga del camion en la isla (ferry 1)
                    fila_actual.rnd1_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                    fila_actual.rnd2_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                    fila_actual.t_fin_descarga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_camion, SParametros.getInstance().desviacion_descarga_camion, fila_actual.rnd1_fin_descarga_camion, fila_actual.rnd2_fin_descarga_camion);
                    fila_actual.fin_descarga_camion_f1 = fila_actual.t_fin_descarga_camion + fila_actual.reloj_mins;

                    // incrementar la capacidad del ferry 1 en 2
                    fila_actual.ferry_1.capacidad_restante = fila_anterior.ferry_1.capacidad_restante + 2;
                } else {
                    // es auto
                    // calcular el tiempo de descarga del auto en la isla (ferry 1)
                    fila_actual.rnd1_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                    fila_actual.rnd2_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                    fila_actual.t_fin_descarga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_auto, SParametros.getInstance().desviacion_descarga_auto, fila_actual.rnd1_fin_descarga_auto, fila_actual.rnd2_fin_descarga_auto);
                    fila_actual.fin_descarga_auto_f1 = fila_actual.t_fin_descarga_auto + fila_actual.reloj_mins;

                    // incrementar la capacidad del ferry 1 en 1
                    fila_actual.ferry_1.capacidad_restante = fila_anterior.ferry_1.capacidad_restante + 1;
                }
            } else {
                // Partio de isla a continente

                // setear la localizacion del ferry 1 en el continente
                fila_actual.ferry_1.localizacion = Estaticas.L_CONTINENTE;
                fila_actual.ferry_1.ult_loc_tierra = Estaticas.L_CONTINENTE;
                fila_actual.ferry_1.estado = Estaticas.E_DESCARGANDO;

                // buscar todos los clientes de la fila anterior que esten viajando en el ferry 1
                // a todos esos clientes, en la fila actual, setearles el estado de ESPERANDO_DESCARGA
                fila_actual.clientes.forEach(clte => {
                    if (clte.ferry_id == 1 && clte.estado == Estaticas.E_VIAJANDO_FERRY) {
                        clte.estado = Estaticas.E_ESPERANDO_DESCARGA;
                        clte.localizacion = Estaticas.L_CONTINENTE;
                    }
                })

                // al primero de esos clientes, setearle el estado de SIENDO DESCARGADO
                fila_actual.clientes.find(clte => clte.ferry_id == 1 && clte.estado == Estaticas.E_ESPERANDO_DESCARGA).estado = Estaticas.E_SIENDO_DESCARGADO;

                // una vez obtenido el cliente a descargar, debo saber si es un auto o un camion
                let cliente_a_descargar = fila_actual.clientes.find(clte => clte.ferry_id == 1 && clte.estado == Estaticas.E_SIENDO_DESCARGADO);

                if (cliente_a_descargar.tipo == Estaticas.T_CAMION) {
                    // es camion

                    // calcular el tiempo de descarga del camion en la isla (ferry 1)
                    fila_actual.rnd1_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                    fila_actual.rnd2_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                    fila_actual.t_fin_descarga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_camion, SParametros.getInstance().desviacion_descarga_camion, fila_actual.rnd1_fin_descarga_camion, fila_actual.rnd2_fin_descarga_camion);
                    fila_actual.fin_descarga_camion_f1 = fila_actual.t_fin_descarga_camion + fila_actual.reloj_mins;

                    // incrementar la capacidad del ferry 1 en 2
                    fila_actual.ferry_1.capacidad_restante = fila_anterior.ferry_1.capacidad_restante + 2;
                } else {
                    // es auto
                    // calcular el tiempo de descarga del auto en la isla (ferry 1)
                    fila_actual.rnd1_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                    fila_actual.rnd2_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                    fila_actual.t_fin_descarga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_auto, SParametros.getInstance().desviacion_descarga_auto, fila_actual.rnd1_fin_descarga_auto, fila_actual.rnd2_fin_descarga_auto);
                    fila_actual.fin_descarga_auto_f1 = fila_actual.t_fin_descarga_auto + fila_actual.reloj_mins;

                    // incrementar la capacidad del ferry 1 en 1
                    fila_actual.ferry_1.capacidad_restante = fila_anterior.ferry_1.capacidad_restante + 1;
                }
            }
        }


        // agregar la fila a la lista
        this.array.push(fila_actual);
        return fila_actual;
    }

    // 8vo y 9no tipo de evento: Fin de recorrido para los 2 ferrys
    fin_recorrido_f2(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;
        fila_actual.tipo_evento = `Fin de recorrido para ferry 2 `;
        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.fin_recorrido_ferry_2;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la fin de recorrido del ferry 2
        fila_actual.rnd1_fin_recorrido = 0;
        fila_actual.rnd2_fin_recorrido = 0;
        fila_actual.t_fin_recorrido = 0;
        fila_actual.fin_recorrido_ferry_2 = 0;

        // es por que el ferry 2 llego al continente a mas de las 8 de la noche y vacio
        if (fila_actual.ferry_2.capacidad_restante == 20 && fila_actual.reloj_mins >= 780 && fila_actual.ferry_2.ult_loc_tierra == Estaticas.L_ISLA) {
            // seteo que esta en el continente y que esta en estado de fin de actividad del dia
            fila_actual.ferry_2.localizacion = Estaticas.L_CONTINENTE;
            fila_actual.ferry_2.estado = Estaticas.E_FIN_ACTIVIDAD_DIA;
            fila_actual.ferry_2.ult_loc_tierra = Estaticas.L_CONTINENTE;
            fila_actual.fin_act_f2 = true
        } else {
            // paso 2: saber la ultima localizacion terrestre del ferry 2
            if (fila_anterior.ferry_2.ult_loc_tierra == Estaticas.L_CONTINENTE) {
                // Partio de continente a isla

                // setear la localizacion del ferry 2 en la isla
                fila_actual.ferry_2.localizacion = Estaticas.L_ISLA;
                fila_actual.ferry_2.ult_loc_tierra = Estaticas.L_ISLA;
                fila_actual.ferry_2.estado = Estaticas.E_DESCARGANDO;

                // a todos esos clientes, en la fila actual, setearles el estado de ESPERANDO_DESCARGA
                fila_actual.clientes.forEach(clte => {
                    if (clte.ferry_id == 2 && clte.estado == Estaticas.E_VIAJANDO_FERRY) {
                        clte.estado = Estaticas.E_ESPERANDO_DESCARGA;
                        clte.localizacion = Estaticas.L_ISLA;
                    }
                })

                // al primero de esos clientes, setearle el estado de SIENDO DESCARGADO
                fila_actual.clientes.find(clte => clte.ferry_id == 2 && clte.estado == Estaticas.E_ESPERANDO_DESCARGA).estado = Estaticas.E_SIENDO_DESCARGADO;

                // una vez obtenido el cliente a descargar, debo saber si es un auto o un camion
                let cliente_a_descargar = fila_actual.clientes.find(clte => clte.ferry_id == 2 && clte.estado == Estaticas.E_SIENDO_DESCARGADO);

                if (cliente_a_descargar.tipo == Estaticas.T_CAMION) {
                    // es camion

                    // calcular el tiempo de descarga del camion en la isla (ferry 2)
                    fila_actual.rnd1_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                    fila_actual.rnd2_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                    fila_actual.t_fin_descarga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_camion, SParametros.getInstance().desviacion_descarga_camion, fila_actual.rnd1_fin_descarga_camion, fila_actual.rnd2_fin_descarga_camion);
                    fila_actual.fin_descarga_camion_f2 = fila_actual.t_fin_descarga_camion + fila_actual.reloj_mins;

                    // incrementar la capacidad del ferry 2 en 2
                    fila_actual.ferry_2.capacidad_restante = fila_anterior.ferry_2.capacidad_restante + 2;
                } else {
                    // es auto
                    // calcular el tiempo de descarga del auto en la isla (ferry 2)
                    fila_actual.rnd1_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                    fila_actual.rnd2_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                    fila_actual.t_fin_descarga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_auto, SParametros.getInstance().desviacion_descarga_auto, fila_actual.rnd1_fin_descarga_auto, fila_actual.rnd2_fin_descarga_auto);
                    fila_actual.fin_descarga_auto_f2 = fila_actual.t_fin_descarga_auto + fila_actual.reloj_mins;

                    // incrementar la capacidad del ferry 2 en 1
                    fila_actual.ferry_2.capacidad_restante = fila_anterior.ferry_2.capacidad_restante + 1;
                }
            } else {
                // Partio de isla a continente

                // setear la localizacion del ferry 2 en el continente
                fila_actual.ferry_2.localizacion = Estaticas.L_CONTINENTE;
                fila_actual.ferry_2.ult_loc_tierra = Estaticas.L_CONTINENTE;
                fila_actual.ferry_2.estado = Estaticas.E_DESCARGANDO;

                // a todos esos clientes, en la fila actual, setearles el estado de ESPERANDO_DESCARGA
                fila_actual.clientes.forEach(clte => {
                    if (clte.ferry_id == 2 && clte.estado == Estaticas.E_VIAJANDO_FERRY) {
                        clte.estado = Estaticas.E_ESPERANDO_DESCARGA;
                        clte.localizacion = Estaticas.L_CONTINENTE;
                    }
                })

                // al primero de esos clientes, setearle el estado de SIENDO DESCARGADO
                fila_actual.clientes.find(clte => clte.ferry_id == 2 && clte.estado == Estaticas.E_ESPERANDO_DESCARGA).estado = Estaticas.E_SIENDO_DESCARGADO;

                // una vez obtenido el cliente a descargar, debo saber si es un auto o un camion
                let cliente_a_descargar = fila_actual.clientes.find(clte => clte.ferry_id == 2 && clte.estado == Estaticas.E_SIENDO_DESCARGADO);

                if (cliente_a_descargar.tipo == Estaticas.T_CAMION) {
                    // es camion

                    // calcular el tiempo de descarga del camion en la isla (ferry 2)
                    fila_actual.rnd1_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                    fila_actual.rnd2_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                    fila_actual.t_fin_descarga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_camion, SParametros.getInstance().desviacion_descarga_camion, fila_actual.rnd1_fin_descarga_camion, fila_actual.rnd2_fin_descarga_camion);
                    fila_actual.fin_descarga_camion_f2 = fila_actual.t_fin_descarga_camion + fila_actual.reloj_mins;

                    // incrementar la capacidad del ferry 2 en 2
                    fila_actual.ferry_2.capacidad_restante = fila_anterior.ferry_2.capacidad_restante + 2;
                } else {
                    // es auto
                    // calcular el tiempo de descarga del auto en la isla (ferry 2)
                    fila_actual.rnd1_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                    fila_actual.rnd2_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                    fila_actual.t_fin_descarga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_auto, SParametros.getInstance().desviacion_descarga_auto, fila_actual.rnd1_fin_descarga_auto, fila_actual.rnd2_fin_descarga_auto);
                    fila_actual.fin_descarga_auto_f2 = fila_actual.t_fin_descarga_auto + fila_actual.reloj_mins;

                    // incrementar la capacidad del ferry 2 en 1
                    fila_actual.ferry_2.capacidad_restante = fila_anterior.ferry_2.capacidad_restante + 1;
                }
            }
        }

        // agregar la fila a la lista
        this.array.push(fila_actual);
        return fila_actual;
    }

    // 10mo y 11vo tipo de evento: Fin de descarga de auto f1 y f2
    fin_descarga_auto_ferry1(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;

        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.fin_descarga_auto_f1;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la fin de descarga de auto en el ferry 1
        fila_actual.rnd1_fin_descarga_auto = 0;
        fila_actual.rnd2_fin_descarga_auto = 0;
        fila_actual.t_fin_descarga_auto = 0;
        fila_actual.fin_descarga_auto_f1 = 0;

        // paso 2: buscar el auto que se esta descargando
        let auto_descargando = fila_actual.clientes.find(clte => clte.ferry_id == 1 && clte.estado == Estaticas.E_SIENDO_DESCARGADO);
        fila_actual.tipo_evento = `Fin de descarga de auto en ferry 1 id: ${auto_descargando.id}`;
        // paso 3: extraer el tipo de auto y la localizacion destino del auto
        if (auto_descargando) {
            let tipo_auto = auto_descargando.tipo;
            let loc_actual = auto_descargando.destino; // donde se encuentra actualmente el auto y el ferry 1

            // paso 4: En funcion del tipo de auto, actualizar la estadistica
            if (tipo_auto == Estaticas.T_CAMION) {
                // es camion
                if (loc_actual == Estaticas.L_ISLA) {
                    // descargado en la isla
                    fila_actual.acum_camiones_cont += 1;
                    fila_actual.promedio_camiones_cont = fila_actual.acum_camiones_cont / fila_actual.reloj_dias;
                } else {
                    // descargado en el continente
                    fila_actual.acum_camiones_isla += 1;
                    fila_actual.promedio_camiones_isla = fila_actual.acum_camiones_isla / fila_actual.reloj_dias;
                }
            } else {
                // es auto
                if (loc_actual == Estaticas.L_ISLA) {
                    // descargado en la isla
                    fila_actual.acum_autos_cont += 1;
                    fila_actual.promedio_autos_cont = fila_actual.acum_autos_cont / fila_actual.reloj_dias;
                } else {
                    // descargado en el continente
                    fila_actual.acum_autos_isla += 1;
                    fila_actual.promedio_autos_isla = fila_actual.acum_autos_isla / fila_actual.reloj_dias;
                }
            }

            // paso 5: Borrar el auto de la lista de clientes de la fila actual
            fila_actual.clientes = fila_actual.clientes.filter(clte => clte.id != auto_descargando.id);

            // paso 6: Una vez descargado el auto, tenemos que saber si ese auto era el ultimo en ser descargado
            if (fila_anterior.ferry_1.capacidad_restante == 10) {
                // era el ultimo auto en ser descargado

                // tengo que preguntar si ya se debe detener el funcionamiento del dia del ferry 1
                if (fila_actual.reloj_mins >= 780) {
                    // se debe detener el funcionamiento del dia del ferry 1
                    // debo preguntar donde esta el ferry 1
                    if (fila_actual.ferry_1.localizacion == Estaticas.L_ISLA) {
                        // el ferry 1 esta en la isla
                        // hacer que el ferry 1 se vaya al continente vacio
                        fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                        fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;

                        // calcular el tiempo de llegada del ferry 1 al continente
                        fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                        fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                    } else {
                        // el ferry 1 esta en el continente
                        // finalizar el dia del ferry 1
                        fila_actual.ferry_1.estado = Estaticas.E_FIN_ACTIVIDAD_DIA;
                        fila_actual.fin_act_f1 = true
                    }
                } else {
                    // no se debe detener el funcionamiento del dia del ferry 1
                    // pero debo saber donde esta el ferry 1
                    if (fila_actual.ferry_1.localizacion == Estaticas.L_CONTINENTE) {
                        // el ferry 1 esta en el continente
                        // debo preguntar si hay autos esperando en el continente
                        if (fila_anterior.cola_continente >= 1) {
                            // hay autos esperando en el continente
                            // busco el primer auto o camion que este esperando en el continente
                            let auto_a_cargar = fila_actual.clientes.find(clte => clte.localizacion == Estaticas.L_CONTINENTE && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                            // en funcion del tipo de auto, calculo el tiempo de carga
                            if (auto_a_cargar.tipo == Estaticas.T_CAMION) {
                                // es camion
                                // calcular el tiempo de carga del camion en el ferry 1
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                // decrementar la cola del continente en 1 porque es un camion
                                fila_actual.cola_continente -= 1;

                                // decrementar la capacidad del ferry 1 en 2
                                fila_actual.ferry_1.capacidad_restante -= 2;

                                // setear el estado del ferry 1 a CARGANDO
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                            } else {
                                // es auto
                                // calcular el tiempo de carga del auto en el ferry 1
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                // decrementar la cola del continente en 1 porque es un auto
                                fila_actual.cola_continente -= 1;

                                // decrementar la capacidad del ferry 1 en 1
                                fila_actual.ferry_1.capacidad_restante -= 1;

                                // setear el estado del ferry 1 a CARGANDO
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                            }
                        } else {
                            // no hay nadie esperando en el continente y son menos de las 8 de la noche
                            // entonces el ferry 1 queda libre para hacer otro viaje
                            fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                        }
                    } else {
                        // el ferry 1 esta en la isla
                        // debo preguntar si hay autos esperando en la isla
                        if (fila_anterior.cola_isla >= 1) {
                            // hay autos esperando en la isla
                            // busco el primer auto o camion que este esperando en la isla
                            let auto_a_cargar = fila_actual.clientes.find(clte => clte.localizacion == Estaticas.L_ISLA && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                            // en funcion del tipo de auto, calculo el tiempo de carga
                            if (auto_a_cargar.tipo == Estaticas.T_CAMION) {
                                // es camion
                                // calcular el tiempo de carga del camion en el ferry 1
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                // decrementar la cola de la isla en 1 porque es un camion
                                fila_actual.cola_isla -= 1;

                                // decrementar la capacidad del ferry 1 en 2
                                fila_actual.ferry_1.capacidad_restante -= 2;

                                // setear el estado del ferry 1 a CARGANDO
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                            } else {
                                // es auto
                                // calcular el tiempo de carga del auto en el ferry 1
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                // decrementar la cola del continente en 1 porque es un auto
                                fila_actual.cola_isla -= 1;

                                // decrementar la capacidad del ferry 1 en 1
                                fila_actual.ferry_1.capacidad_restante -= 1;

                                // setear el estado del ferry 1 a CARGANDO
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                            }
                        } else {
                            // no hay nadie esperando en el continente y son menos de las 8 de la noche
                            // entonces el ferry 1 queda libre para hacer otro viaje
                            fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                        }
                    }
                }
            } else {
                // no era el ultimo auto en ser descargado
                // buscar el siguiente auto a ser descargado
                let siguiente_auto_a_descargar = fila_actual.clientes.find(clte => clte.ferry_id == 1 && clte.estado == Estaticas.E_ESPERANDO_DESCARGA);
                if (siguiente_auto_a_descargar) {
                    // tengo que preguntar su tipo para saber cuanto tiempo tardara en ser descargado
                    if (siguiente_auto_a_descargar.tipo == Estaticas.T_CAMION) {
                        // es un camion
                        // calcular el tiempo de descarga del camion (ferry 1)
                        fila_actual.rnd1_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_descarga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_camion, SParametros.getInstance().desviacion_descarga_camion, fila_actual.rnd1_fin_descarga_camion, fila_actual.rnd2_fin_descarga_camion);
                        fila_actual.fin_descarga_camion_f1 = fila_actual.t_fin_descarga_camion + fila_actual.reloj_mins;

                        // cambiar el estado del cliente a SIENDO DESCARGADO
                        fila_actual.clientes.find(clte => clte.id == siguiente_auto_a_descargar.id).estado = Estaticas.E_SIENDO_DESCARGADO;

                        // incrementar la capacidad del ferry 1 en 2
                        fila_actual.ferry_1.capacidad_restante = fila_anterior.ferry_1.capacidad_restante + 2;

                        // setear el estado del ferry 1 a DESCARGANDO
                        fila_actual.ferry_1.estado = Estaticas.E_DESCARGANDO;
                    } else {
                        // es un auto
                        // calcular el tiempo de descarga del auto
                        fila_actual.rnd1_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_descarga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_auto, SParametros.getInstance().desviacion_descarga_auto, fila_actual.rnd1_fin_descarga_auto, fila_actual.rnd2_fin_descarga_auto);
                        fila_actual.fin_descarga_auto_f1 = fila_actual.t_fin_descarga_auto + fila_actual.reloj_mins;

                        // cambiar el estado del cliente a SIENDO DESCARGADO
                        fila_actual.clientes.find(clte => clte.id == siguiente_auto_a_descargar.id).estado = Estaticas.E_SIENDO_DESCARGADO;

                        // incrementar la capacidad del ferry 1 en 1
                        fila_actual.ferry_1.capacidad_restante = fila_anterior.ferry_1.capacidad_restante + 1;

                        // setear el estado del ferry 1 a DESCARGANDO
                        fila_actual.ferry_1.estado = Estaticas.E_DESCARGANDO;
                    }
                }
            }
        }

        // agregar la fila a la lista
        this.array.push(fila_actual);
        return fila_actual;
    }

    fin_descarga_auto_ferry2(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;

        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.fin_descarga_auto_f2;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la fin de descarga de auto en el ferry 2
        fila_actual.rnd1_fin_descarga_auto = 0;
        fila_actual.rnd2_fin_descarga_auto = 0;
        fila_actual.t_fin_descarga_auto = 0;
        fila_actual.fin_descarga_auto_f2 = 0;

        // paso 2: buscar el auto que se esta descargando
        let auto_descargando = fila_actual.clientes.find(clte => clte.ferry_id == 2 && clte.estado == Estaticas.E_SIENDO_DESCARGADO);
        fila_actual.tipo_evento = `Fin de descarga de auto en ferry 2 id: ${auto_descargando.id}`;

        // paso 3: extraer el tipo de auto y la localizacion destino del auto
        if (auto_descargando) {
            let tipo_auto = auto_descargando.tipo;
            let loc_actual = auto_descargando.destino; // donde se encuentra actualmente el auto y el ferry 2

            // paso 4: En funcion del tipo de auto, actualizar la estadistica
            if (tipo_auto == Estaticas.T_CAMION) {
                // es camion
                if (loc_actual == Estaticas.L_ISLA) {
                    // descargado en la isla
                    fila_actual.acum_camiones_cont += 1;
                    fila_actual.promedio_camiones_cont = fila_actual.acum_camiones_cont / fila_actual.reloj_dias;
                } else {
                    // descargado en el continente
                    fila_actual.acum_camiones_isla += 1;
                    fila_actual.promedio_camiones_isla = fila_actual.acum_camiones_isla / fila_actual.reloj_dias;
                }
            } else {
                // es auto
                if (loc_actual == Estaticas.L_ISLA) {
                    // descargado en la isla
                    fila_actual.acum_autos_cont += 1;
                    fila_actual.promedio_autos_cont = fila_actual.acum_autos_cont / fila_actual.reloj_dias;
                } else {
                    // descargado en el continente
                    fila_actual.acum_autos_isla += 1;
                    fila_actual.promedio_autos_isla = fila_actual.acum_autos_isla / fila_actual.reloj_dias;
                }
            }

            // paso 5: Borrar el auto de la lista de clientes de la fila actual
            fila_actual.clientes = fila_actual.clientes.filter(clte => clte.id != auto_descargando.id);

            // paso 6: Una vez descargado el auto, tenemos que saber si ese auto era el ultimo en ser descargado
            if (fila_anterior.ferry_2.capacidad_restante == 20) {
                // era el ultimo auto en ser descargado

                // tengo que preguntar si ya se debe detener el funcionamiento del dia del ferry 2
                if (fila_actual.reloj_mins >= 780) {
                    // se debe detener el funcionamiento del dia del ferry 2
                    // debo preguntar donde esta el ferry 2
                    if (fila_actual.ferry_2.localizacion == Estaticas.L_ISLA) {
                        // el ferry 2 esta en la isla
                        // hacer que el ferry 2 se vaya al continente vacio
                        fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                        fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;

                        // calcular el tiempo de llegada del ferry 2 al continente
                        fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                        fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                    } else {
                        // el ferry 2 esta en el continente
                        // finalizar el dia del ferry 2
                        fila_actual.ferry_2.estado = Estaticas.E_FIN_ACTIVIDAD_DIA;
                        fila_actual.fin_act_f2 = true
                    }
                } else {
                    // no se debe detener el funcionamiento del dia del ferry 2
                    // pero debo saber donde esta el ferry 2
                    if (fila_actual.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
                        // el ferry 2 esta en el continente
                        // debo preguntar si hay autos esperando en el continente
                        if (fila_anterior.cola_continente >= 1) {
                            // hay autos esperando en el continente
                            // busco el primer auto o camion que este esperando en el continente
                            let auto_a_cargar = fila_actual.clientes.find(clte => clte.localizacion == Estaticas.L_CONTINENTE && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                            // en funcion del tipo de auto, calculo el tiempo de carga
                            if (auto_a_cargar.tipo == Estaticas.T_CAMION) {
                                // es camion
                                // calcular el tiempo de carga del camion en el ferry 2
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 2;

                                // decrementar la cola del continente en 1 porque es un camion
                                fila_actual.cola_continente -= 1;

                                // decrementar la capacidad del ferry 2 en 2
                                fila_actual.ferry_2.capacidad_restante -= 2;

                                // setear el estado del ferry 2 a CARGANDO
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                            } else {
                                // es auto
                                // calcular el tiempo de carga del auto en el ferry 2
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 2;

                                // decrementar la cola del continente en 1 porque es un auto
                                fila_actual.cola_continente -= 1;

                                // decrementar la capacidad del ferry 2 en 1
                                fila_actual.ferry_2.capacidad_restante -= 1;

                                // setear el estado del ferry 2 a CARGANDO
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                            }
                        } else {
                            // no hay nadie esperando en el continente y son menos de las 8 de la noche
                            // entonces el ferry 2 queda libre para hacer otro viaje
                            fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                        }
                    } else {
                        // el ferry 2 esta en la isla
                        // debo preguntar si hay autos esperando en la isla
                        if (fila_anterior.cola_isla >= 1) {
                            // hay autos esperando en la isla
                            // busco el primer auto o camion que este esperando en la isla
                            let auto_a_cargar = fila_actual.clientes.find(clte => clte.localizacion == Estaticas.L_ISLA && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                            // en funcion del tipo de auto, calculo el tiempo de carga
                            if (auto_a_cargar.tipo == Estaticas.T_CAMION) {
                                // es camion
                                // calcular el tiempo de carga del camion en el ferry 2
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 2;

                                // decrementar la cola de la isla en 1 porque es un camion
                                fila_actual.cola_isla -= 1;

                                // decrementar la capacidad del ferry 2 en 2
                                fila_actual.ferry_2.capacidad_restante -= 2;

                                // setear el estado del ferry 2 a CARGANDO
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                            } else {
                                // es auto
                                // calcular el tiempo de carga del auto en el ferry 2
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 2;

                                // decrementar la cola del continente en 1 porque es un auto
                                fila_actual.cola_isla -= 1;

                                // decrementar la capacidad del ferry 2 en 1
                                fila_actual.ferry_2.capacidad_restante -= 1;

                                // setear el estado del ferry 2 a CARGANDO
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                            }
                        } else {
                            // no hay nadie esperando en el continente y son menos de las 8 de la noche
                            // entonces el ferry 2 queda libre para hacer otro viaje
                            fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                        }
                    }
                }
            } else {
                // no era el ultimo auto en ser descargado
                // buscar el siguiente auto a ser descargado
                let siguiente_auto_a_descargar = fila_actual.clientes.find(clte => clte.ferry_id == 2 && clte.estado == Estaticas.E_ESPERANDO_DESCARGA);

                if (siguiente_auto_a_descargar) {
                    // tengo que preguntar su tipo para saber cuanto tiempo tardara en ser descargado
                    if (siguiente_auto_a_descargar.tipo == Estaticas.T_CAMION) {
                        // es un camion
                        // calcular el tiempo de descarga del camion (ferry 2)
                        fila_actual.rnd1_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_descarga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_camion, SParametros.getInstance().desviacion_descarga_camion, fila_actual.rnd1_fin_descarga_camion, fila_actual.rnd2_fin_descarga_camion);
                        fila_actual.fin_descarga_camion_f2 = fila_actual.t_fin_descarga_camion + fila_actual.reloj_mins;

                        // cambiar el estado del cliente a SIENDO DESCARGADO
                        fila_actual.clientes.find(clte => clte.id == siguiente_auto_a_descargar.id).estado = Estaticas.E_SIENDO_DESCARGADO;

                        // incrementar la capacidad del ferry 2 en 2
                        fila_actual.ferry_2.capacidad_restante = fila_anterior.ferry_2.capacidad_restante + 2;

                        // setear el estado del ferry 2 a DESCARGANDO
                        fila_actual.ferry_2.estado = Estaticas.E_DESCARGANDO;
                    } else {
                        // es un auto
                        // calcular el tiempo de descarga del auto
                        fila_actual.rnd1_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_descarga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_auto, SParametros.getInstance().desviacion_descarga_auto, fila_actual.rnd1_fin_descarga_auto, fila_actual.rnd2_fin_descarga_auto);
                        fila_actual.fin_descarga_auto_f2 = fila_actual.t_fin_descarga_auto + fila_actual.reloj_mins;

                        // cambiar el estado del cliente a SIENDO DESCARGADO
                        fila_actual.clientes.find(clte => clte.id == siguiente_auto_a_descargar.id).estado = Estaticas.E_SIENDO_DESCARGADO;

                        // incrementar la capacidad del ferry 2 en 1
                        fila_actual.ferry_2.capacidad_restante = fila_anterior.ferry_2.capacidad_restante + 1;

                        // setear el estado del ferry 2 a DESCARGANDO
                        fila_actual.ferry_2.estado = Estaticas.E_DESCARGANDO;
                    }
                }
            }
        }

        // agregar la fila a la lista
        this.array.push(fila_actual);
        return fila_actual;
    }

    // 12vo y 13er tipo de evento: Fin de descarga de camion f1 y f2
    fin_descarga_camion_ferry1(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;

        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.fin_descarga_camion_f1;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la fin de descarga de auto en el ferry 1
        fila_actual.rnd1_fin_descarga_camion = 0;
        fila_actual.rnd2_fin_descarga_camion = 0;
        fila_actual.t_fin_descarga_camion = 0;
        fila_actual.fin_descarga_camion_f1 = 0;

        // paso 2: buscar el auto que se esta descargando
        let auto_descargando = fila_actual.clientes.find(clte => clte.ferry_id == 1 && clte.estado == Estaticas.E_SIENDO_DESCARGADO);
        fila_actual.tipo_evento = `Fin de descarga de camion en ferry 1 id: ${auto_descargando.id}`;

        // paso 3: extraer el tipo de auto y la localizacion destino del auto
        if (auto_descargando) {
            let tipo_auto = auto_descargando.tipo;
            let loc_actual = auto_descargando.destino; // donde se encuentra actualmente el auto y el ferry 1

            // paso 4: En funcion del tipo de auto, actualizar la estadistica
            if (tipo_auto == Estaticas.T_CAMION) {
                // es camion
                if (loc_actual == Estaticas.L_ISLA) {
                    // descargado en la isla
                    fila_actual.acum_camiones_cont += 1;
                    fila_actual.promedio_camiones_cont = fila_actual.acum_camiones_cont / fila_actual.reloj_dias;
                } else {
                    // descargado en el continente
                    fila_actual.acum_camiones_isla += 1;
                    fila_actual.promedio_camiones_isla = fila_actual.acum_camiones_isla / fila_actual.reloj_dias;
                }
            } else {
                // es auto
                if (loc_actual == Estaticas.L_ISLA) {
                    // descargado en la isla
                    fila_actual.acum_autos_cont += 1;
                    fila_actual.promedio_autos_cont = fila_actual.acum_autos_cont / fila_actual.reloj_dias;
                } else {
                    // descargado en el continente
                    fila_actual.acum_autos_isla += 1;
                    fila_actual.promedio_autos_isla = fila_actual.acum_autos_isla / fila_actual.reloj_dias;
                }
            }

            // paso 5: Borrar el auto de la lista de clientes de la fila actual
            fila_actual.clientes = fila_actual.clientes.filter(clte => clte.id != auto_descargando.id);

            // paso 6: Una vez descargado el auto, tenemos que saber si ese auto era el ultimo en ser descargado
            if (fila_anterior.ferry_1.capacidad_restante == 10) {
                // era el ultimo auto en ser descargado

                // tengo que preguntar si ya se debe detener el funcionamiento del dia del ferry 1
                if (fila_actual.reloj_mins >= 780) {
                    // se debe detener el funcionamiento del dia del ferry 1
                    // debo preguntar donde esta el ferry 1
                    if (fila_actual.ferry_1.localizacion == Estaticas.L_ISLA) {
                        // el ferry 1 esta en la isla
                        // hacer que el ferry 1 se vaya al continente vacio
                        fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                        fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;

                        // calcular el tiempo de llegada del ferry 1 al continente
                        fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                        fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                    } else {
                        // el ferry 1 esta en el continente
                        // finalizar el dia del ferry 1
                        fila_actual.ferry_1.estado = Estaticas.E_FIN_ACTIVIDAD_DIA;
                        fila_actual.fin_act_f1 = true
                    }
                } else {
                    // no se debe detener el funcionamiento del dia del ferry 1
                    // pero debo saber donde esta el ferry 1
                    if (fila_actual.ferry_1.localizacion == Estaticas.L_CONTINENTE) {
                        // el ferry 1 esta en el continente
                        // debo preguntar si hay autos esperando en el continente
                        if (fila_anterior.cola_continente >= 1) {
                            // hay autos esperando en el continente
                            // busco el primer auto o camion que este esperando en el continente
                            let auto_a_cargar = fila_actual.clientes.find(clte => clte.localizacion == Estaticas.L_CONTINENTE && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                            // en funcion del tipo de auto, calculo el tiempo de carga
                            if (auto_a_cargar.tipo == Estaticas.T_CAMION) {
                                // es camion
                                // calcular el tiempo de carga del camion en el ferry 1
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                // decrementar la cola del continente en 1 porque es un camion
                                fila_actual.cola_continente -= 1;

                                // decrementar la capacidad del ferry 1 en 2
                                fila_actual.ferry_1.capacidad_restante -= 2;

                                // setear el estado del ferry 1 a CARGANDO
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                            } else {
                                // es auto
                                // calcular el tiempo de carga del auto en el ferry 1
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                // decrementar la cola del continente en 1 porque es un auto
                                fila_actual.cola_continente -= 1;

                                // decrementar la capacidad del ferry 1 en 1
                                fila_actual.ferry_1.capacidad_restante -= 1;

                                // setear el estado del ferry 1 a CARGANDO
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                            }
                        } else {
                            // no hay nadie esperando en el continente y son menos de las 8 de la noche
                            // entonces el ferry 1 queda libre para hacer otro viaje
                            fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                        }
                    } else {
                        // el ferry 1 esta en la isla
                        // debo preguntar si hay autos esperando en la isla
                        if (fila_anterior.cola_isla >= 1) {
                            // hay autos esperando en la isla
                            // busco el primer auto o camion que este esperando en la isla
                            let auto_a_cargar = fila_actual.clientes.find(clte => clte.localizacion == Estaticas.L_ISLA && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                            // en funcion del tipo de auto, calculo el tiempo de carga
                            if (auto_a_cargar.tipo == Estaticas.T_CAMION) {
                                // es camion
                                // calcular el tiempo de carga del camion en el ferry 1
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                // decrementar la cola de la isla en 1 porque es un camion
                                fila_actual.cola_isla -= 1;

                                // decrementar la capacidad del ferry 1 en 2
                                fila_actual.ferry_1.capacidad_restante -= 2;

                                // setear el estado del ferry 1 a CARGANDO
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                            } else {
                                // es auto
                                // calcular el tiempo de carga del auto en el ferry 1
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 1;

                                // decrementar la cola del continente en 1 porque es un auto
                                fila_actual.cola_isla -= 1;

                                // decrementar la capacidad del ferry 1 en 1
                                fila_actual.ferry_1.capacidad_restante -= 1;

                                // setear el estado del ferry 1 a CARGANDO
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                            }
                        } else {
                            // no hay nadie esperando en el continente y son menos de las 8 de la noche
                            // entonces el ferry 1 queda libre para hacer otro viaje
                            fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                        }
                    }
                }
            } else {
                // no era el ultimo auto en ser descargado
                // buscar el siguiente auto a ser descargado
                let siguiente_auto_a_descargar = fila_actual.clientes.find(clte => clte.ferry_id == 1 && clte.estado == Estaticas.E_ESPERANDO_DESCARGA);

                if (siguiente_auto_a_descargar) {
                    // tengo que preguntar su tipo para saber cuanto tiempo tardara en ser descargado
                    if (siguiente_auto_a_descargar.tipo == Estaticas.T_CAMION) {
                        // es un camion
                        // calcular el tiempo de descarga del camion (ferry 1)
                        fila_actual.rnd1_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_descarga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_camion, SParametros.getInstance().desviacion_descarga_camion, fila_actual.rnd1_fin_descarga_camion, fila_actual.rnd2_fin_descarga_camion);
                        fila_actual.fin_descarga_camion_f1 = fila_actual.t_fin_descarga_camion + fila_actual.reloj_mins;

                        // cambiar el estado del cliente a SIENDO DESCARGADO
                        fila_actual.clientes.find(clte => clte.id == siguiente_auto_a_descargar.id).estado = Estaticas.E_SIENDO_DESCARGADO;

                        // incrementar la capacidad del ferry 1 en 2
                        fila_actual.ferry_1.capacidad_restante = fila_anterior.ferry_1.capacidad_restante + 2;

                        // setear el estado del ferry 1 a DESCARGANDO
                        fila_actual.ferry_1.estado = Estaticas.E_DESCARGANDO;
                    } else {
                        // es un auto
                        // calcular el tiempo de descarga del auto
                        fila_actual.rnd1_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_descarga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_auto, SParametros.getInstance().desviacion_descarga_auto, fila_actual.rnd1_fin_descarga_auto, fila_actual.rnd2_fin_descarga_auto);
                        fila_actual.fin_descarga_auto_f1 = fila_actual.t_fin_descarga_auto + fila_actual.reloj_mins;

                        // cambiar el estado del cliente a SIENDO DESCARGADO
                        fila_actual.clientes.find(clte => clte.id == siguiente_auto_a_descargar.id).estado = Estaticas.E_SIENDO_DESCARGADO;

                        // incrementar la capacidad del ferry 1 en 1
                        fila_actual.ferry_1.capacidad_restante = fila_anterior.ferry_1.capacidad_restante + 1;

                        // setear el estado del ferry 1 a DESCARGANDO
                        fila_actual.ferry_1.estado = Estaticas.E_DESCARGANDO;
                    }
                }
            }
        }

        // agregar la fila a la lista
        this.array.push(fila_actual);
        return fila_actual;
    }

    fin_descarga_camion_ferry2(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;

        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.fin_descarga_camion_f2;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la fin de descarga de auto en el ferry 2
        fila_actual.rnd1_fin_descarga_camion = 0;
        fila_actual.rnd2_fin_descarga_camion = 0;
        fila_actual.t_fin_descarga_camion = 0;
        fila_actual.fin_descarga_camion_f2 = 0;

        // paso 2: buscar el auto que se esta descargando
        let auto_descargando = fila_actual.clientes.find(clte => clte.ferry_id == 2 && clte.estado == Estaticas.E_SIENDO_DESCARGADO);
        fila_actual.tipo_evento = `Fin de descarga de camion en ferry 2 id: ${auto_descargando.id}`;

        // paso 3: extraer el tipo de auto y la localizacion destino del auto
        if (auto_descargando) {
            let tipo_auto = auto_descargando.tipo;
            let loc_actual = auto_descargando.destino; // donde se encuentra actualmente el auto y el ferry 2

            // paso 4: En funcion del tipo de auto, actualizar la estadistica
            if (tipo_auto == Estaticas.T_CAMION) {
                // es camion
                if (loc_actual == Estaticas.L_ISLA) {
                    // descargado en la isla
                    fila_actual.acum_camiones_cont += 1;
                    fila_actual.promedio_camiones_cont = fila_actual.acum_camiones_cont / fila_actual.reloj_dias;
                } else {
                    // descargado en el continente
                    fila_actual.acum_camiones_isla += 1;
                    fila_actual.promedio_camiones_isla = fila_actual.acum_camiones_isla / fila_actual.reloj_dias;
                }
            } else {
                // es auto
                if (loc_actual == Estaticas.L_ISLA) {
                    // descargado en la isla
                    fila_actual.acum_autos_cont += 1;
                    fila_actual.promedio_autos_cont = fila_actual.acum_autos_cont / fila_actual.reloj_dias;
                } else {
                    // descargado en el continente
                    fila_actual.acum_autos_isla += 1;
                    fila_actual.promedio_autos_isla = fila_actual.acum_autos_isla / fila_actual.reloj_dias;
                }
            }

            // paso 5: Borrar el auto de la lista de clientes de la fila actual
            fila_actual.clientes = fila_actual.clientes.filter(clte => clte.id != auto_descargando.id);

            // paso 6: Una vez descargado el auto, tenemos que saber si ese auto era el ultimo en ser descargado
            if (fila_anterior.ferry_2.capacidad_restante == 20) {
                // era el ultimo auto en ser descargado

                // tengo que preguntar si ya se debe detener el funcionamiento del dia del ferry 2
                if (fila_actual.reloj_mins >= 780) {
                    // se debe detener el funcionamiento del dia del ferry 2
                    // debo preguntar donde esta el ferry 2
                    if (fila_actual.ferry_2.localizacion == Estaticas.L_ISLA) {
                        // el ferry 2 esta en la isla
                        // hacer que el ferry 2 se vaya al continente vacio
                        fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                        fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;

                        // calcular el tiempo de llegada del ferry 2 al continente
                        fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                        fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
                    } else {
                        // el ferry 2 esta en el continente
                        // finalizar el dia del ferry 2
                        fila_actual.ferry_2.estado = Estaticas.E_FIN_ACTIVIDAD_DIA;
                        fila_actual.fin_act_f2 = true
                    }
                } else {
                    // no se debe detener el funcionamiento del dia del ferry 2
                    // pero debo saber donde esta el ferry 2
                    if (fila_actual.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
                        // el ferry 2 esta en el continente
                        // debo preguntar si hay autos esperando en el continente
                        if (fila_anterior.cola_continente >= 1) {
                            // hay autos esperando en el continente
                            // busco el primer auto o camion que este esperando en el continente
                            let auto_a_cargar = fila_actual.clientes.find(clte => clte.localizacion == Estaticas.L_CONTINENTE && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                            // en funcion del tipo de auto, calculo el tiempo de carga
                            if (auto_a_cargar.tipo == Estaticas.T_CAMION) {
                                // es camion
                                // calcular el tiempo de carga del camion en el ferry 2
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 2;

                                // decrementar la cola del continente en 1 porque es un camion
                                fila_actual.cola_continente -= 1;

                                // decrementar la capacidad del ferry 2 en 2
                                fila_actual.ferry_2.capacidad_restante -= 2;

                                // setear el estado del ferry 2 a CARGANDO
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                            } else {
                                // es auto
                                // calcular el tiempo de carga del auto en el ferry 2
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 2;

                                // decrementar la cola del continente en 1 porque es un auto
                                fila_actual.cola_continente -= 1;

                                // decrementar la capacidad del ferry 2 en 1
                                fila_actual.ferry_2.capacidad_restante -= 1;

                                // setear el estado del ferry 2 a CARGANDO
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                            }
                        } else {
                            // no hay nadie esperando en el continente y son menos de las 8 de la noche
                            // entonces el ferry 2 queda libre para hacer otro viaje
                            fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                        }
                    } else {
                        // el ferry 2 esta en la isla
                        // debo preguntar si hay autos esperando en la isla
                        if (fila_anterior.cola_isla >= 1) {
                            // hay autos esperando en la isla
                            // busco el primer auto o camion que este esperando en la isla
                            let auto_a_cargar = fila_actual.clientes.find(clte => clte.localizacion == Estaticas.L_ISLA && clte.estado == Estaticas.E_ESPERANDO_CARGA);
                            // en funcion del tipo de auto, calculo el tiempo de carga
                            if (auto_a_cargar.tipo == Estaticas.T_CAMION) {
                                // es camion
                                // calcular el tiempo de carga del camion en el ferry 2
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 2;

                                // decrementar la cola de la isla en 1 porque es un camion
                                fila_actual.cola_isla -= 1;

                                // decrementar la capacidad del ferry 2 en 2
                                fila_actual.ferry_2.capacidad_restante -= 2;

                                // setear el estado del ferry 2 a CARGANDO
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                            } else {
                                // es auto
                                // calcular el tiempo de carga del auto en el ferry 2
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;

                                // cambiar el estado del cliente a SIENDO CARGADO
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto_a_cargar.id).ferry_id = 2;

                                // decrementar la cola del continente en 1 porque es un auto
                                fila_actual.cola_isla -= 1;

                                // decrementar la capacidad del ferry 2 en 1
                                fila_actual.ferry_2.capacidad_restante -= 1;

                                // setear el estado del ferry 2 a CARGANDO
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                            }
                        } else {
                            // no hay nadie esperando en el continente y son menos de las 8 de la noche
                            // entonces el ferry 2 queda libre para hacer otro viaje
                            fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                        }
                    }
                }
            } else {
                // no era el ultimo auto en ser descargado
                // buscar el siguiente auto a ser descargado
                let siguiente_auto_a_descargar = fila_actual.clientes.find(clte => clte.ferry_id == 2 && clte.estado == Estaticas.E_ESPERANDO_DESCARGA);

                if (siguiente_auto_a_descargar) {
                    // tengo que preguntar su tipo para saber cuanto tiempo tardara en ser descargado
                    if (siguiente_auto_a_descargar.tipo == Estaticas.T_CAMION) {
                        // es un camion
                        // calcular el tiempo de descarga del camion (ferry 2)
                        fila_actual.rnd1_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_descarga_camion = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_descarga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_camion, SParametros.getInstance().desviacion_descarga_camion, fila_actual.rnd1_fin_descarga_camion, fila_actual.rnd2_fin_descarga_camion);
                        fila_actual.fin_descarga_camion_f2 = fila_actual.t_fin_descarga_camion + fila_actual.reloj_mins;

                        // cambiar el estado del cliente a SIENDO DESCARGADO
                        fila_actual.clientes.find(clte => clte.id == siguiente_auto_a_descargar.id).estado = Estaticas.E_SIENDO_DESCARGADO;

                        // incrementar la capacidad del ferry 2 en 2
                        fila_actual.ferry_2.capacidad_restante = fila_anterior.ferry_2.capacidad_restante + 2;

                        // setear el estado del ferry 2 a DESCARGANDO
                        fila_actual.ferry_2.estado = Estaticas.E_DESCARGANDO;
                    } else {
                        // es un auto
                        // calcular el tiempo de descarga del auto
                        fila_actual.rnd1_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_descarga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_descarga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_descarga_auto, SParametros.getInstance().desviacion_descarga_auto, fila_actual.rnd1_fin_descarga_auto, fila_actual.rnd2_fin_descarga_auto);
                        fila_actual.fin_descarga_auto_f2 = fila_actual.t_fin_descarga_auto + fila_actual.reloj_mins;

                        // cambiar el estado del cliente a SIENDO DESCARGADO
                        fila_actual.clientes.find(clte => clte.id == siguiente_auto_a_descargar.id).estado = Estaticas.E_SIENDO_DESCARGADO;

                        // incrementar la capacidad del ferry 2 en 1
                        fila_actual.ferry_2.capacidad_restante = fila_anterior.ferry_2.capacidad_restante + 1;

                        // setear el estado del ferry 2 a DESCARGANDO
                        fila_actual.ferry_2.estado = Estaticas.E_DESCARGANDO;
                    }
                }
            }
        }

        // agregar la fila a la lista
        this.array.push(fila_actual);
        return fila_actual;
    }

    // 14vo tipo de evento: Llegada de autos a la isla
    llegada_auto_a_isla(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;
        fila_actual.tipo_evento = `Llegada de auto a la isla id: ${this.ultimo_clte_id + 1}`;
        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.prox_llegada_autos_isla;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la llegada de autos a la isla
        fila_actual.rnd1_llegada_autos_isla = 0;
        fila_actual.rnd2_llegada_autos_isla = 0;
        fila_actual.t_llegada_autos_isla = 0;
        fila_actual.prox_llegada_autos_isla = 0;

        // paso 2: Generar un nuevo auto
        let auto = new Cliente(Estaticas.T_AUTO, Estaticas.L_ISLA, this.ultimo_clte_id + 1, Estaticas.L_CONTINENTE);
        this.ultimo_clte_id += 1;

        // Paso 3: Consultar si hay cola en la isla o no
        if (fila_anterior.cola_isla >= 1) {
            let autos_en_cola = fila_anterior.clientes.filter(clte => clte.localizacion == Estaticas.L_ISLA && clte.estado == Estaticas.E_ESPERANDO_CARGA);
            let son_todos_camiones = autos_en_cola.every(clte => clte.tipo == Estaticas.T_CAMION);

            if (son_todos_camiones) {
                if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE && fila_anterior.ferry_1.localizacion == Estaticas.L_ISLA && fila_anterior.ferry_1.capacidad_restante >= 1) {
                    // si hay capacidad en el ferry 1, el auto se sube al ferry 1
                    fila_actual.ferry_1.capacidad_restante -= 1;
                    auto.ferry_id = 1;
                    auto.estado = Estaticas.E_SIENDO_CARGADO;
                    fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;

                    // calcular el tiempo de carga del auto en el ferry 1
                    fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                    fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                    fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                    fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                } else {
                    // pregunto si hay capacidad en el ferry 2
                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE && fila_anterior.ferry_2.localizacion == Estaticas.L_ISLA && fila_anterior.ferry_2.capacidad_restante >= 1) {
                        // si hay capacidad en el ferry 1, el auto se sube al ferry 2
                        fila_actual.ferry_2.capacidad_restante -= 1;
                        auto.ferry_id = 2;
                        auto.estado = Estaticas.E_SIENDO_CARGADO;
                        fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;

                        // calcular el tiempo de carga del auto en el ferry 2
                        fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                        fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                    } else {
                        // no hay capacidad en ningun ferry, por ende, se va a la cola
                        fila_actual.cola_isla += 1;
                        auto.estado = Estaticas.E_ESPERANDO_CARGA;

                        if (fila_actual.cola_isla > fila_anterior.cola_maxima_isla) {
                            fila_actual.cola_maxima_isla = fila_actual.cola_isla;
                        }
                    }
                }
            } else {
                // si no son todos camiones, entonces el auto que llega a la isla se va a la cola
                auto.estado = Estaticas.E_ESPERANDO_CARGA;
                fila_actual.cola_isla += 1;

                if (fila_actual.cola_isla > fila_anterior.cola_maxima_isla) {
                    fila_actual.cola_maxima_isla = fila_actual.cola_isla;
                }
            }

        } else {
            // no hay autos esperando en la isla
            // debo saber si hay ferrys disponibles en la isla, empezando por el ferry 1
            if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE && fila_anterior.ferry_1.localizacion == Estaticas.L_ISLA) {
                // si esta libre y esta en la isla, debo saber su capacidad restante
                if (fila_anterior.ferry_1.capacidad_restante >= 1) {
                    // si hay espacio en el ferry 1, entonces cargar el auto
                    fila_actual.ferry_1.capacidad_restante -= 1;
                    fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                    auto.ferry_id = 1;
                    auto.estado = Estaticas.E_SIENDO_CARGADO;

                    // calcular el tiempo de carga del auto en el ferry 1
                    fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                    fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                    fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                    fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                } else {
                    // no hay espacio en ferry 1
                    // debo preguntar si el ferry 2 esta en la isla y libre
                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE && fila_anterior.ferry_2.localizacion == Estaticas.L_ISLA) {
                        // si el ferry 2 esta libre y en la isla, debo saber su capacidad restante
                        if (fila_anterior.ferry_2.capacidad_restante >= 1) {
                            // si hay espacio en el ferry 2, cargar el auto en el ferry 2
                            fila_actual.ferry_2.capacidad_restante -= 1;
                            fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                            auto.ferry_id = 2;
                            auto.estado = Estaticas.E_SIENDO_CARGADO;

                            // calcular el tiempo de carga del auto en el ferry 2
                            fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                            fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                            fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                            fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                        } else {
                            // si el ferry 2 no tiene espacio, a la cola
                            auto.estado = Estaticas.E_ESPERANDO_CARGA;
                            fila_actual.cola_isla += 1;

                            if (fila_actual.cola_isla > fila_anterior.cola_maxima_isla) {
                                fila_actual.cola_maxima_isla = fila_actual.cola_isla;
                            }
                        }
                    } else {
                        // si el ferry 2 no esta libre o no esta en la isla, a la cola
                        auto.estado = Estaticas.E_ESPERANDO_CARGA;
                        fila_actual.cola_isla += 1;

                        if (fila_actual.cola_isla > fila_anterior.cola_maxima_isla) {
                            fila_actual.cola_maxima_isla = fila_actual.cola_isla;
                        }
                    }
                }
            } else {
                // si no esta libre el ferry 1 en la isla, debo preguntar si el ferry 2 esta libre en la isla
                if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE && fila_anterior.ferry_2.localizacion == Estaticas.L_ISLA) {
                    // si el ferry 2 esta libre y en la isla, debo saber su capacidad restante
                    if (fila_anterior.ferry_2.capacidad_restante >= 1) {
                        // si hay espacio en el ferry 2, cargar el auto en el ferry 2
                        fila_actual.ferry_2.capacidad_restante -= 1;
                        fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                        auto.ferry_id = 2;
                        auto.estado = Estaticas.E_SIENDO_CARGADO;

                        // calcular el tiempo de carga del auto en el ferry 2
                        fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                        fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                    } else {
                        // si el ferry 2 no tiene espacio, a la cola
                        auto.estado = Estaticas.E_ESPERANDO_CARGA;
                        fila_actual.cola_isla += 1;

                        if (fila_actual.cola_isla > fila_anterior.cola_maxima_isla) {
                            fila_actual.cola_maxima_isla = fila_actual.cola_isla;
                        }
                    }
                } else {
                    // si el ferry 2 no esta libre o no esta en la isla, a la cola
                    auto.estado = Estaticas.E_ESPERANDO_CARGA;
                    fila_actual.cola_isla += 1;

                    if (fila_actual.cola_isla > fila_anterior.cola_maxima_isla) {
                        fila_actual.cola_maxima_isla = fila_actual.cola_isla;
                    }
                }
            }
        }
        // Paso 4: Calcular la proxima llegada de un auto a la isla
        fila_actual.rnd1_llegada_autos_isla = this.generador.generarNumeroAleatorio();
        fila_actual.rnd2_llegada_autos_isla = this.generador.generarNumeroAleatorio();
        fila_actual.t_llegada_autos_isla = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_llegada_auto_isla, SParametros.getInstance().desviacion_llegada_auto_isla, fila_actual.rnd1_llegada_autos_isla, fila_actual.rnd2_llegada_autos_isla);
        fila_actual.prox_llegada_autos_isla = fila_actual.t_llegada_autos_isla + fila_actual.reloj_mins;

        // Paso 5: Agregar el auto a la lista de clientes
        fila_actual.clientes.push(auto);

        this.array.push(fila_actual);
        return fila_actual;
    }

    // 15to tipo de evento: Llegada de camiones a la isla
    llegada_camion_a_isla(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;
        fila_actual.tipo_evento = `Llegada de camion a la isla id: ${this.ultimo_clte_id + 1}`;
        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.prox_llegada_camiones_isla;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la llegada de camiones a la isla
        fila_actual.rnd1_llegada_camiones_isla = 0;
        fila_actual.rnd2_llegada_camiones_isla = 0;
        fila_actual.t_llegada_camiones_isla = 0;
        fila_actual.prox_llegada_camiones_isla = 0;

        // paso 2: Generar un nuevo auto
        let auto = new Cliente(Estaticas.T_CAMION, Estaticas.L_ISLA, this.ultimo_clte_id + 1, Estaticas.L_CONTINENTE);
        this.ultimo_clte_id += 1;

        // Paso 3: Consultar si hay cola en la isla o no
        if (fila_anterior.cola_isla >= 1) {
            // hay cola en la isla
            fila_actual.cola_isla += 1;
            auto.estado = Estaticas.E_ESPERANDO_CARGA;

            if (fila_actual.cola_isla > fila_anterior.cola_maxima_isla) {
                fila_actual.cola_maxima_isla = fila_actual.cola_isla;
            }
        } else {
            // no hay autos esperando en la isla
            // debo saber si hay ferrys disponibles en la isla, empezando por el ferry 1
            if (fila_anterior.ferry_1.estado == Estaticas.E_LIBRE && fila_anterior.ferry_1.localizacion == Estaticas.L_ISLA) {
                // si esta libre y esta en la isla, debo saber su capacidad restante
                if (fila_anterior.ferry_1.capacidad_restante >= 2) {
                    // si hay espacio en el ferry 1, entonces cargar el camion
                    fila_actual.ferry_1.capacidad_restante -= 2;
                    fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                    auto.ferry_id = 1;
                    auto.estado = Estaticas.E_SIENDO_CARGADO;

                    // calcular el tiempo de carga del camion en el ferry 1
                    fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                    fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                    fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                    fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                } else {
                    // no hay espacio en ferry 1
                    // debo preguntar si el ferry 2 esta en la isla y libre
                    if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE && fila_anterior.ferry_2.localizacion == Estaticas.L_ISLA) {
                        // si el ferry 2 esta libre y en la isla, debo saber su capacidad restante
                        if (fila_anterior.ferry_2.capacidad_restante >= 2) {
                            // si hay espacio en el ferry 2, cargar el auto en el ferry 2
                            fila_actual.ferry_2.capacidad_restante -= 2;
                            fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                            auto.ferry_id = 2;
                            auto.estado = Estaticas.E_SIENDO_CARGADO;

                            // calcular el tiempo de carga del camion en el ferry 2
                            fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                            fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                            fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                            fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                        } else {
                            // si el ferry 2 no tiene espacio, a la cola
                            auto.estado = Estaticas.E_ESPERANDO_CARGA;
                            fila_actual.cola_isla += 1;

                            if (fila_actual.cola_isla > fila_anterior.cola_maxima_isla) {
                                fila_actual.cola_maxima_isla = fila_actual.cola_isla;
                            }
                        }
                    } else {
                        // si el ferry 2 no esta libre o no esta en la isla, a la cola
                        auto.estado = Estaticas.E_ESPERANDO_CARGA;
                        fila_actual.cola_isla += 1;

                        if (fila_actual.cola_isla > fila_anterior.cola_maxima_isla) {
                            fila_actual.cola_maxima_isla = fila_actual.cola_isla;
                        }
                    }
                }
            } else {
                // si no esta libre el ferry 1 en la isla, debo preguntar si el ferry 2 esta libre en la isla
                if (fila_anterior.ferry_2.estado == Estaticas.E_LIBRE && fila_anterior.ferry_2.localizacion == Estaticas.L_ISLA) {
                    // si el ferry 2 esta libre y en la isla, debo saber su capacidad restante
                    if (fila_anterior.ferry_2.capacidad_restante >= 2) {
                        // si hay espacio en el ferry 2, cargar el auto en el ferry 2
                        fila_actual.ferry_2.capacidad_restante -= 2;
                        fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                        auto.ferry_id = 2;
                        auto.estado = Estaticas.E_SIENDO_CARGADO;

                        // calcular el tiempo de carga del camion en el ferry 2
                        fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                        fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                        fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                        fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                    } else {
                        // si el ferry 2 no tiene espacio, a la cola
                        auto.estado = Estaticas.E_ESPERANDO_CARGA;
                        fila_actual.cola_isla += 1;

                        if (fila_actual.cola_isla > fila_anterior.cola_maxima_isla) {
                            fila_actual.cola_maxima_isla = fila_actual.cola_isla;
                        }
                    }
                } else {
                    // si el ferry 2 no esta libre o no esta en la isla, a la cola
                    auto.estado = Estaticas.E_ESPERANDO_CARGA;
                    fila_actual.cola_isla += 1;

                    if (fila_actual.cola_isla > fila_anterior.cola_maxima_isla) {
                        fila_actual.cola_maxima_isla = fila_actual.cola_isla;
                    }
                }
            }
        }

        // Paso 4: Calcular la proxima llegada de un camion a la isla
        fila_actual.rnd1_llegada_camiones_isla = this.generador.generarNumeroAleatorio();
        fila_actual.rnd2_llegada_camiones_isla = this.generador.generarNumeroAleatorio();
        fila_actual.t_llegada_camiones_isla = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_llegada_camion_isla, SParametros.getInstance().desviacion_llegada_camion_isla, fila_actual.rnd1_llegada_camiones_isla, fila_actual.rnd2_llegada_camiones_isla);
        fila_actual.prox_llegada_camiones_isla = fila_actual.t_llegada_camiones_isla + fila_actual.reloj_mins;

        // Paso 5: Agregar el auto a la lista de clientes
        fila_actual.clientes.push(auto);

        this.array.push(fila_actual);
        return fila_actual;
    }

    // 16to tipo de evento: Habilitacion de llegadas a la isla
    habilitar_llegadas_isla(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;
        fila_actual.tipo_evento = `Habilitacion de llegadas a la isla`;
        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.habilitacion_llegadas_isla;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes a la habilitacion de llegadas a la isla
        fila_actual.habilitacion_llegadas_isla = 0;

        // paso 2: calcular la proxima llegada de un auto a la isla y de un camion a la isla
        fila_actual.rnd1_llegada_autos_isla = this.generador.generarNumeroAleatorio();
        fila_actual.rnd2_llegada_autos_isla = this.generador.generarNumeroAleatorio();
        fila_actual.t_llegada_autos_isla = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_llegada_auto_isla, SParametros.getInstance().desviacion_llegada_auto_isla, fila_actual.rnd1_llegada_autos_isla, fila_actual.rnd2_llegada_autos_isla);
        fila_actual.prox_llegada_autos_isla = fila_actual.t_llegada_autos_isla + fila_actual.reloj_mins;

        fila_actual.rnd1_llegada_camiones_isla = this.generador.generarNumeroAleatorio();
        fila_actual.rnd2_llegada_camiones_isla = this.generador.generarNumeroAleatorio();
        fila_actual.t_llegada_camiones_isla = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_llegada_camion_isla, SParametros.getInstance().desviacion_llegada_camion_isla, fila_actual.rnd1_llegada_camiones_isla, fila_actual.rnd2_llegada_camiones_isla);
        fila_actual.prox_llegada_camiones_isla = fila_actual.t_llegada_camiones_isla + fila_actual.reloj_mins;

        // agregar la fila a la lista
        this.array.push(fila_actual);
        return fila_actual;
    }

    // 17mo tipo de evento: Corte de llegadas a la isla
    corte_llegadas_isla(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;
        fila_actual.tipo_evento = `Corte de llegadas a la isla`;
        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.corte_llegadas_isla;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes al corte de llegadas a la isla
        fila_actual.corte_llegadas_isla = 0;

        // paso 2: setear todo lo de las proximas llegadas a la isla en 0
        fila_actual.rnd1_llegada_autos_isla = 0;
        fila_actual.rnd2_llegada_autos_isla = 0;
        fila_actual.t_llegada_autos_isla = 0;
        fila_actual.prox_llegada_autos_isla = 0;

        fila_actual.rnd1_llegada_camiones_isla = 0;
        fila_actual.rnd2_llegada_camiones_isla = 0;
        fila_actual.t_llegada_camiones_isla = 0;
        fila_actual.prox_llegada_camiones_isla = 0;

        // agregar la fila a la lista
        this.array.push(fila_actual);
        return fila_actual;
    }

    // 18vo tipo de evento: Corte de llegadas al continente
    corte_llegadas_cont(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;
        fila_actual.tipo_evento = `Corte de llegadas al continente`;
        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.corte_llegadas_cont;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes al corte de llegadas al continente
        fila_actual.corte_llegadas_cont = 0;

        // paso 2: setear todo lo de las proximas llegadas al continente en 0
        fila_actual.rnd1_llegada_autos_cont = 0;
        fila_actual.rnd2_llegada_autos_cont = 0;
        fila_actual.t_llegada_autos_cont = 0;
        fila_actual.prox_llegada_autos_cont = 0;

        fila_actual.rnd1_llegada_camiones_cont = 0;
        fila_actual.rnd2_llegada_camiones_cont = 0;
        fila_actual.t_llegada_camiones_cont = 0;
        fila_actual.prox_llegada_camiones_cont = 0;

        // agregar la fila a la lista
        this.array.push(fila_actual);
        return fila_actual;
    }

    simular(cant_iteraciones_a_mostrar, dia_inicio_muestra, hora_inicio_muestra) {
        try {
            let iteracion = 0
            let iteraciones_mostradas = 0;
            while (this.array[this.array.length - 1].reloj_dias < 32) {
                iteracion += 1;
                let estadoActual = this.array[this.array.length - 1];
                let proximo_evento = this.determinar_proximo_evento(estadoActual);

                // ya termino el dia, entonces debo crear un nuevo dia
                if ((estadoActual.fin_act_f1 && estadoActual.fin_act_f2) || !proximo_evento.tipo) {
                    this.nuevo_dia(estadoActual);
                } else {
                    switch (proximo_evento.tipo) {
                        case Estaticas.E_LLEGADA_AUTO_CONT:
                            this.llegada_auto_al_continente(estadoActual);
                            break;
                        case Estaticas.E_LLEGADA_CAMION_CONT:
                            this.llegada_camion_al_continente(estadoActual);
                            break;
                        case Estaticas.E_FUNCIONAMIENTO_FERRYS:
                            this.funcionamiento_ferrys(estadoActual);
                            break;
                        case Estaticas.E_FIN_CARGA_AUTO_F1:
                            this.fin_carga_auto_f1(estadoActual);
                            break;
                        case Estaticas.E_FIN_CARGA_AUTO_F2:
                            this.fin_carga_auto_f2(estadoActual);
                            break;
                        case Estaticas.E_FIN_CARGA_CAMION_F1:
                            this.fin_carga_camion_f1(estadoActual);
                            break;
                        case Estaticas.E_FIN_CARGA_CAMION_F2:
                            this.fin_carga_camion_f2(estadoActual);
                            break;
                        case Estaticas.E_FIN_RECORRIDO_FERRY_1:
                            this.fin_recorrido_f1(estadoActual);
                            break;
                        case Estaticas.E_FIN_RECORRIDO_FERRY_2:
                            this.fin_recorrido_f2(estadoActual);
                            break;
                        case Estaticas.E_FIN_DESCARGA_AUTO_F1:
                            this.fin_descarga_auto_ferry1(estadoActual);
                            break;
                        case Estaticas.E_FIN_DESCARGA_AUTO_F2:
                            this.fin_descarga_auto_ferry2(estadoActual);
                            break;
                        case Estaticas.E_FIN_DESCARGA_CAMION_F1:
                            this.fin_descarga_camion_ferry1(estadoActual);
                            break;
                        case Estaticas.E_FIN_DESCARGA_CAMION_F2:
                            this.fin_descarga_camion_ferry2(estadoActual);
                            break;
                        case Estaticas.E_HABILITACION_LLEGADAS_ISLA:
                            this.habilitar_llegadas_isla(estadoActual);
                            break;
                        case Estaticas.E_LLEGADA_AUTO_ISLA:
                            this.llegada_auto_a_isla(estadoActual);
                            break;
                        case Estaticas.E_LLEGADA_CAMION_ISLA:
                            this.llegada_camion_a_isla(estadoActual);
                            break;
                        case Estaticas.E_CORTE_LLEGADAS_ISLA:
                            this.corte_llegadas_isla(estadoActual);
                            break;
                        case Estaticas.E_CORTE_LLEGADAS_CONT:
                            this.corte_llegadas_cont(estadoActual);
                            break;
                        case Estaticas.E_FIN_ACTIVIDAD_DIA:
                            this.chequear_fin_dia(estadoActual);
                            break;
                        case Estaticas.E_INICIO_MANTENIMIENTO:
                            this.inicio_mantenimiento(estadoActual);
                            break;
                        case Estaticas.E_FIN_MANTENIMIENTO:
                            this.fin_mantenimiento(estadoActual);
                            break;
                        default:
                            console.log("No hay eventos pendientes");
                            break;
                    }
                }

                // Una vez procesado el evento, el nuevo estado es el último de this.array
                let nuevoEstado = this.array[this.array.length - 1];

                // Si se cumple que el estado actual supera el umbral definido (dia y hora)
                if (
                    nuevoEstado.reloj_dias > dia_inicio_muestra ||
                    (nuevoEstado.reloj_dias === dia_inicio_muestra && nuevoEstado.reloj_mins >= hora_inicio_muestra)
                ) {
                    // Se agregan hasta cant_iteraciones_a_mostrar iteraciones
                    if (iteraciones_mostradas < cant_iteraciones_a_mostrar) {
                        this.array_a_mostrar.push(nuevoEstado);
                        iteraciones_mostradas++;
                    }
                }

                // Se mantiene un máximo de 2 elementos en el array principal para optimizar memoria
                if (this.array.length > 2) {
                    this.array.shift();
                }
            }

            // Finalmente, se asegura que el último estado de la simulación esté en array_a_mostrar
            let ultimoEstado = this.array[this.array.length - 1];
            if (this.array_a_mostrar[this.array_a_mostrar.length - 1] !== ultimoEstado) {
                this.array_a_mostrar.push(ultimoEstado);
            }
        } catch (error) {
            console.log("Error en el evento nro: ", this.array[this.array.length - 1].nroEvento);
            console.log(error);
        }
    }

    // auto puedo ser auto o camion
    buscar_auto_a_cargar_en_continente(fila_anterior) {
        let cliente = fila_anterior.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.localizacion == Estaticas.L_CONTINENTE);
        return cliente;
    }

    buscar_auto_a_cargar_en_isla(fila_anterior) {
        let cliente = fila_anterior.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.localizacion == Estaticas.L_ISLA);
        return cliente;
    }

    // 19no tipo de evento: Fin de actividad del dia
    chequear_fin_dia(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;
        fila_actual.tipo_evento = `Chequeo Fin de actividad del dia`;
        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.chequeo_fin_act_dia;
        fila_actual.chequeo_fin_act_dia = 0


        if (fila_actual.ferry_1.localizacion == Estaticas.L_CONTINENTE) {
            // esta en el continente
            // esta libre?
            if (fila_actual.ferry_1.estado == Estaticas.E_LIBRE) {
                // esta libre, entonces fnializo la actividad del dia
                fila_actual.ferry_1.estado = Estaticas.E_FIN_ACTIVIDAD_DIA;
                fila_actual.fin_act_f1 = true
            }
        } else {
            // esta en la isla
            // esta libre?
            if (fila_actual.ferry_1.estado == Estaticas.E_LIBRE) {
                // esta libre, entonces hago un recorrido vacio al continente
                fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => clte.estado = Estaticas.E_VIAJANDO_FERRY);
                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => clte.localizacion = Estaticas.L_OCEANO);

                // calcular el tiempo de recorrido del ferry 1
                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
            }
        }

        if (fila_actual.ferry_2.localizacion == Estaticas.L_CONTINENTE) {
            // esta en el continente
            // esta libre?
            if (fila_actual.ferry_2.estado == Estaticas.E_LIBRE) {
                // esta libre, entonces fnializo la actividad del dia
                fila_actual.ferry_2.estado = Estaticas.E_FIN_ACTIVIDAD_DIA;
                fila_actual.fin_act_f2 = true
            }
        } else {
            // esta en la isla
            // esta libre?
            if (fila_actual.ferry_2.estado == Estaticas.E_LIBRE) {
                // esta libre, entonces hago un recorrido vacio al continente
                fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => clte.estado = Estaticas.E_VIAJANDO_FERRY);
                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => clte.localizacion = Estaticas.L_OCEANO);

                // calcular el tiempo de recorrido del ferry 1
                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
            }
        }

        this.array.push(fila_actual);
        return fila_actual;
    }

    determinar_proximo_evento(fila_anterior) {
        let proximo_evento = {
            tipo: "",
            valor: 0
        }

        let valores = [
            { tipo: Estaticas.E_LLEGADA_AUTO_CONT, valor: fila_anterior.prox_llegada_autos_cont },
            { tipo: Estaticas.E_LLEGADA_CAMION_CONT, valor: fila_anterior.prox_llegada_camiones_cont },
            { tipo: Estaticas.E_FIN_CARGA_AUTO_F1, valor: fila_anterior.fin_carga_auto_f1 },
            { tipo: Estaticas.E_FIN_CARGA_AUTO_F2, valor: fila_anterior.fin_carga_auto_f2 },
            { tipo: Estaticas.E_FIN_CARGA_CAMION_F1, valor: fila_anterior.fin_carga_camion_f1 },
            { tipo: Estaticas.E_FIN_CARGA_CAMION_F2, valor: fila_anterior.fin_carga_camion_f2 },
            { tipo: Estaticas.E_INICIO_MANTENIMIENTO, valor: fila_anterior.inicio_mantenimiento },
            { tipo: Estaticas.E_FIN_MANTENIMIENTO, valor: fila_anterior.fin_mantenimiento },
            { tipo: Estaticas.E_FIN_RECORRIDO_FERRY_1, valor: fila_anterior.fin_recorrido_ferry_1 },
            { tipo: Estaticas.E_FIN_RECORRIDO_FERRY_2, valor: fila_anterior.fin_recorrido_ferry_2 },
            { tipo: Estaticas.E_LLEGADA_AUTO_ISLA, valor: fila_anterior.prox_llegada_autos_isla },
            { tipo: Estaticas.E_LLEGADA_CAMION_ISLA, valor: fila_anterior.prox_llegada_camiones_isla },
            { tipo: Estaticas.E_FUNCIONAMIENTO_FERRYS, valor: fila_anterior.func_ferrys },
            { tipo: Estaticas.E_HABILITACION_LLEGADAS_ISLA, valor: fila_anterior.habilitacion_llegadas_isla },
            { tipo: Estaticas.E_FIN_DESCARGA_AUTO_F1, valor: fila_anterior.fin_descarga_auto_f1 },
            { tipo: Estaticas.E_FIN_DESCARGA_AUTO_F2, valor: fila_anterior.fin_descarga_auto_f2 },
            { tipo: Estaticas.E_FIN_DESCARGA_CAMION_F1, valor: fila_anterior.fin_descarga_camion_f1 },
            { tipo: Estaticas.E_FIN_DESCARGA_CAMION_F2, valor: fila_anterior.fin_descarga_camion_f2 },
            { tipo: Estaticas.E_CORTE_LLEGADAS_ISLA, valor: fila_anterior.corte_llegadas_isla },
            { tipo: Estaticas.E_CORTE_LLEGADAS_CONT, valor: fila_anterior.corte_llegadas_cont },
            { tipo: Estaticas.E_FIN_ACTIVIDAD_DIA, valor: fila_anterior.chequeo_fin_act_dia }
        ]

        // filtrar todos los valores que sean mayores a 0
        valores = valores.filter(val => val.valor > 0);

        let minimo = Math.min(...valores.map(val => val.valor));
        let proximo = valores.find(val => val.valor === minimo);

        proximo_evento.tipo = proximo?.tipo;
        proximo_evento.valor = proximo?.valor;

        return proximo_evento;
    }

    resetAllRnds(fila_actual) {
        fila_actual.rnd1_llegada_autos_cont = 0;
        fila_actual.rnd2_llegada_autos_cont = 0;
        fila_actual.t_llegada_autos_cont = 0;

        fila_actual.rnd1_llegada_camiones_cont = 0;
        fila_actual.rnd2_llegada_camiones_cont = 0;
        fila_actual.t_llegada_camiones_cont = 0;

        fila_actual.rnd1_fin_carga_auto = 0;
        fila_actual.rnd2_fin_carga_auto = 0;
        fila_actual.t_fin_carga_auto = 0;

        fila_actual.rnd1_fin_carga_camion = 0;
        fila_actual.rnd2_fin_carga_camion = 0;
        fila_actual.t_fin_carga_camion = 0;

        fila_actual.rnd1_fin_descarga_auto = 0;
        fila_actual.rnd2_fin_descarga_auto = 0;
        fila_actual.t_fin_descarga_auto = 0;

        fila_actual.rnd1_fin_descarga_camion = 0;
        fila_actual.rnd2_fin_descarga_camion = 0;
        fila_actual.t_fin_descarga_camion = 0;

        fila_actual.rnd1_fin_mantenimiento = 0;
        fila_actual.rnd2_fin_mantenimiento = 0;
        fila_actual.t_fin_mantenimiento = 0;

        fila_actual.rnd1_fin_recorrido = 0;
        fila_actual.rnd2_fin_recorrido = 0;
        fila_actual.t_fin_recorrido = 0;

        fila_actual.rnd1_llegada_autos_isla = 0;
        fila_actual.rnd2_llegada_autos_isla = 0;
        fila_actual.t_llegada_autos_isla = 0;

        fila_actual.rnd1_llegada_camiones_isla = 0;
        fila_actual.rnd2_llegada_camiones_isla = 0;
        fila_actual.t_llegada_camiones_isla = 0;

        fila_actual.t_mantenimiento = 0;
    }

    // 20mo tipo de evento: Nuevo dia
    nuevo_dia(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        fila_actual.nroEvento = fila_anterior.nroEvento + 1;
        fila_actual.tipo_evento = `Inicio de un nuevo dia ${fila_anterior.reloj_dias + 1}`;
        fila_actual.reloj_dias = fila_anterior.reloj_dias + 1;
        fila_actual.reloj_mins = 0;

        // Eventos
        // Funcionamiento de Ferrys
        fila_actual.func_ferrys = 60;

        // Llegada de autos al continente
        fila_actual.rnd1_llegada_autos_cont = this.generador.generarNumeroAleatorio();
        fila_actual.rnd2_llegada_autos_cont = this.generador.generarNumeroAleatorio();
        fila_actual.t_llegada_autos_cont = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_llegada_auto_cont_manana, SParametros.getInstance().desviacion_llegada_auto_cont_manana, this.iteracion0.rnd1_llegada_autos_cont, this.iteracion0.rnd2_llegada_autos_cont);
        fila_actual.prox_llegada_autos_cont = this.iteracion0.t_llegada_autos_cont + this.iteracion0.reloj_mins;

        // Llegada de camiones al continente
        fila_actual.rnd1_llegada_camiones_cont = this.generador.generarNumeroAleatorio();
        fila_actual.rnd2_llegada_camiones_cont = this.generador.generarNumeroAleatorio();
        fila_actual.t_llegada_camiones_cont = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_llegada_camion_cont_manana, SParametros.getInstance().desviacion_llegada_camion_cont_manana, this.iteracion0.rnd1_llegada_camiones_cont, this.iteracion0.rnd2_llegada_camiones_cont);
        fila_actual.prox_llegada_camiones_cont = this.iteracion0.t_llegada_camiones_cont + this.iteracion0.reloj_mins;

        // Llegada de autos a la isla
        fila_actual.rnd1_llegada_autos_isla = 0;
        fila_actual.rnd2_llegada_autos_isla = 0;
        fila_actual.t_llegada_autos_isla = 0;
        fila_actual.prox_llegada_autos_isla = 0;

        // Llegada de camiones a la isla
        fila_actual.rnd1_llegada_camiones_isla = 0;
        fila_actual.rnd2_llegada_camiones_isla = 0;
        fila_actual.t_llegada_camiones_isla = 0;
        fila_actual.prox_llegada_camiones_isla = 0;

        // Fin de carga de auto(i);i=1,2
        fila_actual.rnd1_fin_carga_auto = 0;
        fila_actual.rnd2_fin_carga_auto = 0;
        fila_actual.t_fin_carga_auto = 0;
        fila_actual.fin_carga_auto_f1 = 0;
        fila_actual.fin_carga_auto_f2 = 0;

        // Fin de carga de camion(i);i=1,2
        fila_actual.rnd1_fin_carga_camion = 0;
        fila_actual.rnd2_fin_carga_camion = 0;
        fila_actual.t_fin_carga_camion = 0;
        fila_actual.fin_carga_camion_f1 = 0;
        fila_actual.fin_carga_camion_f2 = 0;

        // Fin de descarga de auto(i);i=1,2
        fila_actual.rnd1_fin_descarga_auto = 0;
        fila_actual.rnd2_fin_descarga_auto = 0;
        fila_actual.t_fin_descarga_auto = 0;
        fila_actual.fin_descarga_auto_f1 = 0;
        fila_actual.fin_descarga_auto_f2 = 0;

        // Fin de descarga de camion(i);i=1,2
        fila_actual.rnd1_fin_descarga_camion = 0;
        fila_actual.rnd2_fin_descarga_camion = 0;
        fila_actual.t_fin_descarga_camion = 0;
        fila_actual.fin_descarga_camion_f1 = 0;
        fila_actual.fin_descarga_camion_f2 = 0;

        // fin de mantenimiento
        fila_actual.inicio_mantenimiento = fila_actual.reloj_dias % 5 == 0 ? 59.99 : 0
        fila_actual.t_mantenimiento = 0;
        fila_actual.fin_mantenimiento = 0;

        // chequeo habilitacion para llegadas_isla y corte de llegadas a continente y a isla
        fila_actual.habilitacion_llegadas_isla = 180;
        fila_actual.corte_llegadas_isla = 660;
        fila_actual.corte_llegadas_cont = 750;
        fila_actual.fin_act_f1 = false; // cuando estas 2 variables sean true, se termina el dia
        fila_actual.fin_act_f2 = false;
        fila_actual.chequeo_fin_act_dia = 780;

        // fin de recorrido para los 2 ferrys
        fila_actual.rnd1_fin_recorrido = 0;
        fila_actual.rnd2_fin_recorrido = 0;
        fila_actual.t_fin_recorrido = 0;
        fila_actual.fin_recorrido_ferry_1 = 0;
        fila_actual.fin_recorrido_ferry_2 = 0;

        // Servidores: Ferry 1 y Ferry 2
        fila_actual.ferry_1 = {
            estado: Estaticas.E_LIBRE,
            // es multiplo de 5
            mantenimiento: fila_actual.reloj_dias % 5 == 0 && fila_anterior.ultimo_mantenimiento != 1 ? true : false,
            capacidad_restante: fila_anterior.ferry_1.capacidad_restante,
            localizacion: Estaticas.L_CONTINENTE,
            ult_loc_tierra: Estaticas.L_CONTINENTE
        }

        fila_actual.ferry_2 = {
            estado: Estaticas.E_LIBRE,
            mantenimiento: fila_actual.reloj_dias % 5 == 0 && fila_anterior.ultimo_mantenimiento == 1 ? true : false,
            capacidad_restante: fila_anterior.ferry_2.capacidad_restante,
            localizacion: Estaticas.L_CONTINENTE,
            ult_loc_tierra: Estaticas.L_CONTINENTE
        }

        fila_actual.ultimo_mantenimiento = fila_actual.ferry_1.mantenimiento ? 1 : fila_actual.ferry_2.mantenimiento ? 2 : fila_anterior.ultimo_mantenimiento; // que ferry sufrio el ultimo mantenimiento, valores: 1 o 2
        fila_actual.hora_salida_ferry_1 = 0;
        fila_actual.hora_salida_estimada_ferry_2 = 0;
        fila_actual.cola_continente = fila_anterior.cola_continente;
        fila_actual.cola_isla = fila_anterior.cola_isla;

        // Estadisticas
        //A: Cola maxima en continente y en isla
        fila_actual.cola_maxima_cont = fila_anterior.cola_maxima_cont;
        fila_actual.cola_maxima_isla = fila_anterior.cola_maxima_isla;

        // B: Promedio de autos y de autobuses en continente y en isla
        // Autos: 
        fila_actual.acum_autos_cont = fila_anterior.acum_autos_cont; // de continente a isla
        fila_actual.acum_autos_isla = fila_anterior.acum_autos_isla; // de isla a continente
        fila_actual.cantidad_dias = fila_actual.reloj_dias;
        fila_actual.promedio_autos_cont = fila_anterior.acum_autos_cont / fila_actual.cantidad_dias;
        fila_actual.promedio_autos_isla = fila_anterior.acum_autos_isla / fila_actual.cantidad_dias;

        // Camiones
        fila_actual.acum_camiones_cont = fila_anterior.acum_camiones_cont; // de continente a isla
        fila_actual.acum_camiones_isla = fila_anterior.acum_camiones_isla; // de isla a continente
        fila_actual.promedio_camiones_cont = fila_anterior.acum_camiones_cont / fila_actual.cantidad_dias;
        fila_actual.promedio_camiones_isla = fila_anterior.acum_camiones_isla / fila_actual.cantidad_dias;

        fila_anterior.acum_autos_esperan_hasta_dia_sgte += fila_anterior.clientes.length;
        fila_anterior.promedio_autos_esperan_hasta_dia_sgte = fila_anterior.acum_autos_esperan_hasta_dia_sgte / fila_anterior.reloj_dias
        fila_actual.promedio_autos_esperan_hasta_dia_sgte = fila_anterior.acum_autos_esperan_hasta_dia_sgte / fila_anterior.reloj_dias
        fila_actual.acum_autos_esperan_hasta_dia_sgte = fila_anterior.acum_autos_esperan_hasta_dia_sgte;

        this.array.push(fila_actual);
        return fila_actual;
    }

    // 21er tipo de evento: Inicio de mantenimiento
    inicio_mantenimiento(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;
        fila_actual.tipo_evento = `${Estaticas.E_INICIO_MANTENIMIENTO} ferry: ${fila_anterior.ultimo_mantenimiento}`;
        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.inicio_mantenimiento;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes al inicio de mantenimiento
        fila_actual.inicio_mantenimiento = 0;

        // paso 2: setear el ferry en mantenimiento
        fila_actual.t_mantenimiento = 300.01;
        fila_actual.fin_mantenimiento = fila_actual.t_mantenimiento + fila_actual.reloj_mins;

        if (fila_anterior.ultimo_mantenimiento == 1) {
            fila_actual.ferry_1.mantenimiento = true;
            fila_actual.ferry_1.estado = Estaticas.E_MANTENIMIENTO;
        }

        if (fila_anterior.ultimo_mantenimiento == 2) {
            fila_actual.ferry_2.mantenimiento = true;
            fila_actual.ferry_2.estado = Estaticas.E_MANTENIMIENTO;
        }

        this.array.push(fila_actual);
        return fila_actual;
    }

    // 22do tipo de evento: Fin de mantenimiento
    fin_mantenimiento(fila_anterior) {
        let fila_actual = structuredClone(fila_anterior);

        // paso 1: establecer los datos del evento
        fila_actual.nroEvento = fila_anterior.nroEvento + 1;
        fila_actual.tipo_evento = `${Estaticas.E_FIN_MANTENIMIENTO} ferry: ${fila_anterior.ultimo_mantenimiento}`;
        fila_actual.reloj_dias = fila_anterior.reloj_dias;
        fila_actual.reloj_mins = fila_anterior.fin_mantenimiento
        fila_actual.fin_mantenimiento = 0;

        // paso 1.b: resetear todos los rnds de la fila actual
        this.resetAllRnds(fila_actual);

        // paso 1.5: resetear los valores pertinentes al fin de mantenimiento
        fila_actual.fin_mantenimiento = 0;

        // paso 2: buscar el ferry que termino el mantenimiento
        if (fila_anterior.ferry_1.estado == Estaticas.E_MANTENIMIENTO) {
            fila_actual.ferry_1.mantenimiento = false;

            // si el ferry 1 estaba lleno
            if (fila_anterior.ferry_1.capacidad_restante == 0) {
                // entonces se va a la isla
                fila_actual.ferry_1.estado = Estaticas.E_VIAJANDO;
                fila_actual.ferry_1.localizacion = Estaticas.L_OCEANO;
                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => clte.estado = Estaticas.E_VIAJANDO_FERRY);
                fila_actual.clientes.filter(clte => clte.ferry_id == 1).forEach(clte => clte.localizacion = Estaticas.L_OCEANO);

                // calcular el tiempo de recorrido del ferry 1
                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                fila_actual.fin_recorrido_ferry_1 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
            } else {
                // tiene o uno o mas espacios
                // un solo espacio
                if (fila_anterior.ferry_1.capacidad_restante == 1) {
                    // pregunto si en la cola continente hay algun AUTO esperando carga
                    let auto = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.localizacion == Estaticas.L_CONTINENTE && clte.tipo == Estaticas.T_AUTO);
                    if (auto) { // hay un auto
                        // cargar el auto
                        fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                        fila_actual.ferry_1.capacidad_restante -= 1;
                        fila_actual.clientes.find(clte => clte.id == auto.id).estado = Estaticas.E_SIENDO_CARGADO;
                        fila_actual.clientes.find(clte => clte.id == auto.id).ferry_id = 1;
                        fila_actual.cola_continente -= 1;
                    } else { // no hay auto
                        // ferry 1 libre
                        fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                    }
                } else { // mas espacios
                    // pregunto si hay cola en el continente
                    if (fila_anterior.cola_continente >= 1) {
                        // hay cola, busco el primero de la cola
                        let auto = this.buscar_auto_a_cargar_en_continente(fila_anterior);
                        if (auto) {
                            if (auto.tipo == Estaticas.T_CAMION) {
                                // cargar el camion
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                fila_actual.ferry_1.capacidad_restante -= 2;
                                fila_actual.clientes.find(clte => clte.id == auto.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto.id).ferry_id = 1;
                                fila_actual.cola_continente -= 1;

                                // calcular el tiempo de carga del camion
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f1 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                            } else {
                                // es auto
                                // cargar el auto
                                fila_actual.ferry_1.estado = Estaticas.E_CARGANDO;
                                fila_actual.ferry_1.capacidad_restante -= 1;
                                fila_actual.clientes.find(clte => clte.id == auto.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto.id).ferry_id = 1;
                                fila_actual.cola_continente -= 1;

                                // calcular el tiempo de carga del auto
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f1 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                            }
                        } else {
                            // no hay cola, ferry libre
                            fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                        }
                    } else {
                        // no hay cola, ferry libre
                        fila_actual.ferry_1.estado = Estaticas.E_LIBRE;
                    }
                }
            }
        } else {
            fila_actual.ferry_2.mantenimiento = false;

            // si el ferry 2 estaba lleno
            if (fila_anterior.ferry_2.capacidad_restante == 0) {
                // entonces se va a la isla
                fila_actual.ferry_2.estado = Estaticas.E_VIAJANDO;
                fila_actual.ferry_2.localizacion = Estaticas.L_OCEANO;
                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => clte.estado = Estaticas.E_VIAJANDO_FERRY);
                fila_actual.clientes.filter(clte => clte.ferry_id == 2).forEach(clte => clte.localizacion = Estaticas.L_OCEANO);

                // calcular el tiempo de recorrido del ferry 2
                fila_actual.rnd1_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.rnd2_fin_recorrido = this.generador.generarNumeroAleatorio();
                fila_actual.t_fin_recorrido = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_recorrido, SParametros.getInstance().desviacion_recorrido, fila_actual.rnd1_fin_recorrido, fila_actual.rnd2_fin_recorrido);
                fila_actual.fin_recorrido_ferry_2 = fila_actual.t_fin_recorrido + fila_actual.reloj_mins;
            } else {
                // tiene o uno o mas espacios
                // un solo espacio
                if (fila_anterior.ferry_2.capacidad_restante == 1) {
                    // pregunto si en la cola continente hay algun AUTO esperando carga
                    let auto = fila_actual.clientes.find(clte => clte.estado == Estaticas.E_ESPERANDO_CARGA && clte.localizacion == Estaticas.L_CONTINENTE && clte.tipo == Estaticas.T_AUTO);
                    if (auto) { // hay un auto
                        // cargar el auto
                        fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                        fila_actual.ferry_2.capacidad_restante -= 1;
                        fila_actual.clientes.find(clte => clte.id == auto.id).estado = Estaticas.E_SIENDO_CARGADO;
                        fila_actual.clientes.find(clte => clte.id == auto.id).ferry_id = 2;
                        fila_actual.cola_continente -= 1;
                    } else { // no hay auto
                        // ferry 2 libre
                        fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                    }
                } else { // mas espacios
                    // pregunto si hay cola en el continente
                    if (fila_anterior.cola_continente >= 1) {
                        // hay cola, busco el primero de la cola
                        let auto = this.buscar_auto_a_cargar_en_continente(fila_anterior);
                        if (auto) {
                            if (auto.tipo == Estaticas.T_CAMION) {
                                // cargar el camion
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                fila_actual.ferry_2.capacidad_restante -= 2;
                                fila_actual.clientes.find(clte => clte.id == auto.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto.id).ferry_id = 2;
                                fila_actual.cola_continente -= 1;

                                // calcular el tiempo de carga del camion
                                fila_actual.rnd1_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_camion = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_camion = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_camion, SParametros.getInstance().desviacion_carga_camion, fila_actual.rnd1_fin_carga_camion, fila_actual.rnd2_fin_carga_camion);
                                fila_actual.fin_carga_camion_f2 = fila_actual.t_fin_carga_camion + fila_actual.reloj_mins;
                            } else {
                                // es auto
                                // cargar el auto
                                fila_actual.ferry_2.estado = Estaticas.E_CARGANDO;
                                fila_actual.ferry_2.capacidad_restante -= 1;
                                fila_actual.clientes.find(clte => clte.id == auto.id).estado = Estaticas.E_SIENDO_CARGADO;
                                fila_actual.clientes.find(clte => clte.id == auto.id).ferry_id = 2;
                                fila_actual.cola_continente -= 1;

                                // calcular el tiempo de carga del auto
                                fila_actual.rnd1_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.rnd2_fin_carga_auto = this.generador.generarNumeroAleatorio();
                                fila_actual.t_fin_carga_auto = this.generador.generar_tiempo_box_muller(SParametros.getInstance().media_carga_auto, SParametros.getInstance().desviacion_carga_auto, fila_actual.rnd1_fin_carga_auto, fila_actual.rnd2_fin_carga_auto);
                                fila_actual.fin_carga_auto_f2 = fila_actual.t_fin_carga_auto + fila_actual.reloj_mins;
                            }
                        } else {
                            // no hay cola, ferry libre
                            fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                        }
                    } else {
                        // no hay cola, ferry libre
                        fila_actual.ferry_2.estado = Estaticas.E_LIBRE;
                    }
                }
            }
        }

        this.array.push(fila_actual);
        return fila_actual;
    }

}