import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import FreeBbsReply from "./freeBbsReply";
function PartybbsdetailReply() {
  let navigate = useNavigate();

  const [freebbs, setFreeBbs] = useState({});
  const [loading, setLoading] = useState(false);

  //댓글

  //접속정보
  let params = useParams();
  let partySeq = params.partySeq;

  const qnaData = async (partySeq) => {
    const response = await axios.get("http://118.67.132.98:3000/getPartyBbsAdmin", {
      params: { partySeq: partySeq },
    });
    setFreeBbs(response.data);
    setLoading(true); // 여기서 rendering 해 준다
  };

  useEffect(() => {
    qnaData(params.partySeq);
  }, [params.partySeq]);

  if (loading === false) {
    return <div>Loading...</div>;
  }

  //const imageUrl = freebbs.image !== null ? `http://118.67.132.98:3000/upload/partybbs/${freebbs.image}` : null;

  return (
    <div>
      <br />
      <Table responsive>
        <colgroup>
          <col width={"80px"} />
          <col width={"500px"} />
          <col width={"150px"} />
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
              {freebbs.imageurl && freebbs.imageurl !== "" && freebbs.imageurl !== "null" ? (
                <img
                  src={freebbs.imageurl}
                  alt="no image"
                  style={{
                    width: "80%",
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
    </div>
  );
}

export default PartybbsdetailReply;
