import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GastosProvider } from "./context/GastosContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GastosProvider>
        <App />
      </GastosProvider>
    </BrowserRouter>
  </StrictMode>
);
