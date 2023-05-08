import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Button from "react-bootstrap/Button";
import FreeBbsDetailReply from "./freebbsdetailReply";
import PartybbsdetailReply from "./partybbsdetailReply";
import FreeBbsReply from "./freeBbsReply";
import PartyBbsReply from "./partyBbsReply";
function Comment() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [spamlist, setSpamlist] = useState([]);

  const isLogin = localStorage.getItem("login");

  useEffect(() => {
    if (isLogin == null) {
      alert("로그인해 주십시오");
      navigate("/"); // 로그인 페이지로 이동
    } else {
      const login = JSON.parse(isLogin);
      setId(login.id);
    }
  }, [navigate, isLogin]);

  function getSpamlist() {
    if (!isLogin) {
      return;
    }
    axios
      .get("http://localhost:3000/allSpamWord")
      .then(function (resp) {
        setSpamlist(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }

  //스팸단어 추가
  const [word, setWord] = useState("");

  function addSpamlist() {
    if (word === undefined || word.trim() === "") {
      alert("등록할 단어를 입력하세요");
      return;
    }
    axios
      .post("http://localhost:3000/addSpamword", null, {
        params: { word: word },
      })
      .then((resp) => {
        if (resp.data === "YES") {
          alert("단어가 등록되었습니다");
          setWord("");
          getSpamlist();
          getSpamBbslist();
          getSpamPartylist();
        } else {
          alert("단어 등록에 실패했습니다");
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }
  useEffect(() => {
    if (id) {
      getSpamlist();
    }
  }, [id]);

  //단어 삭제
  function deletSpamword(delword) {
    axios
      .post("http://localhost:3000/deleteSpamword", null, {
        params: { word: delword },
      })
      .then((resp) => {
        if (resp.data === "YES") {
          alert("삭제되었습니다.");
          getSpamlist();
          getSpamBbslist();
          getSpamPartylist();
        } else {
          alert("삭제에 실패했습니다");
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }

  function onRemove(delword) {
    if (window.confirm("정말 삭제합니까?")) {
      deletSpamword(delword);
    } else {
      alert("취소합니다.");
    }
  }

  //스팸단어를 포함하고 있는 자유게시판글

  const [spambbslist, setSpambbslist] = useState([]);

  function getSpamBbslist() {
    axios
      .get("http://localhost:3000/freeBbsSpamReply")
      .then(function (resp) {
        setSpambbslist(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }

  useEffect(() => {
    if (id) {
      getSpamBbslist();
    }
  }, [id]);

  //스팸단어를 포함하고 있는 모집게시판글

  const [spampartylist, setSpampartylist] = useState([]);

  function getSpamPartylist() {
    axios
      .get("http://localhost:3000/partyBbsSpamReply")
      .then(function (resp) {
        setSpampartylist(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }

  useEffect(() => {
    if (id) {
      getSpamPartylist();
    }
  }, [id]);

  return (
    <div className="spampage">
      <div className="spampageLeft">
        <div className="spamwordtable">
          <table>
            <colgroup>
              <col width={"400px"} />
              <col width={"100px"} />
            </colgroup>
            <thead>
              <tr>
                <th>스팸단어</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {spamlist && spamlist.length ? (
                spamlist.map(function (spam, i) {
                  return (
                    <tr key={i}>
                      <td align="left">{spam.word}</td>
                      <td>
                        <Button variant="outline-secondary" size="sm" onClick={() => onRemove(spam.word)}>
                          삭제
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <td>등록된 스팸단어가 없습니다</td>
              )}
            </tbody>
          </table>
        </div>
        <div className="inputspamword">
          <table>
            <tr>
              <td style={{ textAlign: "center" }}>
                <input type={"text"} value={word} onChange={(e) => setWord(e.target.value)} placeholder="등록단어"></input>
              </td>
              <td style={{ textAlign: "center" }}>
                <Button variant="secondary" size="sm" type="button" onClick={() => addSpamlist()}>
                  등록
                </Button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className="spampageMidle">
        <div className="spampageMidle1">
          <h5>자유게시판</h5>
          <table>
            <colgroup>
              <col width={"60%"} />
              <col width={"20%"} />
              <col width={"20%"} />
            </colgroup>
            <thead>
              <tr>
                <th>댓글</th>
                <th>내용보기</th>
                <th>댓글보기</th>
              </tr>
            </thead>
            <tbody>
              {spambbslist && spambbslist.length ? (
                spambbslist.map(function (spambbs, i) {
                  return (
                    <tr key={i}>
                      <td align="left">{spambbs.content.substring(0, 25)}</td>
                      <td>
                        <Link to={`free/${spambbs.replySeq}`}>
                          <Button variant="outline-secondary" size="sm" utton>
                            게시글
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <Link to={`free/reply/${spambbs.replySeq}/${spambbs.seq}`}>
                          <Button variant="outline-secondary" size="sm" utton>
                            댓글
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <td colSpan={2}>의심 게시물이 없습니다</td>
              )}
            </tbody>
          </table>
        </div>
        <div className="spampageMidle2">
          <h5>모집게시판</h5>
          <table>
            <colgroup>
              <col width={"60%"} />
              <col width={"20%"} />
              <col width={"20%"} />
            </colgroup>
            <thead>
              <tr>
                <th>댓글</th>
                <th>내용보기</th>
                <th>댓글보기</th>
              </tr>
            </thead>
            <tbody>
              {spampartylist && spampartylist.length ? (
                spampartylist.map(function (spambbs, i) {
                  return (
                    <tr key={i}>
                      <td align="left">{spambbs.content.substring(0, 25)}</td>
                      <td>
                        <Link to={`party/${spambbs.replySeq}`}>
                          <Button variant="outline-secondary" size="sm">
                            게시글
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <Link to={`party/reply/${spambbs.replySeq}/${spambbs.seq}`}>
                          <Button variant="outline-secondary" size="sm">
                            댓글
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <td colSpan={2}>의심 게시물이 없습니다</td>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="spampageRight">
        <Routes>
          <Route path="free/:bbsSeq" element={<FreeBbsDetailReply />} />
          <Route path="party/:partySeq" element={<PartybbsdetailReply />} />
          <Route path="free/reply/:bbsSeq/:seq" element={<FreeBbsReply />} />
          <Route path="party/reply/:partySeq/:seq" element={<PartyBbsReply />} />
        </Routes>
      </div>
    </div>
  );
}
export default Comment;
