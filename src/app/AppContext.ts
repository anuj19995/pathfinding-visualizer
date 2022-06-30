import React, { createContext } from "react";
import { AppStateType, ActionType } from "../types";

interface AppContextType {
  AppState: AppStateType;
  dispatch: React.Dispatch<ActionType>;
}

const AppContext = createContext({} as AppContextType);

export default AppContext;
