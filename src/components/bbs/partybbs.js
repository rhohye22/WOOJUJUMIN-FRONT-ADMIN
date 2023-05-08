import axios from "axios";
import Pagination from "react-js-pagination";

import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import PartyBbsDetail from "./partybbsdetail";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./bbs.css";

function Partybbs() {
  const navigate = useNavigate();
  //로그인관련

  const [id, setId] = useState("");
  const [auth, setAuth] = useState();

  const isLogin = localStorage.getItem("login");

  useEffect(() => {
    if (isLogin == null) {
      return;
    } else {
      const login = JSON.parse(isLogin);
      setId(login.id);
      setAuth(login.auth);
    }
  }, [isLogin]);

  const [freelist, setFreelist] = useState([]);

  const [choice, setChoice] = useState();
  const [search, setSearch] = useState();
  const [tag, setTag] = useState();

  // paging
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  function PartyBbslistAdmin() {
    axios
      .get("http://localhost:3000/PartyBbslistAdmin", {
        params: { choice: choice, search: search, start: start, tag: tag },
      })
      .then(function (resp) {
        setFreelist(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }

  function cntPartyBbsAdmin() {
    axios
      .get("http://localhost:3000/cntPartyBbsAdmin", {
        params: {
          choice: choice,
          search: search,
          tag: tag,
        },
      })
      .then(function (resp) {
        setTotalCnt(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }

  function searchBtn() {
    PartyBbslistAdmin(choice, search);
  }

  function pageChange(page) {
    setPage(page);
    setStart((page - 1) * 20);
  }
  useEffect(() => {
    PartyBbslistAdmin();
    cntPartyBbsAdmin();
  }, [start, totalCnt, tag, choice]);

  return (
    <>
      <div className="bbspageLeft">
        <select value={choice} onChange={(e) => setChoice(e.target.value)}>
          <option>검색</option>
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="writer">작성자</option>
        </select>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="검색어" />
        &nbsp;
        <Button variant="outline-dark" onClick={searchBtn}>
          검색
        </Button>
        <br /> <br />
        <Button variant="outline-secondary" size="sm" value={""} onClick={(e) => setTag(e.target.value)}>
          전체
        </Button>
        &nbsp;&nbsp;
        <Button variant="outline-secondary" size="sm" value={10} onClick={(e) => setTag(e.target.value)}>
          잡담
        </Button>
        &nbsp;&nbsp;
        <Button variant="outline-secondary" size="sm" value={1} onClick={(e) => setTag(e.target.value)}>
          농구
        </Button>
        &nbsp;&nbsp;
        <Button variant="outline-secondary" size="sm" value={2} onClick={(e) => setTag(e.target.value)}>
          축구
        </Button>
        &nbsp;&nbsp;
        <Button variant="outline-secondary" size="sm" value={3} onClick={(e) => setTag(e.target.value)}>
          야구
        </Button>
        &nbsp;&nbsp;
        <Button variant="outline-secondary" size="sm" value={4} onClick={(e) => setTag(e.target.value)}>
          예능
        </Button>
        &nbsp;&nbsp;
        <Button variant="outline-secondary" size="sm" value={5} onClick={(e) => setTag(e.target.value)}>
          드라마/영화
        </Button>
        &nbsp;&nbsp;
        <Button variant="outline-secondary" size="sm" value={6} onClick={(e) => setTag(e.target.value)}>
          게임
        </Button>
        &nbsp;&nbsp;
        <Button variant="outline-secondary" size="sm" value={7} onClick={(e) => setTag(e.target.value)}>
          음식
        </Button>
        &nbsp;&nbsp;
        <Button variant="outline-secondary" size="sm" value={8} onClick={(e) => setTag(e.target.value)}>
          함께해요
        </Button>
        &nbsp;&nbsp;
        <Button variant="outline-secondary" size="sm" value={9} onClick={(e) => setTag(e.target.value)}>
          함께가요
        </Button>
        &nbsp;
        <br />
        <br />
        <Table striped bordered hover>
          <colgroup>
            <col width={"10%"} />
            <col width={"35%"} />

            <col width={"15%"} />
            <col width={"10%"} />
            <col width={"10%"} />
            <col width={"20%"} />
          </colgroup>
          <thead>
            <tr>
              <th>seq</th>
              <th>제목</th>

              <th>작성일</th>
              <th>조회수</th>
              <th>좋아요</th>
              <th>노출상태</th>
            </tr>
          </thead>
          <tbody>
            {freelist && freelist.length ? (
              freelist.map(function (free, i) {
                return (
                  <tr key={i}>
                    <td>{free.partySeq}</td>
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
                        {free.image !== null ? (
                          <img
                            src={`http://localhost:3000/upload/freebbs/${free.image}`}
                            alt="free image"
                            style={{
                              width: 40,
                              height: "auto",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        ) : null}
                        &nbsp;&nbsp;<Link to={`${free.partySeq}`}>{free.title}</Link>{" "}
                      </div>
                    </td>
                    <td>{free.wdate.substring(0, 10)}</td>
                    <td>{free.readcount}</td>
                    <td>{free.likey}</td>
                    {free.del == 0 ? (
                      <td>
                        <b>
                          <p style={{ color: "blue" }}>정상노출</p>
                        </b>
                      </td>
                    ) : free.del == 1 ? (
                      <td>
                        <b>
                          <p style={{ color: "red" }}>작성자가 삭제</p>
                        </b>
                      </td>
                    ) : (
                      <td>
                        <b>
                          <p style={{ color: "purple" }}>관리자가 숨김</p>
                        </b>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <td colSpan={6}>작성된 글이 없습니다</td>
            )}
          </tbody>
        </Table>
        <br />
        <Pagination activePage={page} itemsCountPerPage={20} totalItemsCount={totalCnt} pageRangeDisplayed={5} prevPageText={"이전"} nextPageText={"다음"} onChange={pageChange} />
        <br />
        <br />
        <br />
      </div>
      <div className="bbspageRight">
        <Routes>
          <Route path="/:partySeq" element={<PartyBbsDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default Partybbs;
