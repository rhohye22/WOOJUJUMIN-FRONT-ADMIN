import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import logo from "./images/logo.png";
function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();

  const showSidebar = () => setSidebar(!sidebar);

  let { ryear, rmonth, ryyyymm } = useParams();

  if (typeof ryear === "undefined" || typeof rmonth === "undefined" || typeof ryyyymm === "undefined") {
    const currentDate = new Date();
    ryear = String(currentDate.getFullYear());
    // rmonth = new Date().getMonth() + 1;
    rmonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    ryyyymm = ryear + rmonth;
  }

  return (
    <div className="navbar">
      <div className="nav-img">
        <img src={logo} alt="Main Page" />
      </div>
      <div className="nav-list">
        <ul className="nav-menu">
          <li>
            <Link to="/main" className={location.pathname === "/main" ? "active" : ""}>
              메인페이지
            </Link>
          </li>
          <li>
            <Link to="/partyleader/" className={location.pathname === "/partyleader/" ? "active" : ""}>
              파티장 승인
            </Link>
          </li>
          <li>
            <Link to="/bbs-management/partybbs" className={location.pathname === "/bbs-management/partybbs" ? "active" : ""}>
              게시판 관리
            </Link>
          </li>
          <li>
            <Link to="/bbs-management/partybbs" className={location.pathname === "/bbs-management/partybbs" ? "active" : ""}>
              회원 관리
            </Link>
          </li>
          <li>
            <Link to="/qna-management/allqna" className={location.pathname === "/qna-management/allqna" ? "active" : ""}>
              Q&A 관리
            </Link>
          </li>
          <li>
            <Link to={`/calendar/${ryear}/${rmonth}/${ryyyymm}`} className={location.pathname.startsWith("/calendar") ? "active" : ""}>
              일정 관리
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
