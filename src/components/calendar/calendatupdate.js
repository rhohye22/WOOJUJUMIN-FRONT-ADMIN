import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Calendarupdate(){

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
                    setCalYear(response.data.rdate.substring(0,4));
                    setCalMonth(response.data.rdate.substring(4,6));
                    setCalDay(response.data.rdate.substring(6,8));
                    setCalTime(response.data.rdate.substring(8,10));
                    setCalTimeSec(response.data.rdate.substring(10,12));
                    setTitle(response.data.title);
                    setContent(response.data.content);
                    setTag(response.data.tag);
                    setReserDate(response.data.wdate.substring(0,10));
                    setReserTime(response.data.wdate.substring(11,16));
                }
            } catch (error) {
                console.error(error);
                alert(error.message);
            }
        };

        fetchData();

    }, [calSeq]);

    // 아직 로그인 기능이 없어서 임의로 아이디 세션 만들어 놓음 나중에 삭제 
    const id = "admin";
    localStorage.setItem("login", id);

    const storedId = localStorage.getItem("login");

    function calupdate(){
        // alert("확인용");
        // alert(reserDate);
        // alert(reserTime);
       
        let reserDateSplit = reserDate.split("-").join("");
        let reserTimeSplit = reserTime.split(":").join("");
        
        let rdate = reserDateSplit + reserTimeSplit;
        // alert(rdate);

        axios.get("http://localhost:3000/calendarupdate", {params:{"calSeq":calSeq,"manager": storedId ,"tag":tag, "title":title, "content":content, "rdate":rdate}})
        .then(function(res){
            // alert(res.data);
            if(res.data === "YES"){
                history("/calendar");
            }

        })
        .catch(function(err){
            alert(err);
        })
    }

    return(
        <div>
            <h2>여기는 일정 수정 입니다.</h2>
            <table border={1}>
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
                        <td><input value={title} onChange={(e)=>setTitle(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <th>일정</th>
                        <td>
                            {/* {calYear}-{calMonth}-{calDay} {calTime}:{calTimeSec} */}
                            <input type="date" value={reserDate} onChange={(e)=>{setReserDate(e.target.value); console.log(reserDate);}}/>
                            <input type="time" value={reserTime} onChange={(e)=>setReserTime(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>
                            <textarea value={content} onChange={(e)=>setContent(e.target.value)} ></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" onClick={calupdate}>일정 수정하기</button>
        </div>
    )
}

export default Calendarupdate;