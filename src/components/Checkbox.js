import React, { useState } from "react";
import { Checkbox } from "antd";
import "./table.css";
const initialState = {
  isChecked: false,
  placeholder: "",
};

const CheckboxComp = ({ data, prop, filter, setFilter }) => {
  let [values, setValues] = useState(initialState);

  const toggleCheck = (e) => {
    setValues({
      ...values,
      isChecked: !values.isChecked,
      placeholder: data[prop],
    });
    if (!values.isChecked) {
      setFilter(data[prop]);
    } else {
      setFilter("");
    }
  };

  return (
    <div className="checkbox">
      <React.Fragment>
        <Checkbox
          onChange={toggleCheck}
          type="checkbox"
          checked={values.isChecked}
        />
        <span>{data[prop]}</span>
        {console.log(values.placeholder)}
      </React.Fragment>
    </div>
  );
};

export default CheckboxComp;
