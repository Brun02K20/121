/* eslint-disable react/prop-types */
import React from "react";
import { Modal, Table, Button } from "react-bootstrap";

const round = (num, decimales) => {
  if (num === 0) return 0;
  return parseFloat(num).toFixed(decimales);
};

const ClientTable = ({ show, handleClose, clientes }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Clientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clientes.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ferry id</th>
                  <th>Estado</th>
                  <th>Tipo</th>
                  <th>Loc Actual</th>
                  <th>Loc Destino</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id || "-"}</td>
                    <td>{cliente.ferry_id || "-"}</td>
                    <td>{cliente.estado || "-"}</td>
                    <td>{cliente.tipo || "-"}</td>
                    <td>{cliente.localizacion || "-"}</td>
                    <td>{cliente.destino || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h3>No hay clientes en esta iteración</h3>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ClientTable };
