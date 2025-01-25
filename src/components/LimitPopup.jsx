import React from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/main.css';
import '../assets/styles/limitipopup.css';

const LimitPopup = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
    onClose();
  };

  return (
    <div className="box-popup">
      <div className="container-popup">
        <div>
          <h2 className="title-popup">Aviso</h2>
          <p className="message-popup">{message}</p>
          <button
            onClick={handleGoHome}
            className="button-popup"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LimitPopup;
