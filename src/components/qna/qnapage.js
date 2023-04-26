import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useState } from "react";

import AllQna from "./allqna";
import Ansqna from "./ansqna";
import Typeqna from "./typeqna";

import "./qna.css";

function Qnapage() {
  return (
    <div className="qnapage">
      <div className="qnanav">
        <Link to="allqna">질문 전체</Link>&nbsp;&nbsp;&nbsp;
        <Link to="memberqna">회원관리</Link>&nbsp;&nbsp;&nbsp;
        <Link to="bbsrqna">게시글관리</Link>&nbsp;&nbsp;&nbsp;
        <Link to="partyqna">파티관리</Link>&nbsp;&nbsp;&nbsp;
        <Link to="errorqna">오류신고</Link>&nbsp;&nbsp;&nbsp;
        <Link to="etcqna">기타</Link>&nbsp;&nbsp;&nbsp;
        <Link to="completedqna">답변 완료◦수정</Link>&nbsp;&nbsp;&nbsp;
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
