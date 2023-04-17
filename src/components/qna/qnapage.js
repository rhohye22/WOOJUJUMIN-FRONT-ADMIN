import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import AllQna from "./allqna";
import Typeqna from "./typeqna";

import "./qna.css";

function Qnapage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [qtype, setQtype] = useState(""); // qtype 상태값 추가

  const tabClickHandler = (index, qtype) => {
    setActiveIndex(index);
    setQtype(qtype); // qtype 상태값 설정
  };

  const tabContArr = [
    {
      tabTitle: (
        <li
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          전체질문
        </li>
      ),
      tabCont: (
        <div className="qnapage">
          <div className="qnapageLeft">
            <AllQna />
          </div>
          <div className="qnapageRight">
            <p>답변달기</p>
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tabClickHandler(1, "회원관리")}
        >
          회원관련
        </li>
      ),
      tabCont: (
        <div className="qnapage">
          <div className="qnapageLeft">
            <Typeqna qtype={qtype} />
          </div>
          <div className="qnapageRight">
            <p>답변달기</p>
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 2 ? "is-active" : ""}
          onClick={() => tabClickHandler(2, "게시글관리")}
        >
          게시글관련
        </li>
      ),
      tabCont: (
        <div className="qnapage">
          <div className="qnapageLeft">
            <Typeqna qtype={qtype} />
          </div>
          <div className="qnapageRight">
            <p>답변달기</p>
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 3 ? "is-active" : ""}
          onClick={() => tabClickHandler(3, "파티관리")}
        >
          파티관련
        </li>
      ),
      tabCont: (
        <div className="qnapage">
          <div className="qnapageLeft">
            <Typeqna qtype={qtype} />
          </div>
          <div className="qnapageRight">
            <p>답변달기</p>
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 4 ? "is-active" : ""}
          onClick={() => tabClickHandler(4, "오류신고")}
        >
          오류신고
        </li>
      ),
      tabCont: (
        <div className="qnapage">
          <div className="qnapageLeft">
            <Typeqna qtype={qtype} />
          </div>
          <div className="qnapageRight">
            <p>답변달기</p>
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 5 ? "is-active" : ""}
          onClick={() => tabClickHandler(5, "기타")}
        >
          기타문의
        </li>
      ),
      tabCont: (
        <div className="qnapage">
          <div className="qnapageLeft">
            <Typeqna qtype={qtype} />
          </div>
          <div className="qnapageRight">
            <p>답변달기</p>
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {}, [qtype]);

  return (
    <div>
      <ul className="tabs is-boxed">
        {tabContArr.map((section, index) => {
          return section.tabTitle;
        })}
      </ul>
      <div>{tabContArr[activeIndex].tabCont}</div>
    </div>
  );
}
export default Qnapage;
