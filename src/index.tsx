import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import Routers from "./routers";
import { Provider } from "react-redux";
import { store } from "./redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#3b4366",
          },
          components: {
            Layout: {
              colorBgHeader: "#292f4c", // colorBgBase -3% lightness, i've pre-calculated these values manually, but it'd be smart to use color.js or something like that to manage these manipulations
            },
            Menu: {
              // if you use "dark" theme on menu
              colorItemBg: "#292f4c", // colorBgBase -3% lightness
              colorSubItemBg: "#00b96b", // colorBgBase -6% lightness
            },
          },
        }}
      >
        <Routers />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
