import { createContext } from "react";
// import { CurrentAccent } from "./enums";
import { CurrentAccent, FontFamily } from "./enums";

interface SettingsContextType {
    work: number;
    shortBreak: number;
    longBreak: number;
    color: CurrentAccent;
    fontFamily: FontFamily;

    updateSettings: (
        work: number,
        shortBreak: number,
        longBreak: number,
        color: CurrentAccent,
        font: FontFamily
    ) => void;
}

export const SettingsContext = createContext<null | SettingsContextType>(null);
