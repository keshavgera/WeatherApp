import React from "react";
import { Provider } from "react-redux";
import {store } from "./store";
import Home from "./src/apis/Home";


const App: React.FC = () =>(
  <Provider store={store}>
      <Home />
  </Provider>
)