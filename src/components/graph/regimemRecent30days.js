import React, { useEffect, useState } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function RegimemRecent30days() {
  const [list, setList] = useState([]);

  function cntByDays() {
    axios
      .get("http://localhost:3000/cntRegiMemDays")
      .then(function (resp) {
        console.log(resp.data);
        setList(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }
  //const data = JSON.stringify(list);

  useEffect(() => {
    cntByDays();
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", fontSize: "13px" }}>
      <AreaChart
        width={600}
        height={300}
        data={list}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="wdate" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#A4A4A4" fill="#A4A4A4" />
      </AreaChart>
      <p>최근 30일간 일별 가입자 수</p>
    </div>
  );
}

export default RegimemRecent30days;
