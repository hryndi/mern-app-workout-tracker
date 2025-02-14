import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { WorkoutContextProvider } from "./context/WorkoutContext.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App />, children: [{ path: "/", element: <Home /> }] },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WorkoutContextProvider>
      <RouterProvider router={router} />
    </WorkoutContextProvider>
  </StrictMode>
);
