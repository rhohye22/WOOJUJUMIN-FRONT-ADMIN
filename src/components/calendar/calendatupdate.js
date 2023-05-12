import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
// npm install date-fns --save
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fi } from "date-fns/locale";

function Calendarupdate() {

    let history = useNavigate();

    const { calSeq } = useParams();
    // console.log(calSeq);
    const [calinform, setCalinform] = useState([]);
    // const [calDate, setCalDate] = useState("");
    const [calYear, setCalYear] = useState("");
    const [calMonth, setCalMonth] = useState("");
    const [calDay, setCalDay] = useState("");
    const [calTime, setCalTime] = useState("");
    const [calTimeSec, setCalTimeSec] = useState("");
    const [tag, setTag] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [reserDate, setReserDate] = useState("");
    const [reserTime, setReserTime] = useState("");
    const [datepic, setDatepic] = useState("");
    const [final, setFinal] = useState("");


    // console.log(reserDate);
    // const [calDto, setCalDto] = useState([]);
    // let resevDate = calYear + "-" + calMonth + "-" + calDay;
    // let resevTime = calTime + ":" + calTimeSec;
    // console.log(resevDate);


    // 태그가 바뀔 때 마다 value 조절
    function handleChange(e) {
        setTag(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:3000/calendardetail", null, { params: { "calSeq": calSeq } });
                if (response.data) { // 데이터가 유효한 경우에만 setCalinform 호출
                    console.log(response.data);
                    setCalinform(response.data);
                    // setCalDate(response.data.rdate.substring(0,8));
                    setCalYear(response.data.rdate.substring(0, 4));
                    setCalMonth(response.data.rdate.substring(4, 6));
                    setCalDay(response.data.rdate.substring(6, 8));
                    setCalTime(response.data.rdate.substring(8, 10));
                    setCalTimeSec(response.data.rdate.substring(10, 12));
                    setTitle(response.data.title);
                    setContent(response.data.content);
                    setTag(response.data.tag);
                    setReserDate(response.data.rdate);
                    setReserTime(response.data.wdate.substring(11, 16));
                    let chrdateVal = new Date(response.data.rdate.substring(0, 4), response.data.rdate.substring(4, 6) - 1, response.data.rdate.substring(6, 8), response.data.rdate.substring(8, 10), response.data.rdate.substring(10, 12));
                    // setDatepic(response.data.rdate.substring(0,4)+"-"+response.data.rdate.substring(4,6)+"-"+response.data.rdate.substring(6,8)+"T"+response.data.rdate.substring(8,10)+":"+response.data.rdate.substring(10,12)+":00");
                    setDatepic(chrdateVal);
                    setFinal(response.data.rdate);

                }
            } catch (error) {
                console.error(error);
                alert(error.message);
            }
        };

        fetchData();

    }, [calSeq]);

    const storedData = JSON.parse(localStorage.getItem("login"));
    const storedId = storedData.id;
    // console.log("정보확인용" + storedId);

    // console.log(reserDate + "들어가는 값 확인");
    // console.log(reserTime + "들어가는 값 확인");
    // console.log(datepic + "들어가는 값 확인");
    // console.log (reserDate.substring(0,4)+"-"+reserDate.substring(4,6)+"-"+reserDate.substring(6,8)+"T"+reserDate.substring(8,10)+":"+reserDate.substring(10,12)+":00");

    
    function calupdate() {
        // alert("확인용");
        // alert(reserDate);
        // alert(reserTime);
        // alert(title);
        // alert(content);
        // alert(final);

        // let reserDateSplit = reserDate.split("-").join("");
        // let reserTimeSplit = reserTime.split(":").join("");

        // let rdate = reserDateSplit + reserTimeSplit;
        // alert(rdate);

        // if (final === "") {
        //     alert("확인");
    
        //     setFinal(reserDate);
        // }

        axios.get("http://localhost:3000/calendarupdate", { params: { "calSeq": calSeq, "manager": storedId, "tag": tag, "title": title, "content": content, "rdate": final } })
            .then(function (res) {
                // alert(res.data);
                if (res.data === "YES") {
                    history(`/calendar/${calYear}/${calMonth}/${calYear + "" + calMonth}`);
                    // history(`/calendar/${final.substring(0, 4)}/${final.substring(4, 6)}/${final.substring(0, 6)}`);
                }

            })
            .catch(function (err) {
                alert(err);
            })
    }

    let chrdate = "";

    const handleDateChange = (date) => {
        setDatepic(date);

        // alert(date);
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");

        chrdate = year + month + day + hour + minute;
        console.log("보내는용도" + chrdate);
        setFinal(chrdate);
    };

    // 일정 목록으로 이동
    function backCal() {
        history(`/calendar/${calYear}/${calMonth}/${calYear + "" + calMonth}`);
    }

    return (
        <div>
            <h2>일정 수정</h2>
            <table border={1} className="writetable">
                <tbody>
                    <tr>
                        <th>
                            <select value={tag} onChange={handleChange}>
                                <option value="category">태그선택</option>
                                <option value="1">농구</option>
                                <option value="2">축구</option>
                                <option value="3">야구</option>
                                <option value="4">예능</option>
                                <option value="5">드라마/영화</option>
                                <option value="6">게임</option>
                                <option value="7">음식</option>
                                <option value="8">우주주민 함께</option>
                                <option value="9">우주주민 탐사</option>
                            </select>
                        </th>
                        <td>
                            <Form.Control type="text" placeholder="제목을 입력" value={title} onChange={(e) => setTitle(e.target.value)} />
                            {/* <input value={title} onChange={(e)=>setTitle(e.target.value)}/> */}
                        </td>
                    </tr>
                    <tr>
                        <th>일정</th>
                        <td>
                            {/* {calYear}-{calMonth}-{calDay} {calTime}:{calTimeSec} */}
                            {/* <input type="date" value={reserDate} onChange={(e) => { setReserDate(e.target.value); console.log(reserDate); }} /> */}
                            {/* <input type="time" value={reserTime} onChange={(e) => setReserTime(e.target.value)} /> */}
                            <DatePicker className="datecss"
                                locale={ko}
                                selected={datepic}
                                onChange={handleDateChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={10}
                                dateFormat="yyyy/MM/dd h:mm aa"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>
                            <Form.Control type="text" value={content} className="contentcss" placeholder="내용을 입력" onChange={(e) => setContent(e.target.value)} />
                            {/* <textarea value={content} onChange={(e) => setContent(e.target.value)} ></textarea> */}
                        </td>
                    </tr>
                </tbody>
            </table>
            <Button variant="primary" onClick={calupdate} type="submit" style={{ marginTop: "20px", marginLeft: "20px" }}>일정 수정</Button>
            <Button variant="primary" onClick={backCal} type="submit" style={{ marginTop: "20px", marginLeft: "20px" }}>일정목록</Button>
            {/* <button type="button" onClick={calupdate}>일정 수정하기</button> */}
        </div>
    )
}

export default Calendarupdate;