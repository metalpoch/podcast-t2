import React from "react";
import ReactDOM from "react-dom/client";
import { SheetContextProvider } from "./context/SheetContext";
import App from "./App.jsx";
import "./normalize.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SheetContextProvider>
      <App />
    </SheetContextProvider>
  </React.StrictMode>,
);
