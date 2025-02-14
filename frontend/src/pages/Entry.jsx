/* eslint-disable react/prop-types */
import React from "react";
import { colasServices } from "../services/sim.service";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Entry = ({ setRespuestas }) => {
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cant_iteraciones_a_mostrar: 500,
      dia_inicio_muestra: 1,
      hora_inicio_muestra: 0,
    },
  });

  const llamarSimulacion = async (data) => {
    const tabla = await colasServices.simular(data);
    setRespuestas(tabla);
    navigate("/table");
  };

  const onSubmit = async (data) => {
    data.cant_iteraciones_a_mostrar = parseInt(data.cant_iteraciones_a_mostrar);
    data.dia_inicio_muestra = parseInt(data.dia_inicio_muestra);
    data.hora_inicio_muestra = parseInt(data.hora_inicio_muestra);
    console.log(data);
    await llamarSimulacion(data);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Bienvenido a la simulacion de Transbordadores</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="cant_iteraciones_a_mostrar" className="form-label">
            N° iteraciones a mostrar
          </label>
          <input
            {...register("cant_iteraciones_a_mostrar", {
              required: { value: true, message: "Este campo es requerido" },
              min: { value: 1, message: "Debe ser mayor a 0" },
              max: { value: 8000, message: "Debe ser menor o igual a 8000" },
            })}
            type="number"
            className="form-control"
            placeholder="Cant it"
            id="cant_iteraciones_a_mostrar"
            name="cant_iteraciones_a_mostrar"
          />
          {errors.cant_iteraciones_a_mostrar && (
            <div className="text-danger">
              {errors.cant_iteraciones_a_mostrar.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="dia_inicio_muestra" className="form-label">
            Dia inicio
          </label>
          <input
            {...register("dia_inicio_muestra", {
              required: { value: true, message: "Este campo es requerido" },
              min: { value: 1, message: "Debe ser mayor a 0" },
              max: { value: 31, message: "Debe ser menor o igual a 31" },
            })}
            type="number"
            className="form-control"
            placeholder="Dia inicio"
            id="dia_inicio_muestra"
            name="dia_inicio_muestra"
          />
          {errors.dia_inicio_muestra && (
            <div className="text-danger">
              {errors.dia_inicio_muestra.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="hora_inicio_muestra" className="form-label">
            Hora inicio
          </label>
          <input
            {...register("hora_inicio_muestra", {
              required: { value: true, message: "Este campo es requerido" },
              min: { value: 0, message: "Debe ser mayor o igual a 0" },
              max: {
                value: 600,
                message: "Debe ser menor o igual a minuto 600",
              },
            })}
            type="number"
            className="form-control"
            placeholder="Hora inicio"
            id="hora_inicio_muestra"
            name="hora_inicio_muestra"
          />
          {errors.hora_inicio_muestra && (
            <div className="text-danger">This field is required</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export { Entry };
