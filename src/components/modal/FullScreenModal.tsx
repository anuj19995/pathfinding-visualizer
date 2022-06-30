import React, { useContext } from "react";
import AppContext from "../../app/AppContext";

const FullScreenModal = () => {
  const { dispatch } = useContext(AppContext);
  const changeFullScreen = () => {
    const fullScreenCheck = () => {
      if (document.fullscreenElement) return;
      return document.documentElement.requestFullscreen();
    };

    const rotate = async () => {
      try {
        if (
          screen.orientation.type !== "landscape-secondary" &&
          screen.orientation.type !== "landscape-primary"
        ) {
          await fullScreenCheck();
          await screen.orientation.lock("landscape");
        }
        dispatch({ type: "CHANGE_FULLSCREEN_MODEL", payload: false });
      } catch (error) {
        console.log(error);
      }
    };
    rotate();
  };
  return (
    <div className="fullscreen-modal flex-center">
      <button className="btn fullscreen-modal__btn" onClick={changeFullScreen}>
        let's go...
      </button>
    </div>
  );
};

export default FullScreenModal;
