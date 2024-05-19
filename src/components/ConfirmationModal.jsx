import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <p>¿Estas seguro de que quieres eliminar esta tarea?</p>
        <button className="cancel" onClick={onClose}>
          Mejor no...
        </button>
        <button className="confirm" onClick={onConfirm}>
          Dale Compadre!
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
