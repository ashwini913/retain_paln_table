import React, { useEffect, useState } from "react";
import "./App.css";
import { Streamlit, withStreamlitConnection } from "streamlit-component-lib";
import { Input, Checkbox } from "antd";

function App(props) {
  useEffect(() => Streamlit.setFrameHeight());
  const shape = props.args.shape;
  const data = props.args.data;
  const [fullData, setFullData] = useState(data);
  const rowLengthForRefrence = data.Category;
  const checkBoxHeaders = ["EDV", "Current", "New"];
  useEffect(() => {
    let temp_data = fullData;
    checkBoxHeaders.forEach(
      (h) =>
        (temp_data[h] = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ])
    );
    setFullData(temp_data);
  }, []);
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
  const columns = Object.keys(data);
  const current = {
    edv:false,
    P1_A: false,
    P1_B: false,
    P1_C: false,
    P1_D: false,
    P2_A: false,
    P2_B: false,
    P2_C: false,
    P2_D: false
  };
  const new_ = {
    edv:false,
    P1_A: false,
    P1_B: false,
    P1_C: false,
    P1_D: false,
    P2_A: false,
    P2_B: false,
    P2_C: false,
    P2_D: false
  };
  const [currentChecked, setCurrentChecked] = useState(current);
  const [newChecked, setNewChecked] = useState(new_);
  const isEditable = {
    "White Tag": true,
    "Retail Multiple": true,
    "Take Rate": true,
    "Volume/Event (Cases)": true,
    "Event Frequency (Wks)": true,
    "Trade Allowance per case": true,
    Other: true
  };
  const checkBoxBgColor = {
    current: "#E2ECFF",
    new: "#FFEFEF",
    edv: "#C6F6EB"
  };
  const sectionsAvailable = {
    "Effective Retail": true,
    "Event Frequency (Wks)": true,
    Other: true,
    "Invoice Cost @ 100% Take Rate": true
  };
  const onSelectionChange = (e, col, header, index) => {
    let checked = e.target.checked;
    let temp_data = fullData;
    if (header.toLowerCase() === "edv") {
      checked ? (temp_data.EDV[index] = true) : (temp_data.EDV[index] = false);
    }
    if (header.toLowerCase() === "current") {
      let checkedValues = currentChecked;
      if (checked) {
        checkedValues[col]=true;
        temp_data.Current[index] = true;
      } else if (!checked) {
        checkedValues[col]=false;
        temp_data.Current[index] = false;
      }
      setCurrentChecked(checkedValues);
    } else if (header.toLowerCase() === "new") {
      let checkedValues = newChecked;
      if (checked) {
        checkedValues[col]=true;
        temp_data.New[index] = true;
      } else if (!checked) {
        checkedValues[col]=false;
        temp_data.New[index] = false;
      }
      setNewChecked(checkedValues);
    }
    setFullData(temp_data);
    Streamlit.setComponentValue(fullData);
    console.log("e===>", checked);
    console.log("col===>", col);
    console.log("header===>", header);
    console.log("currentChecked==>", currentChecked);
    console.log("newChecked==>", newChecked);
    console.log("fullData==>", fullData);
  };
  const currentOrNewDisable = (header,col) => {
    // let lowerCaseHeader = header.toLowerCase();
    // if (lowerCaseHeader === "edv") {
    //   return false;
    // } else if (lowerCaseHeader === "current") {
    //   return newChecked.length > 0;
    // } else {
    //   return currentChecked.length > 0;
    // }
    if(header==="Current"){
      return newChecked[col]
    }
    else if(header==="New"){
      return currentChecked[col]
    }
  };

  const onInputChange = (e, col, index) => {
    let value = e.target.value;
    let temp_data = fullData;
    console.log("col===>", temp_data[col]);
    temp_data[col][index] = value;
    setFullData(temp_data);
    console.log("e===>", e);
    console.log("col===>", col);
    console.log("index===>", index);
    Streamlit.setComponentValue(fullData);
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
                <th className={v==="Category"?"category_label":""} key={v + i}>
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
                <td
                  style={{
                    width: "60px",
                    fontWeight: "bold",
                    backgroundColor: checkBoxBgColor[header.toLowerCase()]
                  }}
                >
                  {header}
                </td>
                {columns.slice(1).map((col, i) => (
                  <td
                    style={{
                      backgroundColor:
                        col === "Total"
                          ? "#F0F5F8"
                          : checkBoxBgColor[header.toLowerCase()]
                    }}
                    key={col + i}
                  >
                    {col !== "Total" && (
                      <Checkbox
                        disabled={currentOrNewDisable(header,col)}
                        onChange={(e) => onSelectionChange(e, col, header, i)}
                      ></Checkbox>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {rowLengthForRefrence.map((v, i) => (
              <tr
                style={{
                  borderBottom:
                    i === rowLengthForRefrence.length - 1
                      ? "3px solid #9DB3FF"
                      : sectionsAvailable[v]
                      ? "4px solid #9DB3FF"
                      : ""
                }}
                key={v + i}
              >
                {columns.map((col, j) => (
                  <td
                    className={
                      col === "Total"
                        ? "total_label"
                        : col == "Category"
                        ? "category_label"
                        : i === rowLengthForRefrence.length - 1
                        ? "last_row"
                        : ""
                    }
                    style={{
                      backgroundColor:
                        col === "Total"
                          ? "#F0F5F8"
                          : i === rowLengthForRefrence.length - 1
                          ? "#C2D5FE"
                          : "white"
                    }}
                    key={col + i}
                  >
                    {(!isEditable[v] || j === 0) && fullData[col][i]}
                    {isEditable[v] && j !== 0 && col !== "Total" && (
                      <Input
                        className="input-field"
                        defaultValue={data[col][i]}
                        onChange={(e) => onInputChange(e, col, i)}
                      ></Input>
                    )}
                  </td>
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
