import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
function AllQna() {
  const navigate = useNavigate();
  const [id, setId] = useState("");

  const isLogin = localStorage.getItem("login");

  const [qnalist, setQnalist] = useState([]);

  // paging

  useEffect(() => {
    if (isLogin == null) {
      alert("로그인해 주십시오");
      navigate("/"); // 로그인 페이지로 이동
    } else {
      const login = JSON.parse(isLogin);
      setId(login.id);
    }
  }, [navigate, isLogin]);

  function getQnalist() {
    if (!isLogin) {
      return;
    }
    axios
      .get("http://localhost:3000/allnewqna")
      .then(function (resp) {
        console.log(resp.data);
        setQnalist(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }
  useEffect(() => {
    if (id) {
      getQnalist();
    }
  }, [id]);

  return (
    <div className="table-container">
      <table border="1">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성날짜</th>
          </tr>
        </thead>
        <tbody>
          {qnalist && qnalist.length ? (
            qnalist.map(function (qna, i) {
              return (
                <tr key={i}>
                  <td align="left">
                    {qna.ansdate ? (
                      <span>[답변완료] </span>
                    ) : (
                      <span>[답변대기중] </span>
                    )}
                    <Link to={`/qnadetail/${qna.qnaSeq}`}>{qna.title}</Link>
                  </td>
                  <td>{qna.wdate.substring(0, 10)}</td>
                </tr>
              );
            })
          ) : (
            <td colSpan={2}>작성된 문의글이 없습니다</td>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default AllQna;
