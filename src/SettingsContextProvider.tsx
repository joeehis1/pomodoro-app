import React, { useState } from "react";

import { SettingsContext } from "./SettingsContext";

import { CurrentAccent, FontFamily } from "./enums";

// const WORK = 25 * 60
// const SHORT = 5 * 60
// const LONG = 15 * 60

export default function SettingsContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [work, setWork] = useState(25 * 60);
    // const work = 20;
    const [shortBreak, setShortBreak] = useState(5 * 60);
    // const shortBreak = 5;
    const [longBreak, setLongBreak] = useState(15 * 60);
    const [color, setColor] = useState<CurrentAccent>(CurrentAccent.Orange);
    const [fontFamily, setFontFamily] = useState<FontFamily>(FontFamily.Kumbh);

    function updateSettings(
        work: number,
        shortBreak: number,
        longBreak: number,
        color: CurrentAccent,
        font: FontFamily
    ) {
        // console.log(work);
        setLongBreak(longBreak);
        setShortBreak(shortBreak);
        setWork(work);
        setColor(color);
        setFontFamily(font);
    }

    return (
        <SettingsContext.Provider
            value={{
                work,
                shortBreak,
                longBreak,
                updateSettings,
                color,
                fontFamily,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}
