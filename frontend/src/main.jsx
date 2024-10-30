import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { SearchContextProvider } from "./context/SearchContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </AuthContextProvider>
);
