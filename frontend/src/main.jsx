import { createRoot } from "react-dom/client";
import { QueryClienProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClienProvider client={queryClient}>
    <App />
  </QueryClienProvider>
);
