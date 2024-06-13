import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";

ReactDOM.render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistStore(Store)}>
    <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();