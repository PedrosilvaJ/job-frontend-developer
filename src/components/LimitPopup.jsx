import React from "react";
import { useNavigate } from "react-router-dom";

const LimitPopup = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
    onClose(); // Fecha o popup ao voltar para home
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Aviso</h2>
        <p className="mb-4">{message}</p>
        <button 
          onClick={handleGoHome} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Voltar para Home
        </button>
      </div>
    </div>
  );
};

export default LimitPopup;
