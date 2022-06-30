import React, { useContext } from "react";
import { GiResize } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { FaChessBoard, FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import AppContext from "../app/AppContext";
const Aside = () => {
  const { AppState, dispatch } = useContext(AppContext);
  return (
    <aside className="aside">
      <button
        className="flex-center btn aside-btn"
        aria-label="settings"
        title="Settings"
        onClick={() => {
          dispatch({ type: "OPEN_SETTINGS", payload: true });
        }}
      >
        <FiSettings />
      </button>
      <button
        className="flex-center btn aside-btn"
        aria-label="resize"
        title="Resize"
        onClick={() => {
          dispatch({ type: "CHANGE_ASIDE_MODAL", payload: true });
        }}
      >
        <GiResize />
      </button>
      <button
        className="flex-center btn aside-btn"
        aria-label="clear board"
        title="Clear Board"
        onClick={() => {
          dispatch({
            type: "CLEAR_BOARD",
            payload: !AppState.isBoardClear,
          });
        }}
      >
        <FaChessBoard />
      </button>
      <button
        className="flex-center btn aside-btn"
        aria-label="play/pause"
        title="Play / Pause"
        onClick={() => {
          if (AppState.isMazeAnimationComplete) {
            dispatch({ type: "CHANGE_PLAY", payload: !AppState.isPlay });
          }
        }}
      >
        {AppState.isMazeAnimationComplete ? (
          AppState.isPlay ? (
            <FaPauseCircle />
          ) : (
            <FaPlayCircle />
          )
        ) : (
          <FaPlayCircle />
        )}
      </button>
    </aside>
  );
};

export default Aside;
