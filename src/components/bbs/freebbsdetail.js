import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function FreeBbsDetail() {
  let navigate = useNavigate();

  const [freebbs, setFreeBbs] = useState({});
  const [loading, setLoading] = useState(false);
  //접속정보

  let params = useParams();

  let bbsSeq = params.bbsSeq;

  const qnaData = async (bbsSeq) => {
    const response = await axios.get("http://118.67.132.98:3000/getfreeBbs", {
      params: { bbsSeq: bbsSeq },
    });
    setFreeBbs(response.data);
    setLoading(true); // 여기서 rendering 해 준다
  };

  useEffect(() => {
    qnaData(params.bbsSeq);
  }, [params.bbsSeq]);

  if (loading === false) {
    return <div>Loading...</div>;
  }

  const imageUrl = freebbs.image !== null ? `http://118.67.132.98:3000/upload/freebbs/${freebbs.image}` : null;

  //숨기기
  function delfreebbs() {
    axios
      .post("http://118.67.132.98:3000/delFreebbsByAdmin", null, {
        params: { bbsSeq: bbsSeq },
      })
      .then((resp) => {
        if (resp.data === "YES") {
          alert("숨김처리되었습니다.");
        } else {
          alert("숨김실패");
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }

  //노출하기
  function reopenFreebbs() {
    axios
      .post("http://118.67.132.98:3000/reopenFreebbsByAdmin", null, {
        params: { bbsSeq: bbsSeq },
      })
      .then((resp) => {
        if (resp.data === "YES") {
          alert("노출처리되었습니다");
        } else {
          alert("노출실패");
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }

  return (
    <div>
      <br />
      <Table responsive>
        <colgroup>
          <col width={"100px"} />
          <col width={"500px"} />
          <col width={"150px"} />
        </colgroup>
        <tbody>
          <tr>
            <th>제목</th>
            <td>{freebbs.title}</td>
            <th>작성자</th>
            <td>{freebbs.id}</td>
          </tr>
          <tr>
            <th>작성시간</th>
            <td>{freebbs.wdate}</td>
          </tr>
          <tr>
            <td colSpan={4}>
              <br /> <br />
              {imageUrl !== null ? (
                <img
                  src={imageUrl}
                  alt="no image"
                  style={{
                    width: 500,
                    height: "auto",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              ) : null}
              <br /> <br />
              <pre>{freebbs.content}</pre>
              <br /> <br />
            </td>
          </tr>
        </tbody>
      </Table>
      <Button variant="danger" onClick={() => delfreebbs()}>
        숨기기
      </Button>{" "}
      &nbsp;&nbsp;&nbsp;
      <Button variant="success" onClick={() => reopenFreebbs()}>
        노출하기
      </Button>
      <br />
      <br />
    </div>
  );
}

export default FreeBbsDetail;
