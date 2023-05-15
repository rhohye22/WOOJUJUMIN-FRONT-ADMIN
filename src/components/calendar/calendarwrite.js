import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// npm i react-js-pagination 페이지네이션
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
// npm install date-fns --save
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Calendarwrite() {

    let history = useNavigate();

    // useParams Hook을 사용하여 URL 파라미터 값을 가져옴
    const { year, month, day } = useParams();
    let charDay = charTwo(day);
    // alert(year +month + charDay);
    let rdateVal = year + "-" + month + "-" + charDay;
    // let chrdateVal = year + "-" + month + "-" + charDay+ "T00:00:00.000Z";
    // const startDate = new Date(chrdateVal);

    let chrdateVal = new Date(year, month - 1, charDay);
    // const startDate = chrdateVal.toISOString().slice(0, 10); // "2023-05-20"
    // console.log(startDate.toString());
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tag, setTag] = useState("");
    const [reserTime, setReserTime] = useState("");
    const [test, setTest] = useState(chrdateVal);
    const [final, setFinal] = useState("");

    let reserTimeSplit = reserTime.split(":").join("");
    let rdate = 0;
    rdate = year + month + charDay + reserTimeSplit;
    let yyyymm = year + "" + month;
    // console.log(rdate);
    // alert(reserTimeSplit);
    // const [id, setId] = useState("");
    console.log(rdateVal + "확인용1");
    // console.log(chrdateVal + "확인용2");

    if (localStorage.getItem("login") === null) {
        alert("로그인 후 작성해주세요!");
        history("/main");
    }
    const storedData = JSON.parse(localStorage.getItem("login"));
    const storedId = storedData.id;



    // console.log("정보확인용" + storedId);
    // console.log(storedId + "세션 확인요ㅕㅇ");

    // 한자리 숫자를 두자리로 만들어주는 함수 : 1 ~ 9 -> 01 ~ 09
    function charTwo(msg) {
        if (typeof msg !== "string") {
            msg = String(msg); // 숫자나 다른 타입을 문자열로 변환
        }

        return msg.trim().length < 2 ? "0" + msg.trim() : msg.trim();
    }

    // 태그가 바뀔 때 마다 value 조절
    function handleChange(e) {
        setTag(e.target.value);
    }

    let chrdate = "";

    useEffect(() => {
        console.log("확인용" + test);
    }, [test]);

    // 만약 설정을 안한다면
    if (final === "") {
        // alert("확인");

        // alert(date);
        const year = test.getFullYear().toString();
        const month = (test.getMonth() + 1).toString().padStart(2, "0");
        const day = test.getDate().toString().padStart(2, "0");
        const hour = test.getHours().toString().padStart(2, "0");
        const minute = test.getMinutes().toString().padStart(2, "0");

        chrdate = year + month + day + hour + minute;
        // console.log("보내는용도"+chrdate);
        // alert(chrdate);
        setFinal(chrdate);
    }

    // 일정등록
    function calwrite(e) {
        // alert("확인용");
        e.preventDefault();

        // alert(tag);
        if (!tag || tag === null) {
            alert("태그 선택을 해주세요!");
            return;
        }
        if (title.trim().length < 3) {
            alert("제목을 세글자 이상 입력해주세요");
            return;
        }
        if (content.trim().length < 3) {
            alert("내용을 세글자 이상 입력해주세요");
            return;
        }


        axios.get("http://118.67.132.98:3000/calendarwrite", { params: { "manager": storedId, "title": title, "content": content, "rdate": final, "tag": tag } })
            .then(function (res) {
                // alert(res.data);
                if (res.data === "YES") {
                    history(`/calendar/${year}/${month}/${yyyymm}`);
                }
            })
            .catch(function (err) {
                alert(err);
            })
    }

    // 일정 목록으로 이동
    function backCal() {
        history(`/calendar/${year}/${month}/${yyyymm}`);
    }


    const handleDateChange = (date) => {
        setTest(date);

        // alert(date);
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");

        chrdate = year + month + day + hour + minute;
        // console.log("보내는용도"+chrdate);
        setFinal(chrdate);
    };


    return (
        <div>
            <h2 style={{fontWeight:"bold", fontSize:"30px", marginBottom:"30px"}}>일정 등록</h2>
            <table border="1" className="writetable">
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
                            <Form.Control type="text" placeholder="제목을 입력" onChange={(e) => setTitle(e.target.value)} />
                            {/* <input placeholder="제목을 입력" onChange={(e) => setTitle(e.target.value)} /> */}
                        </td>
                    </tr>
                    <tr>
                        <th>일정</th>
                        <td>
                            {/* <input type="date" defaultValue={rdateVal} />
                            <input type="time" value={reserTime} onChange={(e) => setReserTime(e.target.value)} /> */}
                            <DatePicker className="datecss"
                                locale={ko}
                                selected={test}
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
                            <Form.Control type="text" className="contentcss" placeholder="내용을 입력" onChange={(e) => setContent(e.target.value)} />
                            {/* <textarea placeholder="내용을 입력!!" onChange={(e) => setContent(e.target.value)} /> */}
                        </td>
                    </tr>
                </tbody>
            </table>
            <Button variant="primary" className="adminBtn" onClick={calwrite} type="submit" style={{marginTop:"20px"}}>일정등록</Button>
            <Button variant="primary" className="adminBtn" onClick={backCal} type="submit" style={{marginTop:"20px", marginLeft:"20px"}}>일정목록</Button>
            {/* <button onClick={calwrite}>일정 등록하기</button> */}
            {/* <button onClick={backCal}>일정 목록이동</button> */}
        </div>
    )
}
export default Calendarwrite;