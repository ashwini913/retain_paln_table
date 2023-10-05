import React, { useEffect, useState } from "react";
import "./App.css";
import { Streamlit, withStreamlitConnection } from "streamlit-component-lib";
import { Input, Checkbox, Tooltip } from "antd";
import DropDown from "./components/DropDown";
import retail_plan from "./images/retail_plan.png";

function App(props) {
  useEffect(() => Streamlit.setFrameHeight());
  const shape = props.args.shape;
  const invoice_prices = props.args.invoice_prices;
  const sortedRows = ["New", "Current", "EDV"];
  const data = props.args.data.sort(
    (a, b) => sortedRows.indexOf(b.Category) - sortedRows.indexOf(a.Category)
  );
  const promo_multiple = props.args.price_multiple;
  const allowancesDropSDownValues = ["All", "Promo"];
  const [fullData, setFullData] = useState(data);
  
  const legendMapping = [
    "edv",
    "P1_A",
    "P1_B",
    "P1_C",
    "P1_D",
    "P2_A",
    "P2_B",
    "P2_C",
    "P2_D"
  ];
  const InitialSelection = [
    "P1_A",
    "P1_B",
    "P1_C",
    "P1_D",
    "P2_A",
    "P2_B",
    "P2_C",
    "P2_D",
    "Holiday"
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
  // const columns = Object.keys(data);
  const columns = [
    "Category",
    "P1_A",
    "P1_B",
    "P1_C",
    "P1_D",
    "P2_A",
    "P2_B",
    "P2_C",
    "P2_D",
    "Holiday",
    "Total"
  ];
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
  const onSelectionChange = (e, category, col, index) => {
    let checked = e.target.checked;
    let temp_data = fullData;
    let invoiceIndex = temp_data.findIndex((v) => v.Category === "Invoice");
    if (checked) {
      temp_data[index][col] = "true";
      if (category.toLowerCase() === "current") {
        temp_data[invoiceIndex][col] = invoice_prices[0];
      } else if (category.toLowerCase() === "new") {
        temp_data[invoiceIndex][col] = invoice_prices[1];
      }

      setFullData(temp_data);
      Streamlit.setComponentValue(fullData);
    } else if (!checked) {
      temp_data[index][col] = "false";
      temp_data[invoiceIndex][col] = invoice_prices[1];
      setFullData(temp_data);
      Streamlit.setComponentValue(fullData);
    }
    console.log("category==>", category);
    console.log("col==>", col);
  };
  const currentOrNewDisable = (category, col) => {
    if (category === "Current") {
      let new_ = fullData.find((row) => row.Category === "New");
      return new_[col] === "true" ? true : false;
    } else if (category === "New") {
      let new_ = fullData.find((row) => row.Category === "Current");
      return new_[col] === "true" ? true : false;
    } else if (category === "EDV") {
      let edv_ = fullData.find((row) => row.Category === "EDV");
      let isTrue = InitialSelection.find((v) => edv_[v] === "true");
      if (isTrue) {
        let res = edv_[col] === "true" ? false : true;
        return res;
      }
      return false;
    }
    console.log("apply disable feature");

    return false;
  };

  const displayText = [
    "EDV",
    "Current",
    "New",
    "Multiple",
    "Allowances (All/Promo)"
  ];
  const onInputChange = (e, index, col) => {
    if (e.key === "Enter") {
      let value = e.target.value;
      let temp_data = fullData;
      temp_data[index][col] = value;
      Streamlit.setComponentValue(fullData);
    }
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
          fontWeight: "bold",
          LineHeight: "18.48p",
          display: "flex",
          alignItems: "center"
        }}
      >
        <img
          src={retail_plan}
          style={{ marginRight: "10px" }}
          alt="retail_plan"
        />
        <span>Retail Plan</span>
        <div className="legend_container">
          <div className="legend shallow"></div>
          <span>Shallow</span>
          <div className="legend deep"></div>
          <span>Deep</span>
        </div>
      </div>
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
                <th
                  className={v === "Category" ? "category_label" : ""}
                  key={v + i}
                >
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
            {fullData.map((row, i) => (
              <tr
                style={{
                  backgroundColor:
                    i === fullData.length - 1 ? "#C2D5FE" : "white",
                  borderBottom:
                    i === fullData.length - 1
                      ? "3px solid #9DB3FF"
                      : sectionsAvailable[row.Category]
                      ? "4px solid #9DB3FF"
                      : ""
                }}
                key={row.Category + i}
              >
                {columns.map((col, j) => (
                  <td
                    style={{
                      fontWeight:
                        sortedRows[row.Category] !== -1 && col === "Category"
                          ? "bold"
                          : "400",
                      backgroundColor:
                        col === "Total"
                          ? "#F0F5F8"
                          : isEditable[row.Category] && col !== "Category"
                          ? "#F4F4F4"
                          : sortedRows[row.Category] !== -1
                          ? checkBoxBgColor[row.Category.toLowerCase()]
                          : ""
                    }}
                    key={col + i + j}
                  >
                    {sortedRows.indexOf(row.Category) !== -1 &&
                      col !== "Total" &&
                      col !== "Category" && (
                        <Checkbox
                          checked={row[col] === "false" ? false : true}
                          disabled={currentOrNewDisable(row.Category, col)}
                          onChange={(e) =>
                            onSelectionChange(e, row.Category, col, i)
                          }
                        ></Checkbox>
                      )}
                    {(row.Category === "Multiple" ||
                      row.Category === "Allowances (All/Promo)") &&
                      col !== "Total" &&
                      col !== "Category" && (
                        <DropDown
                          promoMultiple={
                            row.Category === "Multiple"
                              ? promo_multiple
                              : allowancesDropSDownValues
                          }
                          fullData={fullData}
                          defaultVal={row[col]}
                          setFullData={setFullData}
                          index={i}
                          col={col}
                        ></DropDown>
                      )}
                    {(displayText.indexOf(row.Category) === -1 ||
                      col === "Total" ||
                      col === "Category") &&
                      (!isEditable[row.Category] || col === "Total") &&
                      row[col]}
                    {isEditable[row.Category] && col === "Category" && row[col]}
                    {isEditable[row.Category] &&
                      col !== "Total" &&
                      col !== "Category" && (
                        <Tooltip
                          title={
                            <div>
                              Press enter to apply changes <br></br>
                              <span
                                style={{ fontSize: "12px", color: "#E81C0E",fontWeight:"600" }}
                              >
                                {row.Category === "Take Rate"
                                  ? "Take rate should be in decimals"
                                  : ""}
                              </span>
                            </div>
                          }
                        >
                          <Input
                            className="input-field"
                            defaultValue={row[col]}
                            onKeyDown={(e) => onInputChange(e, i, col)}
                          ></Input>
                        </Tooltip>
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
