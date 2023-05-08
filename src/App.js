import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Login from "./components/login";
import Main from "./components/main";
import Navbar from "./navbar";

import Calendar from "./components/calendar/calendar";

import "./App.css";
import Calendarwrite from "./components/calendar/calendarwrite";

import Regi from "./components/regi";

import Qnapage from "./components/qna/qnapage";
import Mempage from "./components/member/mempage";
import Bbspage from "./components/bbs/bbspage";
import Calendardetail from "./components/calendar/calendardetail";
import CalendarList from "./components/calendar/calendarlist";
import Calendarupdate from "./components/calendar/calendatupdate";
import Partyleader from "./components/partyleader";
import Partyrequest from "./components/partyrequest";

import "./App.css";

function App() {
  // 로그인 상태 관리
  const [log, setLog] = useState(null);
  const [login, setLogin] = useState({});
  const [profile, setProfile] = useState("");
  function loghandle() {
    localStorage.clear();
    document.location.href = "/";
  }

  useEffect(() => {
    if (localStorage.getItem("login") === null) {
      setLog(true);
    } else {
      setLog(false);
      setLogin(JSON.parse(localStorage.getItem("login")));
      setProfile(login.profile);
    }
  }, [log]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="basepage">
          <header>
            {log ? null : (
              <div>
                <span className="ml-2">관리자 ID : {login.id}</span>&nbsp;&nbsp;
                <img src={`http://localhost:3000/upload/member/${profile}`} style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="outline-dark" size="sm" onClick={loghandle}>
                  로그아웃
                </Button>
              </div>
            )}
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/regi" element={<Regi />} />
              <Route path="/main" element={<Main />} />

              <Route path="/calendar/:ryear/:rmonth/:ryyyymm" element={<Calendar />} />
              <Route path="/calendarwrite/:year/:month/:day" element={<Calendarwrite />} />
              <Route path="/calendardetail/:calSeq" element={<Calendardetail />} />
              <Route path="/calendarlist/:rdate" element={<CalendarList />} />
              <Route path="/calendarupdate/:calSeq" element={<Calendarupdate />} />

              <Route path="/qna-management/*" element={<Qnapage />} />
              <Route path="/bbs-management/*" element={<Bbspage />} />
              <Route path="/member-management/*" element={<Mempage />} />

              <Route path="/partyleader" element={<Partyleader />} />
              <Route path="/mainbutton" element={<Partyrequest />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>

      {/*  <footer>
        <p>여긴 푸터</p>
      </footer> */}
    </div>
  );
}

export default App;
