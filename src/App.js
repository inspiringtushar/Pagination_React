import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
export default function App() {
  const [data, setData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(5);
  const firstIndex = dataPerPage * (currPage - 1);
  const lastIndex = dataPerPage * currPage;
  const slicedData = data.slice(firstIndex, lastIndex);
  const pagBtn = () => {
    const totalBtn = Math.ceil(data.length / dataPerPage);
    const dataArr = [];
    for (let i = 1; i <= totalBtn; i++) {
      dataArr.push(i);
    }
    return dataArr.map((val, i) => {
      return (
        <button
          disabled={val === currPage}
          style={{ backgroundColor: val === currPage ? "green" : "" }}
          key={i}
          onClick={() => setCurrPage(val)}
        >
          {val}
        </button>
      );
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios("https://dummyjson.com/products");
      setData(res.data.products);
    };
    fetchData();
  }, []);
  const handleSelect = (e) => {
    setDataPerPage(e.target.value);
    setCurrPage(1);
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <ul style={{ border: "1px dotted black" }}>
        {!!slicedData.length &&
          slicedData.map((val, i) => {
            return (
              <li key={i} style={{ textDecoration: "none" }}>
                {val.title}
              </li>
            );
          })}
      </ul>
      <div>
        <button
          disabled={firstIndex === 0}
          onClick={() => setCurrPage(currPage - 1)}
        >
          Prev
        </button>
        {pagBtn()}
        <button
          disabled={lastIndex >= data.length}
          onClick={() => setCurrPage(currPage + 1)}
        >
          Next
        </button>
      </div>

      <span>No. of Data per Page</span>
      <select
        onChange={(event) => handleSelect(event)}
        defaultValue={dataPerPage}
      >
        <option value="5">5</option>
        <option value="8">8</option>
        <option value="10">10</option>
      </select>
    </div>
  );
}
