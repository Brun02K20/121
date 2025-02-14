/* eslint-disable react/prop-types */
import React from "react";

const Reporte = ({ data }) => {
  return (
    <div>
      <h1>Reporte</h1>
      <h4>A</h4>
      <p>Cola maxima continente: {data.cola_maxima_cont}</p>
      <p>Cola maxima isla: {data.cola_maxima_isla}</p>

      <h4>B</h4>
      <p>Promedio de autos de continente a isla: {data.promedio_autos_cont}</p>
      <p>Promedio de autos de isla a continente: {data.promedio_autos_isla}</p>

      <p>
        Promedio de camiones/omnibus de continente a isla:{" "}
        {data.promedio_camiones_cont}
      </p>
      <p>
        Promedio de camiones/omnibus de isla a continente:{" "}
        {data.promedio_camiones_isla}
      </p>

      <h4>C</h4>
      <p>
        Promedio de vehiculos (cualquier tipo) que esperan hasta el dia
        siguiente: {data.promedio_autos_esperan_hasta_dia_sgte}
      </p>
    </div>
  );
};

export { Reporte };
