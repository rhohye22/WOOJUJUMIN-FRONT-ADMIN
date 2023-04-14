import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ToggleMenu from "./components/togglemenu";
import Login from "./components/login";
import Main from "./components/main";

import Qna from "./components/qna";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <nav>
            <ToggleMenu />
            <Link to="/">로그인</Link>&nbsp;&nbsp;&nbsp;
            <Link to="/main">메인</Link>&nbsp;&nbsp;&nbsp;
            <Link to="/qna">Q&A관리</Link>
          </nav>
        </header>
        <hr />

        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/qna" element={<Qna />} />
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
