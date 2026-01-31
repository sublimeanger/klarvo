import { ViteReactSSG } from 'vite-react-ssg';
import App from "./App.tsx";
import "./index.css";

// Single catch-all route - App handles all routing internally via Routes
const routes = [
  {
    path: '/*',
    element: <App />,
  },
];

export const createRoot = ViteReactSSG(
  { routes },
  () => {
    // Setup function - providers are handled inside App component
  }
);
