import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import MockDocumentLoad from "./mockLandings/MockDocumentLoan";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ActualAlert } from "./actualAlert/ActualAlert";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/collabothon/document/1"
            element={<MockDocumentLoad />}
          />
        </Routes>
      </BrowserRouter>
      <ActualAlert />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
