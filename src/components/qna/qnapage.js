import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AllQna from "./allqna";
import Ansqna from "./ansqna";
import Typeqna from "./typeqna";

import "./qna.css";

function Qnapage() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleNavigation(route) {
    navigate(route);
  }

  function isButtonActive(path) {
    return location.pathname.includes(path);
  }

  return (
    <div className="qnapage">
      <div className="qnanav" style={{ textAlign: "left" }}>
        <button className={"btn btn-primary" + (isButtonActive("allqna") ? " active" : "")} onClick={() => handleNavigation("allqna")}>
          질문 전체
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className={"btn btn-primary" + (isButtonActive("memberqna") ? " active" : "")} onClick={() => handleNavigation("memberqna")}>
          회원관리
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className={"btn btn-primary" + (isButtonActive("bbsrqna") ? " active" : "")} onClick={() => handleNavigation("bbsrqna")}>
          게시글관리
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className={"btn btn-primary" + (isButtonActive("partyqna") ? " active" : "")} onClick={() => handleNavigation("partyqna")}>
          파티관리
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className={"btn btn-primary" + (isButtonActive("errorqna") ? " active" : "")} onClick={() => handleNavigation("errorqna")}>
          오류신고
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className={"btn btn-primary" + (isButtonActive("etcqna") ? " active" : "")} onClick={() => handleNavigation("etcqna")}>
          기타
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className={"btn btn-primary" + (isButtonActive("completedqna") ? " active" : "")} onClick={() => handleNavigation("completedqna")}>
          답변 완료◦수정
        </button>
      </div>
      <div className="qnacontent">
        <Routes>
          <Route path="allqna/*" element={<AllQna />} />
          <Route path="memberqna/*" element={<Typeqna qtype="회원관리" />} />
          <Route path="bbsrqna/*" element={<Typeqna qtype="게시글관리" />} />
          <Route path="partyqna/*" element={<Typeqna qtype="파티관리" />} />
          <Route path="errorqna/*" element={<Typeqna qtype="오류신고" />} />
          <Route path="etcqna/*" element={<Typeqna qtype="기타" />} />
          <Route path="completedqna/*" element={<Ansqna />} />
        </Routes>
      </div>
    </div>
  );
}
export default Qnapage;
