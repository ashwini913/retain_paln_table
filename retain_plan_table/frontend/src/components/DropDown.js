import React from "react";
import { Select } from "antd";
import { Streamlit } from "streamlit-component-lib";
import "../css/DropDown.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const DropDown = ({
  scenarioList,
  activeScenario,
  packageName,
  disabledBasedOnVersion,
  setActiveScenario
}) => {
  const options = scenarioList.map((sce) => {
    let obj = {};
    obj.label = sce;
    obj.value = sce;
    return obj;
  });
  const disable=disabledBasedOnVersion==="false"?true:false
  const onSelectionChange = (e) => {
    let active_scenario = activeScenario;
    active_scenario[packageName] = e;
    setActiveScenario(active_scenario);
    let event_json = {
      eventName: "Change",
      packageName: packageName,
      activeScenario: active_scenario
    };
    Streamlit.setComponentValue(event_json);
  };
  return (
    <div>
      <Select
        suffixIcon={<ArrowDropDownIcon />}
        defaultValue={activeScenario[packageName]}
        disabled={disable}
        options={options}
        onChange={(e) => onSelectionChange(e)}
      ></Select>
    </div>
  );
};

export default DropDown;
