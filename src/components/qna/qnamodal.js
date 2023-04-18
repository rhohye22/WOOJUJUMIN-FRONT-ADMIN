import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Qnadetail from "./qnadetail";

import "bootstrap/dist/css/bootstrap.min.css";

function Qnamodal(props) {
  const [show, setShow] = useState(false);

  const [qnaSeq, setQnaSeq] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setQnaSeq(props.qnaSeq);
    setShow(true);
  };

  return (
    <div>
      <Button onClick={handleShow}>답변등록</Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>답변등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Qnadetail qnaSeq={qnaSeq} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn_close"
            variant="secondary"
            onClick={handleClose}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Qnamodal;
