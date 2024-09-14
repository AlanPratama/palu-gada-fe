import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "animate.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <ToastContainer position='top-center' />
    <Provider store={store}>
      <App />
    </Provider>
  </NextUIProvider>
);
