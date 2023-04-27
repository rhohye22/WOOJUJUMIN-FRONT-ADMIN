import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function CalendarList() {

    let navigate = useNavigate();

    const { rdate } = useParams();
    console.log(rdate);
    const [daylist, setDaylist] = useState([]);

    // 나중에 로그인한 아이디 가져가게 코드 수정 
    const id = "admin";
    localStorage.setItem("login", id);

    const storedId = localStorage.getItem("login");

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
            <h2>여기는 일정리스트 보기!</h2>
            <table border={1}>
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
            <button type="button" onClick={calendarlist}>일정 돌아가기</button>
        </div>
    )
}
export default CalendarList;