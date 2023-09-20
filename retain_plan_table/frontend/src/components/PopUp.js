import React, { useState } from "react";
import { Input, Modal, Button } from "antd";
import { Streamlit } from "streamlit-component-lib";
import "../css/PopUp.css";

const PopUp = ({ popUpOpen, setPopUpOpen, createEventJson }) => {
  const [scenarioName, setScenarioName] = useState("");
  const onScenarioNameChange = (event) => {
    let term = event.target.value;
    setScenarioName(term);
  };
  const saveScenario = () => {
    let payload = createEventJson;
    payload.scenarioName = scenarioName;
    Streamlit.setComponentValue(payload);
    setPopUpOpen(false);
    setScenarioName("");
  };
  const onCancelSave = () => {
    setPopUpOpen(false);
    setScenarioName("");
  };
  return (
    <Modal
      className="save-modal"
      title="Save Scenario"
      centered
      open={popUpOpen}
      onOk={(e) => saveScenario(e)}
      onCancel={onCancelSave}
      width={"60%"}
      height={200}
    >
      <p>Please Enter the Scenario Name:</p>
      <Input
        value={scenarioName}
        onChange={(e) => onScenarioNameChange(e)}
      ></Input>
    </Modal>
  );
};

export default PopUp;
