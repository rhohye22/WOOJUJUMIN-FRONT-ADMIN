import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

import member from "./image/free-icon-group-users-4121044.png";
import qna from "./image/free-icon-letter-q-7336374.png";
import calendar from "./image/free-icon-calendar-833593.png";
import leader from "./image/free-icon-leader-4249109.png";
import board from "./image/free-icon-board-8224872.png";

import FreebbsRecent7days from "./graph/freebbsRecent7days";
import RegimemRecent30days from "./graph/regimemRecent30days";
import PartybbsRecent7days from "./graph/partybbsRecent7days";
import "./style.css";
function Main() {
  let { ryear, rmonth, ryyyymm } = useParams();

  if (typeof ryear === "undefined" || typeof rmonth === "undefined" || typeof ryyyymm === "undefined") {
    const currentDate = new Date();
    ryear = String(currentDate.getFullYear());
    // rmonth = new Date().getMonth() + 1;
    rmonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    ryyyymm = ryear + rmonth;
  }
  return (
    <>
      <div className="menucontainerTop">
        <div className="menuicon">
          <a href="/partyleader">
            <div className="background">
              <img className="mainmenu" src={leader} alt="My Image" />
            </div>
          </a>
          <p>파티장승인</p>
        </div>
        <div className="menuicon">
          <a href="/bbs-management/partybbs">
            <div className="background">
              <img className="mainmenu" src={board} alt="My Image" />
            </div>
          </a>
          <p>게시판관리</p>
        </div>
        <div className="menuicon">
          <a href="#">
            <div className="background">
              <img className="mainmenu" src={member} alt="My Image" />
            </div>
          </a>
          <p>회원관리</p>
        </div>

        <div className="menuicon">
          <a href="/qna-management/allqna">
            <div className="background">
              <img className="mainmenu" src={qna} alt="My Image" />
            </div>
          </a>
          <p>Q&A관리</p>
        </div>

        <div className="menuicon">
          <a href={`/calendar/${ryear}/${rmonth}/${ryyyymm}`}>
            <div className="background">
              <img className="mainmenu" src={calendar} alt="My Image" />
            </div>
          </a>
          <p>일정관리</p>
        </div>
      </div>
      <div className="menucontainerBottom">
        <RegimemRecent30days /> <FreebbsRecent7days />
        <PartybbsRecent7days />
        <RegimemRecent30days /> <FreebbsRecent7days />
        <PartybbsRecent7days />
      </div>
    </>
  );
}
export default Main;
