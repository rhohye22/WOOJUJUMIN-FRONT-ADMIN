import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';


function Partyleader() {


    const [checklist, setChecklist] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedIdx, setSelectedIdx] = useState(-1);

    // const [sendmodalcontent, setSendmodalcontent] = useState({});

    // 클릭 핸들러 함수
    const handleButtonClick = (index) => {
        setSelectedIdx(index);
        // setSendmodalcontent(checklist[index])
        // alert(index);
        openModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {

        const fetchData = async () => {
            await axios.post("http://localhost:3000/partycheck", null, { params: {} })
                .then(function (res) {
                    // console.log(JSON.stringify(res.data));
                    setChecklist(res.data);
                })
                .catch(function (err) {
                    alert(err);
                })
        }

        fetchData();

    }, []);


    function check() {


        const partyleadersuccess = (rowIndex, memid) => {
            console.log(`Button in row ${rowIndex} clicked!`);
            // alert("?");

            axios.post("http://localhost:3000/partyleadersuccess", null, { params: { "memid": memid } })
            .then(function (res) {
                alert(res.data);
                window.location.reload();
            })
            .catch(function (err) {
                alert(err);
            })
        };


        // 나중에 2로 변경하고 승인 거절된 것을 알림으로 알려주기
        const partyleaderfail = (rowIndex, memid) => {
            console.log(`Button in row ${rowIndex} clicked!`);
            // alert("?");

            axios.post("http://localhost:3000/partyleadersuccess", null, { params: { "memid": memid } })
            .then(function (res) {
                alert(res.data);
                window.location.reload();
            })
            .catch(function (err) {
                alert(err);
            })
        };


        // for (let i = 0; i < checklist.length; i++) {
        //     buttonClick(i);
        // }

        const datalist = checklist.map((list, index) => (

            <tr key={index}>
                <td>{index + 1}</td>
                <td>{list.memid}</td>
                <td>{list.wdate.substring(0, 10)}</td>
                <td>
                    <button onClick={() => handleButtonClick(index)}>정보 보기</button>
                    <InfoModal isOpen={isModalOpen} title="파티장 신청 정보보기"
                        content={modalcontent} closeModal={closeModal} />
                </td>
                <td>
                    <button type="button" onClick={() => partyleadersuccess(index, list.memid)}>YES</button>
                    <button type="button" onClick={() => partyleaderfail(index, list.memid)}>NO</button>
                </td>
            </tr>
        ));



        return (
            <div>
                < table id="my-table">
                    <tbody>
                        <tr>
                            <th>번호</th>
                            <th>신청 ID</th>
                            <th>신청 날짜</th>
                            <th>정보</th>
                            <th>파티장 수락</th>
                        </tr>
                        {datalist.length === 0 && (<tr><td colSpan={5}>파티장 승인 신청이 없습니다.</td></tr>)}
                        {datalist.length !== 0 && datalist}
                    </tbody>
                </table >
            </div>
        )
    }

    // const InfoModal = (props) => {
    //     return (
    //         <Modal isOpen={props.isOpen}>
    //             <h2>{props.title}</h2>
    //             {<div>
    //                 <table border="1">
    //                     <tbody>
    //                         <tr>
    //                             <th>사진 정보</th>
    //                         </tr>
    //                         <tr>
    //                             {/* <td><img src={props.content.idimage} alt="사진" /></td> */}
    //                         </tr>
    //                         <tr>
    //                             <th>ID</th>
    //                             <th>이름</th>
    //                             <th>생년월일</th>
    //                             <th>주소</th>
    //                             <th>발급기관</th>
    //                             <th>신청날짜</th>
    //                         </tr>
    //                         <tr>
    //                             <td>{props.content.idname}</td>
    //                             {/* <td>{props.content.memid}</td>
    //                     <td>{props.content.idname}</td>
    //                     <td>{props.content.idbirth}</td>
    //                     <td>{props.content.idaddress}</td>
    //                     <td>{props.content.iddate}</td>
    //                     <td>{props.content.wdate}</td> */}
    //                         </tr>
    //                     </tbody>
    //                 </table>
    //             </div>}
    //             <button onClick={props.closeModal}>Close</button>
    //         </Modal>
    //     );
    // }

    const InfoModal = (props) => {
        const selectedData = modalcontent[selectedIdx] || null;
        return (
            <Modal isOpen={props.isOpen}>
                <h2>{props.title}</h2>
                <p>{selectedData && selectedData}</p>
                <button onClick={props.closeModal}>Close</button>
            </Modal>
        );
    }


    const modalcontent = checklist.map((m, index) => {
        return (
            <div key={index}>
                <table border="1">
                    <tbody>
                        <tr>
                            <th>사진 정보</th>
                        </tr>
                        <tr>
                            <td><img src={m.idimage} alt="사진" /></td>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>이름</th>
                            <th>생년월일</th>
                            <th>주소</th>
                            <th>발급기관</th>
                            <th>신청날짜</th>
                        </tr>
                        <tr>
                            <td>{m.memid}</td>
                            <td>{m.idname}</td>
                            <td>{m.idbirth}</td>
                            <td>{m.idaddress}</td>
                            <td>{m.iddate}</td>
                            <td>{m.wdate}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    });

    // console.log(modalcontent.length);



    return (
        <div>
            <h3>여기는 파티장 승급 페이지!!</h3>

            {check()}

        </div>
    )
}
export default Partyleader;