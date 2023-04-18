import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// npm i react-js-pagination 페이지네이션

function Calendarwrite() {

    let history = useNavigate();

    // useParams Hook을 사용하여 URL 파라미터 값을 가져옴
    const { year, month, day } = useParams();
    let charDay = charTwo(day);
    // alert(year +month + charDay);
    let rdateVal = year + "-" + month + "-" + charDay;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tag, setTag] = useState("");
    const [reserTime, setReserTime] = useState("");
    // alert(reserTime);
    let reserTimeSplit = reserTime.split(":").join("");
    let rdate = 0;
    rdate = year + month + charDay + reserTimeSplit;
    // console.log(rdate);
    // alert(reserTimeSplit);
    // const [id, setId] = useState("");

    // 아직 로그인 기능이 없어서 임의로 아이디 세션 만들어 놓음 나중에 삭제 
    const id = "admin";
    localStorage.setItem("login", id);

    const storedId = localStorage.getItem("login");
    // alert(storedId);

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

    function calwrite() {
        // alert("확인용");
        // http://localhost:3000/calendarmain
        axios.get("http://localhost:3000/calendarwrite", { params: { "manager": storedId, "title": title, "content": content, "rdate": rdate, "tag": tag } })
            .then(function (res) {
                // alert(res.data);
                if (res.data === "YES") {
                    history("/calendar");
                }
            })
            .catch(function (err) {
                alert(err);
            })
    }

    function backCal() {
        history('/calendar');
    }

    return (
        <div>
            <h2>여기는 일정 쓰기 입니다.</h2>
            <table border="1">
                <tbody>
                    <tr>
                        <td>
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
                        </td>
                        <td><input placeholder="제목을 입력" onChange={(e) => setTitle(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>일정</th>
                        <td>
                            <input type="date" defaultValue={rdateVal} />
                            <input type="time" value={reserTime} onChange={(e) => setReserTime(e.target.value)} />
                        </td>
                    </tr>
                    <tr>

                        <th>내용</th>
                        <td><textarea placeholder="내용을 입력!!" onChange={(e) => setContent(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={calwrite}>일정 등록하기</button>
            <button onClick={backCal}>일정 목록이동</button>
        </div>
    )
}
export default Calendarwrite;