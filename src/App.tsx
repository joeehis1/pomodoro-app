import React, {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { SettingsContext } from "./SettingsContext";
// import SettingsContextProvider from "./SettingsContextProvider";

import { DurationType, TimerStatus, CurrentAccent, FontFamily } from "./enums";

function formatTimeString(number: number): string {
    const mins = Math.floor(number / 60);
    const secs = Math.floor(number % 60);
    // console.log(mins, secs);
    const shownMin = mins < 10 ? `0${mins}` : `${mins}`;
    const shownSecs = secs < 10 ? `0${secs}` : `${secs}`;
    return `${shownMin}:${shownSecs}`;
}

// console.log(formatTimeString(54));

// Timer count is the number of times the timer should run before a pomodoro

const TIMER_COUNT: number = 4;

function App() {
    const { fontFamily } = useContext(SettingsContext);

    useEffect(() => {
        document.body.className = fontFamily;
    }, [fontFamily]);

    return (
        <>
            <Header />
            <AppBody />
        </>
    );
}

function Header() {
    return (
        <div className="container">
            <header>
                <h1>pomodoro</h1>
            </header>
        </div>
    );
}

interface ImperativeRef {
    getlastElem: () => HTMLElement;
    focusInput: () => void;
    focusLastElem: () => void;
}

function AppBody() {
    const [currentDurationType, setCurrentDurationType] =
        useState<null | DurationType>(DurationType.Work);

    const [timerStatus, setTimerStatus] = useState<TimerStatus>(
        TimerStatus.Paused
    );

    // modal state starts here

    // const [modalShown, setModalShown] = useState<boolean>(false);

    // const formRef = useRef<ImperativeRef>(null);
    // const firstElem = useRef<HTMLButtonElement>(null);
    // const dialogRef = useRef<HTMLDivElement>(null);
    // const dialogOpenBtnRef = useRef<HTMLButtonElement>();

    // function handleKeyDown(e: React.KeyboardEvent) {
    //     if (modalShown) {
    //         if (e.code === "Escape") {
    //             closeModal();
    //             return;
    //         }
    //         if (e.code === "Tab" && !e.shiftKey) {
    //             const f = document.activeElement;
    //             if (f === formRef.current.getlastElem()) {
    //                 e.preventDefault();
    //                 firstElem.current.focus();
    //                 return;
    //             }
    //         }

    //         if (e.shiftKey) {
    //             if (e.code === "Tab") {
    //                 const f = document.activeElement;

    //                 if (f === firstElem.current) {
    //                     e.preventDefault();
    //                     console.log("i ran");
    //                     formRef.current.focusLastElem();
    //                     return;
    //                 }
    //             }
    //         }
    //     }
    // }

    // function closeModal() {
    //     setModalShown(false);
    //     dialogOpenBtnRef?.current.focus();
    // }

    // function handleOutsideDialogClick(e: React.MouseEvent) {
    //     const target = e.target as HTMLElement;
    //     if (dialogRef?.current?.contains(target)) {
    //         return;
    //     }
    //     closeModal();
    //     return;
    // }

    return (
        <main>
            {/* Duration type goes here */}
            <RunningDuration currentDurationType={currentDurationType} />
            {/* {Clock goes here} */}
            <Timer
                timerStatus={timerStatus}
                setTimerStatus={setTimerStatus}
                currentDurationType={currentDurationType}
                setCurrentDurationType={setCurrentDurationType}
            />
            {/* <section className="settings">
                <button
                    className="btn btn-settings"
                    ref={dialogOpenBtnRef}
                    onClick={() => {
                        if (timerStatus === TimerStatus.Running) {
                            return;
                        }
                        setModalShown(true);
                        setTimeout(() => {
                            formRef.current.focusInput();
                        }, 100);
                        // ;
                    }}
                >
                    <span className="sr-only">Show settings</span>
                    <i className="fa-solid fa-gear"></i>
                </button>
                <div
                    className="settings-dialog-overlay"
                    data-visible={modalShown}
                    onClick={handleOutsideDialogClick}
                >
                    <div aria-hidden={true} className="overlay-elem"></div>
                    <div
                        className="settings-dialog"
                        role="dialog"
                        aria-labelledby="modal-heading"
                        aria-hidden={!modalShown}
                        aria-describedby="modal-description"
                        onKeyDown={handleKeyDown}
                        ref={dialogRef}
                    >
                        <div className="modal-header">
                            <h2 id="modal-heading">Settings</h2>
                            <p className="sr-only" id="modal-description">
                                This is a modal that that includes a form that
                                is being used to configure some of the
                                application's colors, the font and the duration
                                of work and rest periods.
                            </p>
                            <button
                                onClick={() => closeModal()}
                                ref={firstElem}
                            >
                                <span className="sr-only">Close Button</span>
                                <i className="fa-solid fa-rectangle-xmark"></i>
                            </button>
                        </div>
                        <SettingsForm ref={formRef} closeModal={closeModal} />
                    </div>
                </div>
            </section> */}
            <DialogElem timerStatus={timerStatus} />
        </main>
    );
}

function DialogElem({ timerStatus }: { timerStatus: TimerStatus }) {
    const [modalShown, setModalShown] = useState<boolean>(false);

    const formRef = useRef<ImperativeRef>(null);
    const firstElem = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const dialogOpenBtnRef = useRef<HTMLButtonElement>();

    function handleKeyDown(e: React.KeyboardEvent) {
        if (modalShown) {
            if (e.code === "Escape") {
                closeModal();
                return;
            }
            if (e.code === "Tab" && !e.shiftKey) {
                const f = document.activeElement;
                if (f === formRef.current.getlastElem()) {
                    e.preventDefault();
                    firstElem.current.focus();
                    return;
                }
            }

            if (e.shiftKey) {
                if (e.code === "Tab") {
                    const f = document.activeElement;

                    if (f === firstElem.current) {
                        e.preventDefault();
                        console.log("i ran");
                        formRef.current.focusLastElem();
                        return;
                    }
                }
            }
        }
    }

    function closeModal() {
        setModalShown(false);
        dialogOpenBtnRef?.current.focus();
    }

    function handleOutsideDialogClick(e: React.MouseEvent) {
        const target = e.target as HTMLElement;
        if (dialogRef?.current?.contains(target)) {
            return;
        }
        closeModal();
        return;
    }

    return (
        <section className="settings">
            <button
                className="btn btn-settings"
                ref={dialogOpenBtnRef}
                onClick={() => {
                    if (timerStatus === TimerStatus.Running) {
                        return;
                    }
                    setModalShown(true);
                    setTimeout(() => {
                        formRef.current.focusInput();
                    }, 100);
                    // ;
                }}
            >
                <span className="sr-only">Show settings</span>
                <i aria-hidden={true} className="fa-solid fa-gear"></i>
            </button>
            <div
                className="settings-dialog-overlay"
                data-visible={modalShown}
                onClick={handleOutsideDialogClick}
            >
                <div aria-hidden={true} className="overlay-elem"></div>
                <div
                    className="settings-dialog"
                    role="dialog"
                    aria-labelledby="modal-heading"
                    aria-hidden={!modalShown}
                    aria-describedby="modal-description"
                    onKeyDown={handleKeyDown}
                    ref={dialogRef}
                >
                    <div className="modal-header">
                        <h2 id="modal-heading">Settings</h2>
                        <p className="sr-only" id="modal-description">
                            This is a modal that that includes a form that is
                            being used to configure some of the application's
                            colors, the font and the duration of work and rest
                            periods.
                        </p>
                        <button
                            className="btn btn-close"
                            onClick={() => closeModal()}
                            ref={firstElem}
                        >
                            <span className="sr-only">Close Button</span>
                            <i
                                className="fa-solid fa-xmark"
                                aria-hidden={true}
                            ></i>
                        </button>
                    </div>
                    <SettingsForm ref={formRef} closeModal={closeModal} />
                </div>
            </div>
        </section>
    );
}

function Timer({
    currentDurationType,
    setCurrentDurationType,
    timerStatus,
    setTimerStatus,
}: {
    currentDurationType: DurationType;
    setCurrentDurationType: (dur: DurationType) => void;
    timerStatus: TimerStatus;
    setTimerStatus: (s: TimerStatus) => void;
}) {
    // const [timerStatus, setTimerStatus] = useState<TimerStatus>(
    //     TimerStatus.Paused
    // );

    // const [work] = useState(workLength * 60);

    const { work, shortBreak, longBreak, color } = useContext(SettingsContext);
    // const work = 20;
    // const [shortBreak, setShortBreak] = useState(5);
    // const shortBreak = 5;
    // const [longBreak, setLongBreak] = useState(10);
    // const longBreak = 10;

    const intervalRef = useRef<number>(null);

    const timerCountRef = useRef<number>(0);

    const [duration, setDuration] = useState(work);

    const [currentTotal, setCurrentTotal] = useState(work);

    //For a very weird reason you need to set the duration after you derive it.
    // The useEffect is used here for that particular calculation

    useEffect(() => {
        setDuration(work);
        setCurrentTotal(work);
    }, [work]);

    function handleClockInterval(duration: number, durationType: DurationType) {
        if (timerStatus === TimerStatus.Stopped) {
            setTimerStatus(TimerStatus.Paused);
            setDuration(work);
            setCurrentDurationType(DurationType.Work);
            return;
        }
        if (timerStatus === TimerStatus.Running) {
            setTimerStatus(TimerStatus.Paused);
            clearInterval(intervalRef.current);
            return;
        }
        setTimerStatus(TimerStatus.Running);
        setCurrentTotal(duration);

        if (durationType === DurationType.Work) {
            intervalRef.current = setInterval(() => {
                if (duration - 1 <= 0) {
                    const opts: { b: number; t: DurationType } =
                        timerCountRef.current + 1 > TIMER_COUNT
                            ? { b: longBreak, t: DurationType.LongBreak }
                            : { b: shortBreak, t: DurationType.ShortBreak };

                    setDuration(opts.b);
                    setCurrentDurationType(opts.t);
                    clearInterval(intervalRef.current);
                    handleClockInterval(opts.b, opts.t);
                } else {
                    duration--;
                    setDuration(duration);
                }
            }, 1000);
            return;
        }
        if (durationType === DurationType.ShortBreak) {
            intervalRef.current = setInterval(() => {
                if (duration - 1 <= 0) {
                    timerCountRef.current++;
                    setDuration(work);
                    setCurrentDurationType(DurationType.Work);
                    clearInterval(intervalRef.current);
                    handleClockInterval(work, DurationType.Work);
                } else {
                    duration--;
                    setDuration(duration);
                }
            }, 1000);
            return;
        }

        if (durationType === DurationType.LongBreak) {
            intervalRef.current = setInterval(() => {
                if (duration - 1 <= 0) {
                    timerCountRef.current = 0;
                    setDuration(0);
                    setCurrentDurationType(null);
                    setTimerStatus(TimerStatus.Stopped);
                    clearInterval(intervalRef.current);
                    return;
                    // handleClockInterval(work, DurationType.Work);
                } else {
                    duration--;
                    setDuration(duration);
                }
            }, 1000);
        }
    }

    return (
        <section>
            <div className="container">
                <h2 className="sr-only">Clock Display</h2>
                <div className={`clock ${color}`}>
                    <svg
                        width={300}
                        height={300}
                        viewBox="0 0 300 300"
                        fill="transparent"
                        aria-hidden={true}
                    >
                        <circle
                            cx={150}
                            cy={150}
                            r={124}
                            fill={"red"}
                            fillOpacity={0}
                            stroke={"red"}
                            strokeWidth={10}
                            pathLength={Math.PI * 2 * 124}
                            strokeDasharray={Math.PI * 2 * 124}
                            strokeDashoffset={
                                Math.PI * (duration / currentTotal) * 2 * 124
                            }
                            //The aim is to establish a relationship that eventually sends the stroke dash array down to zero
                        ></circle>
                    </svg>
                    <div className="clock-control">
                        <p className="sr-only">
                            Current Timer Status:{" "}
                            {timerStatus === TimerStatus.Paused
                                ? "Paused"
                                : timerStatus === TimerStatus.Stopped
                                ? "Stopped"
                                : timerStatus === TimerStatus.Running
                                ? "Running"
                                : ""}
                            . Time remaining in minutes:{" "}
                            {Math.floor(duration / 60)}.
                        </p>
                        <p className="time-string" aria-hidden={true}>
                            {formatTimeString(duration)}
                        </p>
                        <button
                            className="btn btn-clock"
                            onClick={() => {
                                handleClockInterval(
                                    duration,
                                    currentDurationType
                                );
                            }}
                        >
                            {timerStatus === TimerStatus.Paused
                                ? "Start"
                                : timerStatus === TimerStatus.Stopped
                                ? "Restart"
                                : timerStatus === TimerStatus.Running
                                ? "Pause"
                                : ""}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function RunningDuration({
    currentDurationType,
}: {
    currentDurationType: DurationType;
}) {
    const { color } = useContext(SettingsContext);

    return (
        <div className="container">
            <section>
                <h2 className="sr-only">Current Interval Type</h2>
                <p className="sr-only">
                    Next Interval that will run is,{" "}
                    {currentDurationType === DurationType.Work
                        ? "Pomodoro"
                        : currentDurationType === DurationType.ShortBreak
                        ? "Short Break"
                        : "Long Break"}{" "}
                    interval
                </p>
                <ul className="duration-types">
                    <li
                        className={
                            currentDurationType === DurationType.Work
                                ? `${color}`
                                : ""
                        }
                    >
                        pomodoro
                    </li>
                    <li
                        style={{
                            backgroundColor:
                                currentDurationType === DurationType.ShortBreak
                                    ? "pink"
                                    : "initial",
                        }}
                    >
                        short break
                    </li>
                    <li
                        style={{
                            backgroundColor:
                                currentDurationType === DurationType.LongBreak
                                    ? "blue"
                                    : "initial",
                        }}
                    >
                        long break
                    </li>
                </ul>
            </section>
        </div>
    );
}

interface SettingsFormProps {
    closeModal: () => void;
}

const SettingsForm = forwardRef<ImperativeRef, SettingsFormProps>(function (
    props,
    ref
) {
    const inputRef = useRef<HTMLInputElement>(null);

    const lastElemRef = useRef<HTMLButtonElement>(null);
    const [workLength, setWorkLength] = useState<number>(25);
    const [shortBreakLength, setShortBreakLength] = useState<number>(5);
    const [longBreakLength, setLongBreakLength] = useState<number>(15);

    const { updateSettings, color } = useContext(SettingsContext);

    const [currentFontFamily, setCurrentFontFamily] = useState<FontFamily>(
        FontFamily.Kumbh
    );

    const [currentColor, setCurrentColor] = useState<CurrentAccent>(
        CurrentAccent.Orange
    );

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (![workLength, shortBreakLength, longBreakLength].every(Boolean))
            return;
        // console.log(workLength, shortBreakLength, longBreakLength);

        const w = workLength * 60;
        const s = shortBreakLength * 60;
        const l = longBreakLength * 60;
        updateSettings(w, s, l, currentColor, currentFontFamily);
        props.closeModal();
    }

    function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value as CurrentAccent;
        setCurrentColor(value);
    }

    function handleDurationChange(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;
        const v =
            Number(target.value) >= 60
                ? 60
                : Number(target.value) <= 1
                ? 1
                : Number(target.value);
        switch (target.id) {
            case "work":
                setWorkLength(Math.floor(v));
                break;
            case "short-b":
                setShortBreakLength(Math.floor(v));
                break;
            case "long-b":
                setLongBreakLength(Math.floor(v));
                break;
            default:
                return;
        }
    }

    function handleFontChange(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;
        const v = target.value as FontFamily;
        setCurrentFontFamily(v);
    }

    function setterIncrement(num: number) {
        return num + 1 > 60 ? 60 : num + 1;
    }

    function setterDecrement(num: number) {
        return num - 1 < 1 ? 1 : num - 1;
    }

    useImperativeHandle(
        ref,
        () => {
            return {
                getlastElem() {
                    return lastElemRef.current;
                },
                focusInput() {
                    inputRef?.current.focus();
                },
                focusLastElem() {
                    lastElemRef?.current.focus();
                },
            };
        },
        []
    );

    return (
        <form className="form-settings" onSubmit={handleSubmit}>
            {/* <div className="legend">Time(Minutes)</div> */}
            <fieldset className="settings-fieldset fieldset-duration-settings">
                <span className="legend" aria-hidden={true}>
                    Time(Minutes)
                </span>

                <legend className="sr-only">Time(Minutes)</legend>

                <label className="custom-input-number">
                    <span className="label">pomodoro</span>
                    <input
                        type="number"
                        id="work"
                        min={1}
                        max={60}
                        step={1}
                        name="work-duration"
                        ref={inputRef}
                        value={workLength}
                        onChange={handleDurationChange}
                    />
                    <div className="controls">
                        <button
                            type="button"
                            className="btn"
                            onClick={() => {
                                setWorkLength(setterIncrement);
                            }}
                        >
                            <span className="sr-only">
                                Increase Work Duration
                            </span>
                            <i
                                className="fa-solid fa-chevron-up"
                                aria-hidden={true}
                            ></i>
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => setWorkLength(setterDecrement)}
                        >
                            <span className="sr-only">
                                Decrease Work Duration
                            </span>
                            <i
                                className="fa-solid fa-chevron-down"
                                aria-hidden={true}
                            ></i>
                        </button>
                    </div>
                </label>
                <label className="custom-input-number">
                    <span className="label">short break</span>
                    <input
                        type="number"
                        id="short-b"
                        min={1}
                        max={60}
                        step={1}
                        name="short-break-duration"
                        value={shortBreakLength}
                        onChange={handleDurationChange}
                    />
                    <div className="controls">
                        <button
                            className="btn"
                            type="button"
                            onClick={() => setShortBreakLength(setterIncrement)}
                        >
                            <span className="sr-only">
                                Increase short Break Duration
                            </span>
                            <i
                                className="fa-solid fa-chevron-up"
                                aria-hidden={true}
                            ></i>
                        </button>
                        <button
                            className="btn"
                            type="button"
                            onClick={() => setShortBreakLength(setterDecrement)}
                        >
                            <span className="sr-only">
                                Decrease short Break Duration
                            </span>
                            <i
                                aria-hidden={true}
                                className="fa-solid fa-chevron-down"
                            ></i>
                        </button>
                    </div>
                </label>
                <label className="custom-input-number">
                    <span className="label">long break</span>
                    <input
                        type="number"
                        id="long-b"
                        min={1}
                        max={60}
                        step={1}
                        value={longBreakLength}
                        onChange={handleDurationChange}
                    />
                    <div className="controls">
                        <button
                            className="btn"
                            type="button"
                            onClick={() => setLongBreakLength(setterIncrement)}
                        >
                            <span className="sr-only">
                                Increase long break duration
                            </span>
                            <i
                                className="fa-solid fa-chevron-up"
                                aria-hidden={true}
                            ></i>
                        </button>
                        <button
                            className="btn"
                            type="button"
                            onClick={() => setLongBreakLength(setterDecrement)}
                        >
                            <span className="sr-only">
                                Decrease long break Duration
                            </span>
                            <i
                                className="fa-solid fa-chevron-down"
                                aria-hidden={true}
                            ></i>
                        </button>
                    </div>
                </label>
            </fieldset>

            <fieldset className="settings-fieldset fieldset-font-settings">
                <span aria-hidden={true} className="legend">
                    Font
                </span>
                <legend className="sr-only">Font</legend>
                <label
                    className={`custom-input-radio font-selector`}
                    htmlFor="font-kumbh"
                >
                    <input
                        type="radio"
                        id="font-kumbh"
                        className="font-kumbh"
                        name="selected-font"
                        value={FontFamily.Kumbh}
                        onChange={handleFontChange}
                        checked={currentFontFamily === FontFamily.Kumbh}
                    />
                </label>
                <label
                    className={`custom-input-radio font-selector`}
                    htmlFor="font-roboto"
                >
                    <input
                        type="radio"
                        id="font-roboto"
                        className="font-roboto"
                        name="selected-font"
                        value={FontFamily.Roboto}
                        onChange={handleFontChange}
                        checked={currentFontFamily === FontFamily.Roboto}
                    />
                </label>
                <label
                    className={`custom-input-radio font-selector`}
                    htmlFor="font-space-mono"
                >
                    <input
                        type="radio"
                        id="font-space-mono"
                        className="font-space-mono"
                        name="selected-font"
                        value={FontFamily.SpaceMono}
                        onChange={handleFontChange}
                        checked={currentFontFamily === FontFamily.SpaceMono}
                    />
                </label>
            </fieldset>

            <fieldset className="settings-fieldset fieldset-color-settings">
                <span aria-hidden={true} className="legend">
                    Color
                </span>
                <legend className="sr-only">Color</legend>
                <label
                    htmlFor="color-orange"
                    className="custom-input-radio color-selector color-orange"
                >
                    <input
                        type="radio"
                        id="color-orange"
                        name="selected-color"
                        value={CurrentAccent.Orange}
                        onChange={handleColorChange}
                        checked={currentColor === CurrentAccent.Orange}
                    />
                </label>
                <label
                    htmlFor="color-blue"
                    className="custom-input-radio color-selector color-blue"
                >
                    <input
                        type="radio"
                        name="selected-color"
                        id="color-blue"
                        value={CurrentAccent.Blue}
                        onChange={handleColorChange}
                        checked={currentColor === CurrentAccent.Blue}
                    />
                </label>
                <label
                    htmlFor="color-purple"
                    className="custom-input-radio color-selector color-purple"
                >
                    <input
                        type="radio"
                        name="selected-color"
                        id="color-purple"
                        value={CurrentAccent.Purple}
                        onChange={handleColorChange}
                        checked={currentColor === CurrentAccent.Purple}
                    />
                </label>
            </fieldset>
            <button
                ref={lastElemRef}
                className={`btn btn-apply-settings ${color}`}
            >
                Apply
            </button>
        </form>
    );
});

export default App;
