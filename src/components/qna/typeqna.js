import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useParams } from "react-router-dom";
import SimpleBarReact from "simplebar-react";
import Table from "react-bootstrap/Table";
import Qnadetail from "./qnadetail";
function Typeqna(props) {
  const navigate = useNavigate();
  const [id, setId] = useState("");

  const isLogin = localStorage.getItem("login");

  const [qnalist, setQnalist] = useState([]);
  const [qtypeParam, setQtypeParam] = useState("");

  let qtype = props.qtype;

  //
  const simpleBarRef = useRef(null);
  //

  useEffect(() => {
    if (isLogin == null) {
      alert("로그인해 주십시오");
      navigate("/"); // 로그인 페이지로 이동
    } else {
      const login = JSON.parse(isLogin);
      setId(login.id);
    }
  }, [navigate, isLogin]);

  function typeQnalist(qtype) {
    if (!isLogin) {
      return;
    }
    axios
      .get("http://118.67.132.98:3000/typeqna", {
        params: { qtype: qtype },
      })
      .then(function (resp) {
        console.log(resp.data);
        setQnalist(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }
  useEffect(() => {
    if (id && qtype) {
      // id와 qtype이 모두 있어야만 실행
      typeQnalist(qtype);
    }
  }, [id, qtype]);
  return (
    <>
      <div className="qnapageLeft">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>제목</th>
              <th>작성날짜</th>
              <th>답변</th>
            </tr>
          </thead>
          <tbody>
            {qnalist && qnalist.length ? (
              qnalist.map(function (qna, i) {
                return (
                  <tr key={i}>
                    <td align="left">
                      {qna.ansdate ? <span>[답변완료] </span> : <span>[답변대기중] </span>}
                      {qna.title}
                    </td>
                    <td>{qna.wdate.substring(0, 10)}</td>
                    <td>
                      <button onClick={() => navigate(`${qna.qnaSeq}`)}>답변하기</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <td colSpan={2}>작성된 문의글이 없습니다</td>
            )}
          </tbody>
        </Table>
      </div>

      <div className="qnapageRight">
        <Routes>
          <Route path="/:qnaSeq" element={<Qnadetail />} />
        </Routes>
      </div>
    </>
  );
}
export default Typeqna;
