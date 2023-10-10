import React from "react";
import { Select } from "antd";
import { Streamlit } from "streamlit-component-lib";
import "../css/DropDown.css";

const DropDown = ({
  promoMultiple,
  fullData,
  defaultVal,
  setFullData,
  index,
  col
}) => {
  const options=promoMultiple.map(p=>{
    let obj={}
    obj.value=p
    obj.label=p
    return obj
  })
  const onSelectionChange = (e) => {
    console.log("e",e)
    let temp_data=fullData
    temp_data[index][col]=e
    setFullData(temp_data)
    Streamlit.setComponentValue(fullData);
  };
  return (
    <div style={{display:"flex",justifyContent:"center"}}>
      <Select style={{width:"200px",display:"flex",justifyContent:"center"}}
        defaultValue={defaultVal===""?"-":defaultVal}
        options={options}
        onChange={(e) => onSelectionChange(e)}
        popupMatchSelectWidth={false}
      ></Select>
    </div>
  );
};

export default DropDown;
