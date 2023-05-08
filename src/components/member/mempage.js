import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mem.css";

import Partyleader from "./partyleader";
import Normal from "./normal";
import Stop from "./stop";
import Manager from "./manager";
function Mempage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");

  const isLogin = localStorage.getItem("login");
  useEffect(() => {
    if (isLogin == null) {
      alert("로그인해 주십시오");
      navigate("/"); // 로그인 페이지로 이동
    } else {
      const login = JSON.parse(isLogin);
      setId(login.id);
    }
  }, [navigate, isLogin]);

  const location = useLocation(); // 현재 위치 정보를 가져오기 위해 useLocation 훅을 사용합니다.

  return (
    <div className="mempage">
      <div className="memnav" style={{ textAlign: "left" }}>
        <Link className={` ${location.pathname.includes("normal") ? "active" : ""}`} to="normal">
          일반회원
        </Link>{" "}
        &nbsp;&nbsp;&nbsp;
        <Link className={` ${location.pathname.includes("partyleader") ? "active" : ""}`} to="partyleader">
          파티장회원
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link className={` ${location.pathname.includes("stop") ? "active" : ""}`} to="stop">
          활동정지회원
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link className={` ${location.pathname.includes("manager") ? "active" : ""}`} to="manager">
          관리자
        </Link>
        &nbsp;&nbsp;&nbsp;
      </div>
      <div className="memcontent">
        <Routes>
          <Route path="partyleader/*" element={<Partyleader auth={1} />} />
          <Route path="normal/*" element={<Normal auth={0} />} />
          <Route path="stop/*" element={<Stop auth={3} />} />
          <Route path="manager/*" element={<Manager auth={2} />} />
        </Routes>
      </div>
    </div>
  );
}
export default Mempage;
