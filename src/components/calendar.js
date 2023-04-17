import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Ink from "../images/ink.png";

function Calendar() {

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [sendYear, setSendYear] = useState("");
    const [sendMonth, setSendMonth] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState(0);
    const [lastday, setLastday] = useState(0);
    const [weekday, setWeekday] = useState(0);

    const fetchData = async (sendYear, sendMonth) => {
        await axios.post("http://localhost:3000/calendarmain", null, { params: { "sendYear": sendYear, "sendMonth": sendMonth } })
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
            })
            .catch(function (err) {
                alert(err);
            });
    }

    function prevYear() {
        // alert(year);
        // alert(month);
        setSendYear(year - 1);
        setSendMonth(Number(month));
    }

    function prevMonth() {
        setSendYear(year);
        setSendMonth(Number(month) - 1);
    }

    function nextMonth() {
        setSendYear(year);
        setSendMonth(Number(month) + 1);
    }

    function nextYear() {
        setSendYear(year + 1);
        setSendMonth(Number(month));
    }

    function todaySet() {
        setSendYear("");
        setSendMonth("");
    }

    // 한자리 숫자를 두자리로 만들어주는 함수 : 1 ~ 9 -> 01 ~ 09
    function charTwo(msg) {
        if (typeof msg !== "string") {
            msg = String(msg); // 숫자나 다른 타입을 문자열로 변환
        }

        return msg.trim().length < 2 ? "0" + msg.trim() : msg.trim();
    }

    useEffect(() => {
        fetchData(sendYear, sendMonth);
    }, [sendMonth, sendYear]);


    const calendarList = () => {
        let arrTop = [];
        let row = [];

        // 위쪽 빈칸
        for (let i = 1; i < dayOfWeek; i++) {
            row.push(<td key={i}>빈칸</td>);
        }

        // 날짜
        // `/some-url?month=${monthValue}&day=${dayValue}`
        for (let i = 1; i <= lastday; i++) {
            row.push(<td key={i + dayOfWeek - 1}>{i} <Link to={`/calendarwrite/${year}/${month}/${i}`}><img alt="글 쓰기" src={Ink} style={{ width: "20px", height: "25px" }} /></Link></td>);
            if ((i + dayOfWeek - 1) % 7 === 0 && i !== lastday) {
                arrTop.push(<tr key={i} style={{ height: "100px", textAlign: "left", verticalAlign: "top" }}>{row}</tr>);
                row = [];
            }
        }

        // 아래쪽 빈칸
        for (let i = 0; i < 7 - weekday; i++) {
            row.push(<td key={i}>빈칸</td>);
        }
        let keyVal = 0;
        arrTop.push(<tr key={keyVal} style={{ height: "100px", textAlign: "left", verticalAlign: "top" }}>{row}</tr>);

        return <>{arrTop}</>;
    };

    function makeTable(year, month, i){
        let rdate = year + charTwo(month) + charTwo(i);
        let tableList = [];

        
        
        

        return(
            <table>
                <tbody>
                </tbody>
            </table>
        )
    }

    return (
        <div>

            <h1>여기가 캘린더 입니다</h1>
            <div>
                <table border="1">
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
                                {/* <a href={"calendar?" + pp.toString()}>전년도</a> */}
                                <p onClick={prevYear}>전년도</p>
                                <p onClick={prevMonth}>전월</p>
                                <b>{year}년 {month}월</b><b onClick={todaySet}>오늘</b>
                                <p onClick={nextMonth}>익월</p>
                                <p onClick={nextYear}>내년도</p>

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
                    <tbody>
                        {calendarList()}
                    </tbody>
                </table>
            </div>

        </div>


    )
}

export default Calendar;