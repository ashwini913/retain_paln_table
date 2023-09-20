import React, { useEffect } from "react";
import "./App.css";
import { Streamlit, withStreamlitConnection } from "streamlit-component-lib";
import { Checkbox } from "antd";

function App(props) {
  useEffect(() => Streamlit.setFrameHeight());
  const shape = props.args.shape;
  const data = props.args.data;
  const rowLengthForRefrence = data.Category;
  const legendMapping = [
    "P1_A",
    "P1_B",
    "P1_C",
    "P1_D",
    "P2_A",
    "P2_B",
    "P2_C",
    "P2_D"
  ];
  const backgroundColorsForLegends = {
    P1_A: "#27AF8D",
    P1_B: "#27AF8D",
    P1_C: "#27AF8D",
    P1_D: "#27AF8D",
    P2_A: "#494949",
    P2_B: "#494949",
    P2_C: "#494949",
    P2_D: "#494949"
  };
  const checkBoxHeaders = ["EDV", "Current", "New"];
  const columns = Object.keys(data);
// const current = {
//     P1_A: false,
//     P1_B: false,
//     P1_C: false,
//     P1_D: false,
//     P2_A: false,
//     P2_B: false,
//     P2_C: false,
//     P2_D: false
//   }
// const new_ = {
//     P1_A: false,
//     P1_B: false,
//     P1_C: false,
//     P1_D: false,
//     P2_A: false,
//     P2_B: false,
//     P2_C: false,
//     P2_D: false
//   };
  const onSelectionChange = (e,col,header) => {
    console.log("e===>", e.target.checked);
    console.log("col===>",col);
    console.log("header===>",header);
  };
  return (
    <div
      style={{
        borderRadius: "4px",
        backgroundColor: "white",
        padding: "20px"
      }}
    >
      <div
        style={{
          borderBottom: "2px solid #dcdada",
          marginBottom: "20px",
          fontSize: "14px",
          paddingBottom: "10px",
          fontWeight: "bold"
        }}
      ></div>
      <div
        style={{
          width: shape["width"],
          height: shape["height"],
          overflow: "auto"
        }}
      >
        <table style={{ width: "100%", height: "100%" }}>
          <thead>
            <tr>
              {columns.map((v, i) => (
                <th key={v + i}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      justifyCotent: "center",
                      alignItems: "center"
                    }}
                  >
                    {legendMapping.includes(v.toUpperCase()) && (
                      <div
                        style={{
                          width: "28px",
                          height: "4px",
                          borderRadius: "2px",
                          backgroundColor:
                            backgroundColorsForLegends[v.toUpperCase()]
                        }}
                      ></div>
                    )}
                    <div>{v}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {checkBoxHeaders.map((header) => (
              <tr key={header}>
                <td>{header}</td>
                {columns.slice(1).map((col, i) => (
                  <td key={col + i}>
                    <Checkbox onChange={(e) => onSelectionChange(e,col,header)}></Checkbox>
                  </td>
                ))}
              </tr>
            ))}
            {rowLengthForRefrence.map((v, i) => (
              <tr key={v+i}>
                {columns.map((col, j) => (
                  <td key={col + i}>{data[col][i]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default withStreamlitConnection(App);
