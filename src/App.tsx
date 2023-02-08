import React from "react";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import KanbanBoard from "./pages/KanbanBoard/KanbanBoard";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kanban/:id" element={<KanbanBoard />} />
      </Routes>
    </div>
  );
}

export default App;
