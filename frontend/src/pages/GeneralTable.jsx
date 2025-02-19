/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { ClientTable } from "../components/ClientTable";
import { Reporte } from "../components/Reporte";

const GeneralTable = ({ tabla }) => {
  const [show, setShow] = useState(false);
  const [clientes, setClientes] = useState([]);

  const handleShow = (clientes) => {
    setClientes(clientes);
    setShow(true);
  };

  const handleClose = () => {
    setClientes([]);
    setShow(false);
  };

  const round = (num) => {
    if (num === null || num === "") return null;
    if (num === 0) return 0;
    return parseFloat(num).toFixed(2);
  };

  return (
    <>
      <Table responsive striped bordered hover className="table-auto-width">
        <thead
          style={{
            position: "sticky",
            top: "0",
            zIndex: "1",
            backgroundColor: "white",
          }}
        >
          <tr>
            <th rowSpan={2}>i</th>
            <th rowSpan={2}>Tipo Ev</th>
            <th rowSpan={2}>N° dia</th>
            <th rowSpan={2}>Min</th>
            <th rowSpan={2}>Func Ferrys</th>

            <th colSpan={4}>Llegada autos continente</th>
            <th colSpan={4}>Llegada camiones continente</th>
            <th colSpan={4}>Llegada autos isla</th>
            <th colSpan={4}>Llegada camiones isla</th>

            <th colSpan={5}>Fin carga auto (i=1,2)</th>
            <th colSpan={5}>Fin carga camión (i=1,2)</th>

            <th colSpan={5}>Fin descarga auto (i=1,2)</th>
            <th colSpan={5}>Fin descarga camión (i=1,2)</th>
            <th colSpan={5}>Fin recorrido (i=1,2)</th>

            <th colSpan={2}>Mantenimiento</th>
            <th colSpan={3}>Habilitaciones y cortes</th>

            <th colSpan={4}>Información del ferry 1</th>
            <th colSpan={4}>Información del ferry 2</th>

            <th colSpan={2}>Colas</th>

            <th colSpan={2}>Colas máximas</th>

            <th colSpan={4}>Promedio de autos por día</th>
            <th colSpan={4}>Promedio de camiones por día</th>

            <th colSpan={2}>Vehículos en espera</th>
            <th rowSpan={2}>Clientes</th>
          </tr>

          <tr>
            {/* Subencabezados */}
            <th>RND1</th>
            <th>RND2</th>
            <th>T. llegada</th>
            <th>T. prox llegada</th>

            <th>RND1</th>
            <th>RND2</th>
            <th>T. llegada</th>
            <th>T. prox llegada</th>

            <th>RND1</th>
            <th>RND2</th>
            <th>T. llegada</th>
            <th>T. prox llegada</th>

            <th>RND1</th>
            <th>RND2</th>
            <th>T. llegada</th>
            <th>T. prox llegada</th>

            <th>RND1</th>
            <th>RND2</th>
            <th>T. carga</th>
            <th>HF carga(1)</th>
            <th>HF carga(2)</th>

            <th>RND1</th>
            <th>RND2</th>
            <th>T. carga</th>
            <th>HF carga(1)</th>
            <th>HF carga(2)</th>

            <th>RND1</th>
            <th>RND2</th>
            <th>T. descarga</th>
            <th>HF descarga(1)</th>
            <th>HF descarga(2)</th>

            <th>RND1</th>
            <th>RND2</th>
            <th>T. descarga</th>
            <th>HF descarga(1)</th>
            <th>HF descarga(2)</th>

            <th>RND1</th>
            <th>RND2</th>
            <th>T. recorr</th>
            <th>HF recorr(1)</th>
            <th>HF recorr(2)</th>

            <th>T. mant</th>
            <th>HF mant</th>

            <th>Hab llegadas isla</th>
            <th>Corte llegadas cont</th>
            <th>Corte llegadas isla</th>

            <th>Estado</th>
            <th>Cap rest</th>
            <th>Loc act</th>
            <th>Ult loc terr</th>

            <th>Estado</th>
            <th>Cap rest</th>
            <th>Loc act</th>
            <th>Ult loc terr</th>

            <th>Cola cont</th>
            <th>Cola isla</th>

            <th>Cola max cont</th>
            <th>Cola max isla</th>

            <th>Cont a isla</th>
            <th>Isla a cont</th>
            <th>Prom (1)</th>
            <th>Prom (2)</th>

            <th>Cont a isla</th>
            <th>Isla a cont</th>
            <th>Prom (1)</th>
            <th>Prom (2)</th>

            <th>Acum</th>
            <th>Prom</th>
          </tr>
        </thead>

        <tbody>
          {tabla?.map((fila, index) => (
            <tr key={index}>
              <td>{fila.nroEvento}</td>
              <td>{fila.tipo_evento}</td>
              <td>{fila.reloj_dias}</td>
              <td>{round(fila.reloj_mins)}</td>
              <td>{fila.func_ferrys || ""}</td>

              <td>{round(fila.rnd1_llegada_autos_cont) || ""}</td>
              <td>{round(fila.rnd2_llegada_autos_cont) || ""}</td>
              <td>{round(fila.t_llegada_autos_cont) || ""}</td>
              <td>{round(fila.prox_llegada_autos_cont) || ""}</td>

              <td>{round(fila.rnd1_llegada_camiones_cont) || ""}</td>
              <td>{round(fila.rnd2_llegada_camiones_cont) || ""}</td>
              <td>{round(fila.t_llegada_camiones_cont) || ""}</td>
              <td>{round(fila.prox_llegada_camiones_cont) || ""}</td>

              <td>{round(fila.rnd1_llegada_autos_isla) || ""}</td>
              <td>{round(fila.rnd2_llegada_autos_isla) || ""}</td>
              <td>{round(fila.t_llegada_autos_isla) || ""}</td>
              <td>{round(fila.prox_llegada_autos_isla) || ""}</td>

              <td>{round(fila.rnd1_llegada_camiones_isla) || ""}</td>
              <td>{round(fila.rnd2_llegada_camiones_isla) || ""}</td>
              <td>{round(fila.t_llegada_camiones_isla) || ""}</td>
              <td>{round(fila.prox_llegada_camiones_isla) || ""}</td>

              <td>{round(fila.rnd1_fin_carga_auto) || ""}</td>
              <td>{round(fila.rnd2_fin_carga_auto) || ""}</td>
              <td>{round(fila.t_fin_carga_auto) || ""}</td>
              <td>{round(fila.fin_carga_auto_f1) || ""}</td>
              <td>{round(fila.fin_carga_auto_f2) || ""}</td>

              <td>{round(fila.rnd1_fin_carga_camion) || ""}</td>
              <td>{round(fila.rnd2_fin_carga_camion) || ""}</td>
              <td>{round(fila.t_fin_carga_camion) || ""}</td>
              <td>{round(fila.fin_carga_camion_f1) || ""}</td>
              <td>{round(fila.fin_carga_camion_f2) || ""}</td>

              <td>{round(fila.rnd1_fin_descarga_auto) || ""}</td>
              <td>{round(fila.rnd2_fin_descarga_auto) || ""}</td>
              <td>{round(fila.t_fin_descarga_auto) || ""}</td>
              <td>{round(fila.fin_descarga_auto_f1) || ""}</td>
              <td>{round(fila.fin_descarga_auto_f2) || ""}</td>

              <td>{round(fila.rnd1_fin_descarga_camion) || ""}</td>
              <td>{round(fila.rnd2_fin_descarga_camion) || ""}</td>
              <td>{round(fila.t_fin_descarga_camion) || ""}</td>
              <td>{round(fila.fin_descarga_camion_f1) || ""}</td>
              <td>{round(fila.fin_descarga_camion_f2) || ""}</td>

              <td>{round(fila.rnd1_fin_recorrido) || ""}</td>
              <td>{round(fila.rnd2_fin_recorrido) || ""}</td>
              <td>{round(fila.t_fin_recorrido) || ""}</td>
              <td>{round(fila.fin_recorrido_ferry_1) || ""}</td>
              <td>{round(fila.fin_recorrido_ferry_2) || ""}</td>

              <td>{fila.t_mantenimiento || ""}</td>
              <td>{fila.fin_mantenimiento || ""}</td>

              <td>{fila.habilitacion_llegadas_isla || ""}</td>
              <td>{fila.corte_llegadas_isla || ""}</td>
              <td>{fila.corte_llegadas_cont || ""}</td>

              <td>{fila.ferry_1.estado}</td>
              <td>{fila.ferry_1.capacidad_restante}</td>
              <td>{fila.ferry_1.localizacion}</td>
              <td>{fila.ferry_1.ult_loc_tierra}</td>

              <td>{fila.ferry_2.estado}</td>
              <td>{fila.ferry_2.capacidad_restante}</td>
              <td>{fila.ferry_2.localizacion}</td>
              <td>{fila.ferry_2.ult_loc_tierra}</td>

              <td>{fila.cola_continente}</td>
              <td>{fila.cola_isla}</td>

              <td>{fila.cola_maxima_cont}</td>
              <td>{fila.cola_maxima_isla}</td>

              <td>{fila.acum_autos_cont}</td>
              <td>{fila.acum_autos_isla}</td>
              <td>{round(fila.promedio_autos_cont)}</td>
              <td>{round(fila.promedio_autos_isla)}</td>

              <td>{fila.acum_camiones_cont}</td>
              <td>{fila.acum_camiones_isla}</td>
              <td>{round(fila.promedio_camiones_cont)}</td>
              <td>{round(fila.promedio_camiones_isla)}</td>

              <td>{fila.acum_autos_esperan_hasta_dia_sgte}</td>
              <td>{round(fila.promedio_autos_esperan_hasta_dia_sgte)}</td>
              {/* Aca todos los datos de la fila */}
              <td>
                <Button
                  variant="link"
                  onClick={() => handleShow(fila.clientes)}
                >
                  VER MÁS
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ClientTable show={show} handleClose={handleClose} clientes={clientes} />

      <Reporte data={tabla[tabla.length - 1]} />
    </>
  );
};

export { GeneralTable };
