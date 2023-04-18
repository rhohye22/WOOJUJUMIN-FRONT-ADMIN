import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Qnamodal from "./qnamodal";
function Qnadetail(props) {
  const [qna, setQna] = useState();
  const [loading, setLoading] = useState(false);

  let qnaSeq = props.qnaSeq;
  //console.log(params.qnaSeq);

  const qnaData = async (qnaSeq) => {
    const response = await axios.get("http://localhost:3000/getQna", {
      params: { qnaSeq: qnaSeq },
    });
    setQna(response.data);

    setLoading(true); // 여기서 rendering 해 준다
  };

  useEffect(() => {
    qnaData(props.qnaSeq);
  }, [props.qnaSeq]);

  if (loading === false) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table responsive>
        <colgroup>
          <col style={{ width: "150px" }} />
          <col style={{ width: "500px" }} />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td style={{ textAlign: "left" }}>{qna.id}</td>
          </tr>
          <tr>
            <th>작성일</th>
            <td style={{ textAlign: "left" }}>{qna.wdate}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td colSpan="2" style={{ textAlign: "left" }}>
              {qna.title}
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td style={{ textAlign: "left" }}>{qna.content}</td>
          </tr>

          <tr>
            <th>답변등록</th>
            <td style={{ textAlign: "left" }}>{qna.answer}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Qnadetail;
