import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import App from "./App.tsx";
import "./index.css";
import EN from "./locales/en.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: EN,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
