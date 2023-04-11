import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Main from "./components/main";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <nav>
            <h1>여기 네비바</h1>
          </nav>
          <Link to="/">우주주민</Link>
        </header>
        <hr />

        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} />
          </Routes>
            <h2>테스트입니다</h2>
            <h3>올라가라!</h3>
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
