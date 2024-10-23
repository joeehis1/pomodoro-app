import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./scss/index.scss";
import SettingsContextProvider from "./SettingsContextProvider";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SettingsContextProvider>
            <App />
        </SettingsContextProvider>
    </StrictMode>
);
