import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import AllQna from "./qna";

import "./qna.css";

function Qnapage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
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
          onClick={() => tabClickHandler(1)}
        >
          회원관련
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
          className={activeIndex === 2 ? "is-active" : ""}
          onClick={() => tabClickHandler(2)}
        >
          게시글관련
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
          className={activeIndex === 3 ? "is-active" : ""}
          onClick={() => tabClickHandler(3)}
        >
          파티관련
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
          className={activeIndex === 4 ? "is-active" : ""}
          onClick={() => tabClickHandler(4)}
        >
          오류신고
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
          className={activeIndex === 5 ? "is-active" : ""}
          onClick={() => tabClickHandler(5)}
        >
          기타문의
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
  ];

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
