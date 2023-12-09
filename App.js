import React, { Fragment } from "react";
import "./App.css";
// routing
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <section>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </section>
  );
}

export default App;
