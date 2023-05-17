import axios from "axios";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import MemDetail from "./memdetail";
function Patyleader(props) {
  const navigate = useNavigate();
  const auth = props.auth;
  const [memlist, setMemlist] = useState([]);

  function getFreelist() {
    axios
      .get("http://118.67.132.98:3000/getMemlistByAuth", {
        params: { auth: auth },
      })
      .then(function (resp) {
        setMemlist(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }
  useEffect(() => {
    getFreelist();
  }, []);

  return (
    <>
      <div className="mempageLeft">
        <table>
          <thead>
            <tr>
              <th>Seq</th>
              <th>프로필</th>
              <th>아이디</th>
              <th>닉네임</th>
              <th>이메일</th>
              <th>전화번호</th>
              <th>가입날짜</th>
              <th>상세</th>
            </tr>
          </thead>

          <tbody>
            {memlist && memlist.length ? (
              memlist.map(function (mem, i) {
                return (
                  <tr key={i}>
                    <td>{mem.memberSeq}</td>
                    <td>
                      <div
                        style={{
                          width: "100%",
                          height: "50px",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {mem.imageurl && mem.imageurl !== "" && mem.imageurl !== "null" ? (
                          <img
                            src={mem.imageurl}
                            alt="free image"
                            style={{
                              width: 40,
                              height: "auto",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        ) : null}
                      </div>
                    </td>

                    <td>{mem.id}</td>
                    <td>{mem.nickname}</td>

                    <td>{mem.email}</td>
                    <td>{mem.phoneNum}</td>
                    <td>{mem.regdate}</td>
                    <td>
                      <Button variant="success" size="sm" onClick={() => navigate(`${mem.memberSeq}`)}>
                        상세보기
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <td colSpan={6}>작성된 글이 없습니다</td>
            )}
          </tbody>
        </table>
      </div>
      <div className="mempageRight">
        <Routes>
          <Route path="/:memberSeq" element={<MemDetail />} />
        </Routes>
      </div>
    </>
  );
}
export default Patyleader;
