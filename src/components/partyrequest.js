import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Partyrequest() {

    let history = useNavigate();

    const [resp, setResp] = useState([]);
    const [idname, setIdname] = useState();
    const [idbirth, setIdbirth] = useState();
    const [idaddress, setIdaddress] = useState();
    const [iddate, setIddate] = useState();
    const [publicinstitution, setPublicinstitution] = useState();
    const [imgFile, setImgFile] = useState('logo192.png');
    const imgRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [memid, setMemid] = useState("aaa");

    function imageLoad() {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        }
    }

    function nameTrim(msg) {
        return msg.trim();
    }

    function dateSplit(msg) {
        if (msg.length !== 7) {
            let msgSplit = msg.split(".").join("-");
            return msgSplit.slice(0, 5) + '0' + msgSplit.slice(5);
        }

        return msg.split(".").join("-");
    }

    function onSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        let formdata = new FormData();
        formdata.append("uploadFile", document.frm.uploadFile.files[0]);

        axios.post("http://118.67.132.98:3000/partyrequest", formdata)
            .then(function (resp) {
                // console.log(JSON.stringify(resp.data));
                // console.log('file upload에 성공했습니다');

                console.log(resp.data.images[0]);
                console.log(resp.data.images[0].title.name);
                console.log(resp.data.images[0].title.inferText);
                console.log(resp.data.images[0].fields);
                console.log(resp.data.images[0].fields[0].name);
                console.log(resp.data.images[0].fields[0].inferText);

                setResp(resp.data);
                // setIdname(resp.data.images[0].title.name + " : " + resp.data.images[0].title.inferText);
                // setIdbirth(resp.data.images[0].fields[0].name + " : " + resp.data.images[0].fields[0].inferText);
                // setIdaddress(resp.data.images[0].fields[1].name + " : " + resp.data.images[0].fields[1].inferText);
                // setIddate(resp.data.images[0].fields[2].name + " : " + resp.data.images[0].fields[2].inferText);
                // setPublicinstitution(resp.data.images[0].fields[3].name + " : " + resp.data.images[0].fields[3].inferText);

                setIdname(nameTrim(resp.data.images[0].title.inferText));
                setIdbirth(resp.data.images[0].fields[0].inferText);
                setIdaddress(resp.data.images[0].fields[1].inferText);
                setIddate(dateSplit(resp.data.images[0].fields[2].inferText));
                setPublicinstitution(resp.data.images[0].fields[3].inferText);

                console.log(resp);
                setIsLoading(false);
            })
            .catch(function (err) {
                alert(err);
                setIsLoading(false);
            })
    }

    function ocrInform(event) {
        event.preventDefault();

        // alert("확인용");

        const cardData = new FormData();
        cardData.append("memid", memid);
        cardData.append("idname", idname);
        cardData.append("idbirth", idbirth);
        cardData.append("idaddress", idaddress);
        cardData.append("iddate", iddate);
        cardData.append("idpublic", publicinstitution);
        cardData.append("idimage", imgFile);

        console.log(cardData);

        axios.post("http://118.67.132.98:3000/partyleader", cardData)
            .then(function (res) {
                // alert(res.data);
                if (res.data === "YES") {
                    alert("파티장 승급 신청이 되었습니다.")
                    // 나중에 위치는 바꿔줘야 합니다. 
                    history("/partyleader");
                }
            })
            .catch(function (err) {
                alert(err);
            })

    }

    function sendInform() {

        console.log(iddate);
        console.log(idname);

        return ( // 배열이 비어있을 때 실행 
            // resp.length === 0 ? (
            //     <div>
            //         <p>Loading...</p>
            //     </div>
            // ) : ( // 값이 넘어오면 실행 
            //     <div>
            //         <form name="ocrInform" onSubmit={ocrInform}>
            //             <ul>
            //                 <li>
            //                     {resp.images[0].title.name} : <input value={idname}/>
            //                 </li>
            //                 <li>
            //                     {resp.images[0].fields[0].name} : <input value={idbirth} />
            //                 </li>
            //                 <li>
            //                     {resp.images[0].fields[1].name} :  <input value={idaddress} />
            //                 </li>
            //                 <li>
            //                     {resp.images[0].fields[2].name} : <input type="date" value={iddate} />
            //                 </li>
            //                 <li>
            //                     {resp.images[0].fields[3].name} : <input value={publicinstitution} />
            //                 </li>
            //                 <li><button type="submit">파티장 승급 신청</button></li>
            //             </ul>

            //         </form>
            //     </div>
            <div>
                {isLoading && <p>Loading...</p>}
                {!isLoading && resp.length === 0 && <p>불러온 정보가 없습니다.</p>}
                {!isLoading && resp.length !== 0 && (
                    <div>
                        <form name="ocrInform" onSubmit={ocrInform} encType="multipart/form-data">
                            <ul>
                                <input type="hidden" name="memid" value={memid} />
                                <input type="hidden" name="idimage" ref={imgRef} />
                                <li>
                                    {resp.images[0].title.name} : <input value={idname} name="idname" />
                                </li>
                                <li>
                                    {resp.images[0].fields[0].name} : <input value={idbirth} name="idbirth" />
                                </li>
                                <li>
                                    {resp.images[0].fields[1].name} :  <input value={idaddress} name="idaddress" />
                                </li>
                                <li>
                                    {resp.images[0].fields[2].name} : <input type="date" value={iddate} name="iddate" />
                                </li>
                                <li>
                                    {resp.images[0].fields[3].name} : <input value={publicinstitution} name="idpublic" />
                                </li>
                                <li><button type="submit">파티장 승급 신청</button></li>
                            </ul>
                        </form>
                    </div>
                )}
            </div>
        )

        // )
    }


    return (
        <div>
            <h3>파티장 승인 절차</h3>
            <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
                {/* <input type="file" name="uploadFile" onChange={imageLoad} ref={imgRef} /><br /> */}
                <Form.Control type="file" name="uploadFile" onChange={imageLoad} ref={imgRef} style={{ width: "40%", margin: "0 auto" }} />
                <img src={imgFile} alt="사진" style={{ width: "400px", margin: "20px 0 10px", border: "1px solid black", borderRadius: "10px" }} />
                <hr />
                <Button variant="primary" type="submit">전송</Button>
                {/* <input type="submit" value="전송" /> */}
            </form>

            {/* <p>{idname}</p>
            <p>{idbirth}</p>
            <p>{idaddress}</p>
            <p>{iddate}</p>
            <p>{publicinstitution}</p> */}


            {/* <div>불러온 정보가 없습니다.</div> */}

            {sendInform()}
        </div>
    )
}
export default Partyrequest;