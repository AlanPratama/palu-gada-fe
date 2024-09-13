import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "animate.css";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </NextUIProvider>
);
