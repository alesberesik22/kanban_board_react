import React from "react";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import KanbanBoard from "./pages/KanbanBoard/KanbanBoard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import RouteAuth from "./components/RouteAuth/RouteAuth";
import {Roles} from "./interfaces/Roles";

function App() {
    const location = useLocation();
    const excludedRoutes = ['/']
  return (
    <div className="app">
        {!excludedRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
          <Route path={"/"} element={<Login/>}/>
          <Route element={<RouteAuth allowedRoles={['ADMIN','USER']}/>}>
              <Route path="/home" element={<Home />} />
              <Route path="/kanban/:id" element={<KanbanBoard />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;
