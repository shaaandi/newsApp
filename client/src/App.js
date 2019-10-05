import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
