
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import ToggleMenu from "./components/togglemenu";
import Login from "./components/login";
import Main from "./components/main";

import Calendar from "./components/calendar/calendar";

import "./App.css";
import Calendarwrite from "./components/calendar/calendarwrite";

import Regi from "./components/regi";

import Qnapage from "./components/qna/qnapage";
import Member from "./components/member";
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

  function loghandle() {
    localStorage.clear();
    document.location.href = "/";
  }

  useEffect(() => {
    if (localStorage.getItem("login") === null) {
      setLog(true);
    } else {
      setLog(false);
    }
  }, [log]);


  let { ryear, rmonth, ryyyymm } = useParams();

  if (typeof ryear === "undefined" || typeof rmonth === "undefined" || typeof ryyyymm === "undefined") {
    const currentDate = new Date();
    ryear = String(currentDate.getFullYear());
    // rmonth = new Date().getMonth() + 1;
    rmonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    ryyyymm = ryear + rmonth;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <nav>
            <ToggleMenu />
            <Link to="/main">메인</Link>&nbsp;&nbsp;&nbsp;

            <Link to="/qna-management/allqna">Q&A관리</Link> &nbsp;&nbsp;&nbsp;
            
            {log ? <Link to="/">로그인</Link> : <button onClick={loghandle}>로그아웃</button>}        
            <Link to={`/calendar/${ryear}/${rmonth}/${ryyyymm}`}>일정관리</Link>
            <Link to="partyleader/">파티장 승인</Link>
            <Link to="mainbutton">메인 파티장 승급 버튼</Link>
          </nav>



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

            <Route path="/member-management" element={<Member />} />

            <Route path="/partyleader" element={<Partyleader />} />
            <Route path="/mainbutton" element={<Partyrequest />} />



          </Routes>
        </main>
      </BrowserRouter>

      {/*  <footer>
        <p>여긴 푸터</p>
      </footer> */}
    </div>
  );
}

export default App;
