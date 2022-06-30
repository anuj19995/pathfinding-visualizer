import React, { useContext } from "react";
import AppContext from "../../app/AppContext";
import { FaWalking } from "react-icons/fa";
import { GiRaceCar, GiTurtle } from "react-icons/gi";
import { ModalType } from "../../types";

const Modal: React.FC<ModalType> = ({ children, handleChange, radioState }) => {
  const { AppState } = useContext(AppContext);
  return (
    <section className="modal">
      <header className="modal__header ">
        <p className="modal__heading">
          <span className="flex-center modal__header__icon">{children}</span>
          <span>{AppState.modalState.heading}</span>
        </p>
      </header>
      <article
        className={`modal__content ${
          AppState.modalState.name === "speed" ? "modal__speed" : ""
        }`}
      >
        {AppState.modalState.list.map(({ title, value, id }) => {
          return (
            <div className="radio-container" key={id}>
              <input
                type="radio"
                aria-label={title}
                name={AppState.modalState.name}
                checked={radioState === value}
                value={value}
                onChange={handleChange}
                className={`radio flex-center ${
                  radioState === value ? "selected" : ""
                }`}
              />
              {AppState.modalState.name === "speed" && (
                <p
                  className={`speed__icon flex-center ${
                    radioState === value ? "selected" : ""
                  }`}
                >
                  {title === "slow" ? (
                    <GiTurtle />
                  ) : title === "normal" ? (
                    <FaWalking />
                  ) : (
                    <GiRaceCar />
                  )}
                </p>
              )}
              <p className={`${radioState === value ? "selected" : ""}`}>
                {title}
              </p>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default Modal;
