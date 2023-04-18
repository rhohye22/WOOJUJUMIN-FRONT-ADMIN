import member from "./image/free-icon-group-users-4121044.png";
import qna from "./image/free-icon-letter-q-7336374.png";
import calendar from "./image/free-icon-calendar-833593.png";

function Main() {
  return (
    <div className="menucontainer1">
      <div className="menucontainer2">
        <a href="/member-management">
          <div className="background">
            <img className="mainmenu" src={member} alt="My Image" />
          </div>
        </a>
        <p>회원관리</p>
      </div>

      <div className="menucontainer2">
        <a href="/qna-management">
          <div className="background">
            <img className="mainmenu" src={qna} alt="My Image" />
          </div>
        </a>
        <p>Q&A관리</p>
      </div>

      <div className="menucontainer2">
        <a href="/calendar-management">
          <div className="background">
            <img className="mainmenu" src={calendar} alt="My Image" />
          </div>
        </a>
        <p>일정관리</p>
      </div>
    </div>
  );
}
export default Main;
