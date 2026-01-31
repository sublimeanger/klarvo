import { ViteReactSSG } from 'vite-react-ssg';
import App from "./App.tsx";
import "./index.css";
import { ssgRoutes } from './ssgRoutes';

// Convert routes to the format expected by vite-react-ssg
const routes = ssgRoutes.map(path => ({
  path,
  element: <App />,
}));

export const createRoot = ViteReactSSG(
  { routes },
  () => {
    // Setup function - providers are handled inside App component
  }
);
