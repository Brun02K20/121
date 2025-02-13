import React from "react";
import { colasServices } from "../services/sim.service";
import { useNavigate } from "react-router-dom";

const Entry = ({ setRespuestas }) => {
  const navigate = useNavigate();

  const llamarSimulacion = async () => {
    const tabla = await colasServices.simular();
    setRespuestas(tabla);
  };

  return (
    <>
      <h2>Bienvenido a la simulacion de Transbordadores</h2>
      <button
        onClick={async () => {
          await llamarSimulacion();
          navigate("/table");
        }}
      >
        Simular
      </button>
    </>
  );
};

export { Entry };
