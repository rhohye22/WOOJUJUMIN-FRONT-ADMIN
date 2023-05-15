//import Pagination from "react-js-pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function FreeBbsReply() {
  let navigate = useNavigate();

  const [replylist, setReplylist] = useState([]);

  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);

  let params = useParams();
  let replySeq = params.bbsSeq;
  let seq = params.seq;

  const [content, setContent] = useState("");

  function getReplylist() {
    axios
      .get("http://118.67.132.98:3000/freeReplyList", {
        params: { replySeq: replySeq, start: start, limit: limit },
      })
      .then(function (resp) {
        setReplylist(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }

  useEffect(() => {
    getReplylist();
  }, [replySeq, limit, content]);

  const handleLoadMore = () => {
    setLimit((prev) => prev + 10);
  };

  //숨김처리
  function delreply(del) {
    axios
      .post("http://118.67.132.98:3000/stateFreeReplyControl", null, {
        params: { replySeq: replySeq, seq: seq, del: del },
      })
      .then((resp) => {
        if (resp.data === "YES") {
          alert("처리되었습니다.");
          getReplylist();
        } else {
          alert("실패했습니다");
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }
  function onRemove(del) {
    if (window.confirm("댓글을 처리하겠습니까?")) {
      delreply(del);
    } else {
      alert("취소합니다.");
    }
  }

  return (
    <div>
      <table style={{ width: "100%" }}>
        <colgroup>
          <col width={"20%"} />
          <col width={"80%"} />
        </colgroup>

        <tbody>
          {replylist && replylist.length ? (
            replylist.map(function (reply, i) {
              return reply.del == 0 ? (
                reply.seq == seq ? (
                  <tr key={i}>
                    <td style={{ backgroundColor: "yellow" }}>{reply.writer}</td>
                    <td style={{ backgroundColor: "yellow", textAlign: "left" }}>
                      <Button variant="danger" size="sm" onClick={() => onRemove(1)}>
                        숨김
                      </Button>
                      &nbsp; &nbsp; &nbsp;
                      {reply.content}
                    </td>
                  </tr>
                ) : (
                  <tr key={i}>
                    <td>{reply.writer}</td>
                    <td style={{ textAlign: "left" }}>{reply.content}</td>
                  </tr>
                )
              ) : (
                <tr key={i}>
                  <td>{reply.writer}</td>
                  <td style={{ textAlign: "left" }}>
                    {" "}
                    <Button variant="danger" size="sm" onClick={() => onRemove(0)}>
                      복구
                    </Button>
                    <span style={{ color: "red" }}>[규제된 댓글] {reply.content}</span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={2}>작성된 글이 없습니다</td>
            </tr>
          )}
          <tr>
            <td colSpan={2}>
              <button onClick={handleLoadMore}>
                <b>댓글 더보기</b>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <br />
      <br />
    </div>
  );
}

export default FreeBbsReply;
