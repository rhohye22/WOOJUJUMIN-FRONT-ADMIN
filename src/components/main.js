import member from "./image/free-icon-group-users-4121044.png";
import qna from "./image/free-icon-letter-q-7336374.png";
import calendar from "./image/free-icon-calendar-833593.png";
import leader from "./image/free-icon-leader-4249109.png";
import board from "./image/free-icon-board-8224872.png";

import FreebbsRecent7days from "./graph/freebbsRecent7days";
import RegimemRecent30days from "./graph/regimemRecent30days";

function Main() {
  return (
    <>
      <div className="menucontainerTop">
        <div className="menuicon">
          <a href="/leader-management">
            <div className="background">
              <img className="mainmenu" src={leader} alt="My Image" />
            </div>
          </a>
          <p>파티장권한부여</p>
        </div>
        <div className="menuicon">
          <a href="/bbs-management">
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
          <a href="/calendar">
            <div className="background">
              <img className="mainmenu" src={calendar} alt="My Image" />
            </div>
          </a>
          <p>일정관리</p>
        </div>
      </div>
      <div className="menucontainerBottom">
        <RegimemRecent30days /> <FreebbsRecent7days />
      </div>
    </>
  );
}
export default Main;
