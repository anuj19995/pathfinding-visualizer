import React, { useContext, useRef } from "react";
import { IoMdSpeedometer } from "react-icons/io";
import { FaSitemap, FaRegTimesCircle } from "react-icons/fa";
import { GiMaze, GiBrickWall, GiPathDistance, GiWeight } from "react-icons/gi";
import AppContext from "../app/AppContext";
import Modal from "./modal/Modal";
import { mazesPatterns, algorithms, speed } from "../assets/data";
import { VertexType } from "../types";

const Settings = () => {
  const weightArr = useRef([] as VertexType[]);
  const { AppState, dispatch } = useContext(AppContext);
  return (
    <section
      className={`settings-section  ${
        AppState.isSettingsOpen ? "settings--open" : ""
      }`}
    >
      <header className="settings-section__header">
        <h2 className="settings__heading">Settings</h2>
        <button
          className="btn settings__close-btn flex-center"
          aria-label="settings close "
          title="Settings Close"
          onClick={() => {
            dispatch({ type: "OPEN_SETTINGS", payload: false });
          }}
        >
          <FaRegTimesCircle />
        </button>
      </header>
      <section className="settings-section__content">
        <aside className="settings-types">
          <button
            className={`btn setting-btn ${
              AppState.modalState.heading === "mazes & patterns"
                ? "selected"
                : ""
            }`}
            aria-label="choose mazes"
            title="Choose Mazes"
            onClick={() => {
              dispatch({ type: "CHANGE_MODAL_STATE", payload: mazesPatterns });
            }}
          >
            <span className="flex-center">
              <GiMaze />
            </span>
            <span>Mazes & Patterns</span>
          </button>
          <button
            className={`btn setting-btn ${
              AppState.modalState.heading === "algorithms" ? "selected" : ""
            }`}
            aria-label="Choose Algorithm"
            title="Choose Algorithm"
            onClick={() => {
              dispatch({ type: "CHANGE_MODAL_STATE", payload: algorithms });
            }}
          >
            <span className="flex-center">
              <FaSitemap />
            </span>
            <span>Algorithms</span>
          </button>
          <button
            className={`btn setting-btn ${
              AppState.modalState.heading === "speed" ? "selected" : ""
            }`}
            aria-label="Change Speed"
            title="Change Speed"
            onClick={() => {
              dispatch({ type: "CHANGE_MODAL_STATE", payload: speed });
            }}
          >
            <span className="flex-center">
              <IoMdSpeedometer />
            </span>
            <span>Speed</span>
          </button>
          <button
            className="btn setting-btn "
            aria-label="Add Weight"
            title="Add Weight"
            onClick={(event) => {
              if (
                !AppState.isMazeAnimationComplete ||
                !AppState.isAnimationComplete
              ) {
                event.preventDefault();
                return;
              }
              weightArr.current.forEach(({ x, y }) => {
                let elm = document.getElementById(`node-${x}-${y}`)!;
                elm.textContent = "";
                elm.removeAttribute("data-weight");
              });
              weightArr.current = [];
              let { row, column } = AppState.grid,
                r = 0,
                c = 0,
                weight = 0,
                elm: HTMLElement;
              for (let i = 0; i < 100; i++) {
                r = Math.floor(Math.random() * row);
                c = Math.floor(Math.random() * column);
                elm = document.getElementById(`node-${r}-${c}`)!;
                let isValid =
                  !elm.hasChildNodes() &&
                  !elm.classList.contains("black-node") &&
                  !elm.classList.contains("black-node-1");
                if (isValid) {
                  weight = Math.floor(Math.random() * 40) + 10;
                  weightArr.current.push({ x: r, y: c });
                  elm.setAttribute("data-weight", `${weight}`);
                  elm.textContent = `${weight}`;
                }
              }
              dispatch({
                type: "CHANGE_FIND_ANIMATION_NODES",
                payload: true,
              });
            }}
          >
            <span className="flex-center">
              <GiWeight />
            </span>
            <span>Add Weight</span>
          </button>
          <button
            className="btn setting-btn "
            aria-label="Clear Path"
            title="Clear Path"
            onClick={(event) => {
              if (
                !AppState.isMazeAnimationComplete ||
                !AppState.isAnimationComplete
              ) {
                event.preventDefault();
                return;
              }
              document.querySelectorAll(".path-node").forEach((node) => {
                node.classList.remove("visited-node");
                node.classList.remove("path-node");
              });
              document.querySelectorAll(".visited-node").forEach((node) => {
                node.classList.remove("visited-node");
              });
              document.querySelectorAll(".path-node-1").forEach((node) => {
                node.classList.remove("visited-node-1");
                node.classList.remove("path-node-1");
              });
              document.querySelectorAll(".visited-node-1").forEach((node) => {
                node.classList.remove("visited-node-1");
              });
            }}
          >
            <span className="flex-center">
              <GiPathDistance />
            </span>
            <span>Clear Path</span>
          </button>
          <button
            className="btn setting-btn "
            aria-label="Clear Walls"
            title="Clear Walls"
            onClick={(event) => {
              if (
                !AppState.isMazeAnimationComplete ||
                !AppState.isAnimationComplete
              ) {
                event.preventDefault();
                return;
              }
              document.querySelectorAll(".black-node").forEach((node) => {
                node.classList.remove("black-node");
              });
              document.querySelectorAll(".black-node-1").forEach((node) => {
                node.classList.remove("black-node-1");
              });
              dispatch({
                type: "CHANGE_FIND_ANIMATION_NODES",
                payload: true,
              });
              dispatch({ type: "MAZE_ANIMATION_COMPLETE", payload: true });
              dispatch({ type: "CHANGE_MAZE", payload: "" });
            }}
          >
            <span className="flex-center">
              <GiBrickWall />
            </span>
            <span>Clear Walls</span>
          </button>
        </aside>
        {AppState.modalState.name === "mazes" ? (
          <Modal
            radioState={AppState.maze}
            handleChange={(e) => {
              dispatch({
                type: "CHANGE_FIND_ANIMATION_NODES",
                payload: true,
              });
              dispatch({ type: "OPEN_SETTINGS", payload: false });
              dispatch({ type: "MAZE_ANIMATION_COMPLETE", payload: false });
              dispatch({ type: "CHANGE_MAZE", payload: e.target.value });
            }}
          >
            <GiMaze />
          </Modal>
        ) : AppState.modalState.name === "algorithm" ? (
          <Modal
            radioState={AppState.algorithm}
            handleChange={(e) => {
              dispatch({ type: "CHANGE_FIND_ANIMATION_NODES", payload: true });
              dispatch({ type: "CHANGE_ALGORITHM", payload: e.target.value });
            }}
          >
            <FaSitemap />
          </Modal>
        ) : (
          <Modal
            radioState={AppState.speed}
            handleChange={(e) => {
              dispatch({ type: "CHANGE_SPEED", payload: e.target.value });
            }}
          >
            <IoMdSpeedometer />
          </Modal>
        )}
      </section>
    </section>
  );
};

export default Settings;
