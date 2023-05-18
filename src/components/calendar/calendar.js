import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Ink from "../image/ink.png";
import Table from "react-bootstrap/Table";
import backmonth from "../image/backmonth.png";
import backyear from "../image/backyear.png";
import nextyear from "../image/nextyear.png";
import nextmonth from "../image/nextmonth.png";
import Pen from "../image/insertPen.png";



function Calendar() {
  let { ryear, rmonth, ryyyymm } = useParams();

  function nvl(msg) {
    return msg === null || msg.trim() === "" ? true : false;
  }

  if (nvl(ryear) || nvl(rmonth) || nvl(ryyyymm)) {
    const currentDate = new Date();
    ryear = String(currentDate.getFullYear());
    // rmonth = new Date().getMonth() + 1;
    rmonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentDay = String(currentDate.getDate()).padStart(2, "0");
    ryyyymm = rmonth + currentDay;
  }

  // console.log(ryear);
  // console.log(rmonth);
  // console.log(ryyyymm);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [sendYear, setSendYear] = useState(ryear);
  const [sendMonth, setSendMonth] = useState(rmonth);
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [lastday, setLastday] = useState(0);
  const [weekday, setWeekday] = useState(0);
  const [yyyymm, setYyyymm] = useState("");
  const [sendyyyymm, setSendyyymm] = useState(ryyyymm);
  const [calendardto, setCalendardto] = useState([]);
  // const listcnt = [];
  const [listcnt, setListcnt] = useState([]);

  useEffect(() => {
    const fetchData = async (sendYear, sendMonth) => {
      await axios
        .post("http://118.67.132.98:3000/calendarmain", null, { params: { sendYear: sendYear, sendMonth: sendMonth, sendYyyymm: sendyyyymm } })
        .then(function (res) {
          // alert(res.data);
          console.log(JSON.stringify(res.data));
          // console.log(JSON.stringify(res.data.dayOfWeek));
          // console.log(res.data.dayOfWeek);
          setDayOfWeek(res.data.dayOfWeek);
          setLastday(res.data.lastday);
          setWeekday(res.data.weekday);
          setYear(res.data.year);
          // alert(charTwo(msg));
          setMonth(charTwo(res.data.month));
          // console.log(dayOfWeek);
          // console.log(weekday);
          // console.log(lastday);
          setYyyymm(res.data.year + charTwo(res.data.month));
          setCalendardto(res.data.list);
          // setYyyymmdd(red.data.)

        })
        .catch(function (err) {
          alert(err);
        });
    };


    // async function cntData(){      
    //   for (let i = 1; i <= lastday; i++) {
    //     let ymd = year + charTwo(month) + charTwo(i);
    //     await axios.get("http://118.67.132.98:3000/listcount", { params: { "rdate": ymd } })
    //       .then(function (res) {
    //         console.log(res.data);
    //         listcnt.push(res.data);
    //       })
    //       .catch(function (err) {
    //         alert(err);
    //       })
    //   }
    // }

    // async function cntData() {
    //   try {
    //     for (let i = 1; i <= lastday; i++) {
    //       let ymd = year + charTwo(month) + charTwo(i);
    //       const response = await axios.get("http://118.67.132.98:3000/listcount", {
    //         params: { rdate: ymd },
    //       });
    //       console.log(response.data);
    //       listcnt.push(response.data);
    //     }
    //   } catch (error) {
    //     alert(error);
    //   }
    // }



    fetchData(sendYear, sendMonth);


  }, [sendYear, sendMonth, sendyyyymm]);

  useEffect(() => {
    async function cntData() {
      try {
        const updatedListcnt = []; // 업데이트된 배열을 임시로 저장할 변수
        for (let i = 1; i <= lastday; i++) {
          let ymd = year + charTwo(month) + charTwo(i);
          const response = await axios.get("http://118.67.132.98:3000/listcount", { params: { rdate: ymd } });
          console.log(response.data);
          updatedListcnt.push(response.data);
        }
        setListcnt(updatedListcnt); // 배열 상태 업데이트
      } catch (error) {
        alert(error);
      }
    }
    cntData();
    console.log("배열확인용", listcnt); // 배열이 업데이트될 때마다 호출
  }, [lastday]);


  const navigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("login"));

  useEffect(() => {
    if (isLogin === null) {
      alert("로그인해 주십시오");
      navigate("/"); // 로그인 페이지로 이동
    } else {
      // const login = JSON.parse(isLogin);
    }
  }, [navigate, isLogin]);

  // useEffect(()=>{
  //   const listcount = async ()=>{
  //     await axios.get("http://118.67.132.98:3000/listcount", {params:{"rdate":yyyymmdd}})
  //     .then(function(res){
  //       alert("확인");
  //     })
  //     .catch(function(err){
  //       alert(err);
  //     })
  //   }

  //   listcount();


  // },[])

  // Promise 배열 생성
  // let promises = [];


  // Promise.all을 사용하여 모든 Promise 완료 후에 처리
  // Promise.all(promises)
  //   .then(function (responses) {
  //     // 모든 응답 처리
  //     responses.forEach(function (res) {
  //       // console.log(res.data);
  //       listcnt.push(res.data);
  //     });

  //     // 완료된 배열 출력
  //     console.log(listcnt);

  //     return (
  //       listcnt.map((cnt, i)=>{
  //         usecnt.push(<b key={i}>{cnt}</b>);
  //       })
  //     )

  //   })
  //   .catch(function (err) {
  //     alert(err);
  //   });


  // console.log(calendardto + "개수확인");


  // 전년도
  function prevYear() {
    // alert(year);
    // alert(month);
    setSendYear(year - 1);
    setSendMonth(Number(month));
    let intToString = String(year - 1) + charTwo(Number(month));
    setSendyyymm(intToString);
  }

  // 전월
  function prevMonth() {
    setSendYear(year);
    setSendMonth(Number(month) - 1);
    let intToString = String(year) + charTwo(Number(month) - 1);
    setSendyyymm(intToString);
  }

  // 익월
  function nextMonth() {
    setSendYear(year);
    setSendMonth(Number(month) + 1);
    let intToString = String(year) + charTwo(Number(month) + 1);
    setSendyyymm(intToString);
  }

  // 내년도
  function nextYear() {
    setSendYear(year + 1);
    setSendMonth(Number(month));
    let intToString = String(year + 1) + charTwo(Number(month));
    setSendyyymm(intToString);
  }

  // 오늘날짜로 돌아오기
  function todaySet() {
    setSendYear("");
    setSendMonth("");
    setSendyyymm("");
  }

  // 한자리 숫자를 두자리로 만들어주는 함수 : 1 ~ 9 -> 01 ~ 09
  function charTwo(msg) {
    if (typeof msg !== "string") {
      msg = String(msg); // 숫자나 다른 타입을 문자열로 변환
    }

    return msg.trim().length < 2 ? "0" + msg.trim() : msg.trim();
  }

  // 제목 길면 ... 으로 변경해주는 함수
  function dot3(msg) {
    let str = "";
    if (msg.length >= 10) {
      str = msg.substring(0, 6); //0 부터 10 전까지  - 6으로 바꿈
      str += "...";
    } else {
      str = msg.trim();
    }
    return str;
  }

  // 의존성 배열로 경고나서 useEffect안에 함수 정의 함수 불러오기 수정
  // useEffect(() => {
  //     fetchData(sendYear, sendMonth);
  // }, [sendMonth, sendYear, sendyyyymm]);

  // 달력 가져오기
  const calendarList = () => {
    let arrTop = [];
    let row = [];


    // 내가 이동한 월 가져오기
    const today = new Date(year, month - 1);
    console.log(today);

    // 현재 월의 첫 날 설정
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // 전월의 첫 날 설정
    const firstDayOfPrevMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() - 1, 1);

    // 전월의 마지막 날 가져오기
    const lastDayOfPrevMonth = new Date(firstDayOfPrevMonth.getFullYear(), firstDayOfPrevMonth.getMonth() + 1, 0);

    console.log(lastDayOfPrevMonth.getDate()); // 전월의 마지막 날짜 출력

    // 위쪽 빈칸
    for (let i = 1; i < dayOfWeek; i++) {
      row.push(<td key={i} style={{ border: "1px solid rgba(0, 0, 0, 0.1)", color: "#a0a0a0", verticalAlign: "top", fontSize: "18px" }}>{lastDayOfPrevMonth.getDate() - dayOfWeek + i + 1}</td>);
    }

    // let minuscnt = 0;
    // for (let i = dayOfWeek; i > 1; i--) {
    //   row.push(<td key={i} style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>{lastDayOfPrevMonth.getDate()-minuscnt}</td>);
    //   minuscnt++;
    //   console.log("마이너스카운트" + minuscnt);
    // }

    // 날짜
    // `/some-url?month=${monthValue}&day=${dayValue}`
    for (let i = 1; i <= lastday; i++) {
      const tableList = calendardto.map((cal, index) => {
        let selDate = year + charTwo(month) + charTwo(i);

        return cal.rdate.substring(0, 8) === selDate ? ( // 값이 true일 때 테이블을 출력하도록 설정
          <table key={index} className="allList">
            <tbody>
              <tr>
                <td style={{ padding: "5px 5px 5px 0" }}>
                  <Link to={`/calendardetail/${cal.calSeq}`} >
                    {cal.tagName === "농구" && <><span className="tagCss" style={{ padding: "7px", fontWeight: "bold", backgroundColor:"rgb(241, 78, 78)", marginRight:"4px", color:"white"}}>{cal.tagName}</span><span>{dot3(cal.title)}</span></>}
                    {cal.tagName === "축구" && <><span className="tagCss" style={{ padding: "7px", fontWeight: "bold", backgroundColor:"rgb(220, 149, 41)", marginRight:"4px", color:"white" }}>{cal.tagName}</span><span>{dot3(cal.title)}</span></>}
                    {cal.tagName === "야구" && <><span className="tagCss" style={{ padding: "7px", fontWeight: "bold", backgroundColor:"rgb(215, 203, 28)", marginRight:"4px", color:"white" }}>{cal.tagName}</span><span>{dot3(cal.title)}</span></>}
                    {cal.tagName === "예능" && <><span className="tagCss" style={{ padding: "7px", fontWeight: "bold", backgroundColor:"rgb(134, 180, 103)", marginRight:"4px", color:"white" }}>{cal.tagName}</span><span>{dot3(cal.title)}</span></>}
                    {cal.tagName === "드라마/영화" && <><span className="tagCss" style={{ padding: "7px", fontWeight: "bold", backgroundColor:"rgb(162, 214, 228)", marginRight:"4px", color:"white" }}>{cal.tagName}</span><span>{dot3(cal.title)}</span></>}
                    {cal.tagName === "게임" && <><span className="tagCss" style={{ padding: "7px", fontWeight: "bold", backgroundColor:"rgb(54, 118, 212)", marginRight:"4px", color:"white" }}>{cal.tagName}</span><span>{dot3(cal.title)}</span></>}
                    {cal.tagName === "음식" && <><span className="tagCss" style={{ padding: "7px", fontWeight: "bold", backgroundColor:"rgb(31, 31, 226)", marginRight:"4px", color:"white" }}>{cal.tagName}</span><span>{dot3(cal.title)}</span></>}
                    {cal.tagName === "우주주민 함께" && <><span className="tagCss" style={{ padding: "7px", fontWeight: "bold", backgroundColor:"rgb(110, 31, 226)", marginRight:"4px", color:"white" }}>{cal.tagName}</span><span>{dot3(cal.title)}</span></>}
                    {cal.tagName === "우주주민 탐사" && <><span className="tagCss" style={{ padding: "7px", fontWeight: "bold", backgroundColor:"rgb(209, 147, 231)", marginRight:"4px", color:"white" }}>{cal.tagName}</span><span>{dot3(cal.title)}</span></>}
                    {/* <span className="tagCss" style={{ padding: "5px", fontWeight: "bold" }}>{cal.tagName}</span> {dot3(cal.title)} */}
                  </Link>
                  {/* {listcnt[i - 1] > 5 ? <b>:</b> : null} */}
                </td>
              </tr>
            </tbody>
          </table>
        ) : null ; // 속성이 false일 경우, null을 반환하여 아무것도 출력하지 않도록 설정
      });

      if (listcnt[i - 1] > 5) {
        tableList.push(
          <p style={{ margin: "0", padding: "0", textAlign: "center" }}><b>:</b></p>
        );
      }

      row.push(
        <td key={i + dayOfWeek - 1} className="numTop" style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
          <Link to={`/calendarlist/${year}${month}${charTwo(i)}`} style={{ color: "black", fontSize: "18px" }}>{i} </Link>
          <Link to={`/calendarwrite/${year}/${month}/${i}`} >
            <img alt="글 쓰기" src={Pen} style={{ width: "35px", height: "30px" }} />
          </Link>
          <b style={{ float: "right" }}>{listcnt[i - 1]}개</b>
          {tableList}
        </td>
      );
      if ((i + dayOfWeek - 1) % 7 === 0 && i !== lastday) {
        arrTop.push(
          <tr key={i} style={{ height: "100px", textAlign: "left", verticalAlign: "top" }}>
            {row}
          </tr>
        );
        row = [];
      }
    }

    // 아래쪽 빈칸
    for (let i = 0; i < 7 - weekday; i++) {
      row.push(<td key={i} style={{ border: "1px solid rgba(0, 0, 0, 0.1)", color: "#a0a0a0", verticalAlign: "top", fontSize: "18px" }}>{i + 1}</td>);
    }
    let keyVal = 0;
    arrTop.push(
      <tr key={keyVal} style={{ height: "100px", textAlign: "left", verticalAlign: "top" }}>
        {row}
      </tr>
    );

    return <>{arrTop}</>;
  };

  return (
    <div style={{ width: "1400px", margin: "0 auto" }}>
      <div>
        <Table responsive className="finalCal">
          <colgroup>
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
          </colgroup>

          <thead>
            <tr>
              <td colSpan={7}>
                <div style={{ alignItems: "center" }}>
                  <img src={backyear} onClick={prevYear} alt="전년도" style={{ height: "40px", width: "auto" }} /> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                  <img src={backmonth} onClick={prevMonth} alt="전월" style={{ height: "40px", width: "auto" }} /> &nbsp; &nbsp;&nbsp; &nbsp;
                  <b>
                    {year}년 {month}월&nbsp; &nbsp;&nbsp; &nbsp;
                  </b>
                  <img src={nextmonth} onClick={nextMonth} alt="익월" style={{ height: "40px", width: "auto" }} /> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                  <img src={nextyear} onClick={nextYear} alt="내년도" style={{ height: "40px", width: "auto" }} />
                  <b onClick={todaySet} style={{ marginLeft: "20px" }}>오늘</b>
                </div>
              </td>
            </tr>
            <tr>
              <th>일</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
            </tr>
          </thead>
          <tbody>{calendarList()}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default Calendar;
