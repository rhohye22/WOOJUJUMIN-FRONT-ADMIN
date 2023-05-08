import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function MemDetail() {
  const [memberdata, setMemberdata] = useState({});

  let params = useParams();

  let memberSeq = params.memberSeq;

  function memData() {
    axios
      .get("http://localhost:3000/getMemeberInfo", {
        params: {
          memberSeq: memberSeq,
        },
      })
      .then(function (resp) {
        setMemberdata(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }

  //상태변경
  function stateControl(auth) {
    axios
      .post("http://localhost:3000/stateControl", null, {
        params: { memberSeq: memberSeq, auth: auth },
      })
      .then((resp) => {
        if (resp.data === "YES") {
          alert("처리되었습니다");
        } else {
          alert("실패");
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }

  function confrimState(auth) {
    if (window.confirm("회원유형을 변경하시겠습니까?")) {
      stateControl(auth);
    } else {
      alert("취소합니다.");
    }
  }

  useEffect(() => {
    memData();
  }, [params.memberSeq]);

  const imageUrl = memberdata.profile !== null ? `http://localhost:3000/upload/member/${memberdata.profile}` : null;

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
            <th>아이디</th>
            <td>{memberdata.id}</td>
            <th>닉네임</th>
            <td>{memberdata.nickname}</td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>{memberdata.phoneNum}</td>
            <th>이메일</th>
            <td>{memberdata.email}</td>
          </tr>
          <tr>
            <td colSpan={3}>
              <br /> <br />
              {imageUrl !== null ? (
                <img
                  src={imageUrl}
                  alt="no image"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              ) : null}
              <br /> <br />
              <br /> <br />
            </td>
          </tr>
        </tbody>
      </Table>
      {memberdata.auth === 0 ? (
        <Button variant="primary" size="sm" onClick={() => confrimState(1)}>
          파티장권한부여
        </Button>
      ) : null}
      &nbsp;&nbsp;&nbsp;
      {memberdata.auth === 1 ? (
        <Button variant="warning" size="sm" onClick={() => confrimState(0)}>
          일반회원권한
        </Button>
      ) : null}
      &nbsp;&nbsp;&nbsp;
      {memberdata.auth === 0 || memberdata.auth === 1 || memberdata.auth === 2 ? (
        <Button variant="danger" size="sm" onClick={() => confrimState(3)}>
          활동정지
        </Button>
      ) : null}
      &nbsp;&nbsp;&nbsp;
      {memberdata.auth === 3 ? (
        <Button variant="info" size="sm" onClick={() => confrimState(0)}>
          활동정지해제
        </Button>
      ) : null}
      <br />
      <br />
    </div>
  );
}

export default MemDetail;
