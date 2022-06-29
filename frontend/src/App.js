import './App.css';
import * as React from "react";
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Home/login.js';
import Register from './pages/Home/register.js';
import ResrictedPage from './pages/Home/resrictedPage.js';
function App() {
  return (
        <Routes>
          <Route path="/admin" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/"  exact element={<Register />} />
          <Route path="/restrictedPage" element={<ResrictedPage />} />
        </Routes>
  );
}

export default App;
