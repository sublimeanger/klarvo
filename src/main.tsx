import { ViteReactSSG } from 'vite-react-ssg';
import { BrowserRouter } from 'react-router-dom';
import App from "./App.tsx";
import "./index.css";

// Single route entry - App handles all routing internally
const routes = [
  {
    path: '/*',
    element: <BrowserRouter><App /></BrowserRouter>,
  },
];

export const createRoot = ViteReactSSG(
  { routes },
  () => {
    // Setup function - providers are handled inside App component
  }
);
