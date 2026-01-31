import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Signal to prerenderer that the app is ready to be captured
// This event is listened to by vite-plugin-prerender during build
document.dispatchEvent(new Event('prerender-ready'));
