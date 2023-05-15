import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function CalendarList() {

    let navigate = useNavigate();

    const { rdate } = useParams();
    console.log(rdate);
    const [daylist, setDaylist] = useState([]);

    // 나중에 로그인한 아이디 가져가게 코드 수정 - 0515 수정
    const isLogin = JSON.parse(localStorage.getItem("login"));
    const storedId = isLogin.id;

    useEffect(function () {
        async function fetchData() {
            await axios.get("http://localhost:3000/calendarlist", { params: { "rdate": rdate, "manager": storedId } })
                .then(function (res) {
                    // alert(JSON.stringify(res.data));
                    // alert(JSON.stringify(res.data[0]));
                    setDaylist(res.data);

                })
                .catch(function (err) {
                    alert(err);
                })

        }

        fetchData();
    }, [rdate, storedId]);

    function calendarlist(){
        const year = rdate.substring(0,4);
        const month =rdate.substring(4,6);
        const yyyymm = rdate.substring(0,6);
        navigate(`/calendar/${year}/${month}/${yyyymm}`);
    }
    return (
        <div>
            <h2 style={{fontWeight:"bold", fontSize:"30px", marginBottom:"40px"}}>{rdate.substring(0,4)}년 {rdate.substring(4,6)}월 {rdate.substring(6,8)}일 일정 전체보기 </h2>
            <table border={1} className="listTable">
                <colgroup>
                    <col width={100} />
                    <col width={400} />
                    <col width={300} />
                </colgroup>
                <tbody>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>일자</th>
                    </tr>
                    {daylist.map(function (day, i) {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td><Link to={`/calendardetail/${day.calSeq}`}>{day.title}</Link></td>
                                <td>{day.rdate.substring(0, 8)}-{day.rdate.substring(8,10)}:{day.rdate.substring(10,12)}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <Button variant="primary" className="adminBtn" onClick={calendarlist} type="submit" style={{marginTop:"20px", marginLeft:"20px"}}>달력으로 돌아가기</Button>
            {/* <button type="button" onClick={calendarlist}>일정 돌아가기</button> */}
        </div>
    )
}
export default CalendarList;