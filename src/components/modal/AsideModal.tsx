import React, { useContext } from "react";
import { FaTimesCircle } from "react-icons/fa";
import AppContext from "../../app/AppContext";

const AsideModal = () => {
  const { AppState, dispatch } = useContext(AppContext);
  return (
    <div
      className={`aside-modal__wrapper flex-center ${
        AppState.isAsideModalOpen ? "open--aside-modal" : ""
      }`}
    >
      <section className="aside-modal">
        <header className="aside-modal__header ">
          <p>Resize</p>
          <button
            className="btn flex-center aside-modal__close-btn"
            aria-label="close"
            onClick={() => {
              dispatch({ type: "CHANGE_ASIDE_MODAL", payload: false });
            }}
          >
            <FaTimesCircle />
          </button>
        </header>
        <article className="aside-modal__content">
          <output className="output">{AppState.nodeMaxWidth}</output>
          <input
            type="range"
            min={window.innerHeight < 500 ? "15" : "25"}
            max={window.innerHeight < 500 ? "30" : "50"}
            value={AppState.nodeMaxWidth}
            onChange={(e) => {
              dispatch({
                type: "CHANGE_NODE_MAX_WIDTH",
                payload: parseInt(e.target.value),
              });
            }}
            className="range"
          />
        </article>
      </section>
    </div>
  );
};

export default AsideModal;
