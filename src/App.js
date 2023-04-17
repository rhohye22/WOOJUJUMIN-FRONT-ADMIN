import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Main from "./components/main";
import Calendar from "./components/calendar";

import "./App.css";
import Calendarwrite from "./components/calendarwrite";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <nav>
            <h1>여기 네비바</h1>
          </nav>
          <Link to="/">우주주민</Link>
          <Link to="/Calendar">일정관리</Link>
        </header>
        <hr />

        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/calendarwrite/:year/:month/:day" element={<Calendarwrite />} />
          </Routes>
        </main>
        <hr />
      </BrowserRouter>

      <footer>
        <h1>여긴 푸터</h1>
      </footer>
    </div>
  );
}

export default App;
