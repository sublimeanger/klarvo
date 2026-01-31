import { StrictMode } from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

// Use hydrate for prerendered content (react-snap), render for fresh loads
const AppWrapper = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrate(AppWrapper, rootElement);
} else {
  render(AppWrapper, rootElement);
}
