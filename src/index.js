import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App/App";
import MainProvider from "./Providers/MainProvider";

const root = createRoot(document.getElementById("root"));
root.render(
  <>
    <MainProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MainProvider>
  </>
);
