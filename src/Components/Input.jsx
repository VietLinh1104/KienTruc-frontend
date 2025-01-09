import React, { useState } from "react";
import Select from "./Select";

function Input({ id, type, className, name, selectData = ["none"], resultValue, placeholder,setValue = '',nullable = true}) {
  const [textValue, setTextValue] = useState(setValue);

  const handleChange = (event) => {
    const value = event.target.value;
    setTextValue(value); // Cập nhật state
    if (typeof resultValue === "function") {
      resultValue({ [id]: value }); // Gửi giá trị lên cha
    }
  };

  const handleSelectChange = (value) => {
    if (typeof resultValue === "function") {
      resultValue({ [id]: value }); // Gửi giá trị từ Select lên cha
    }
  };

  return (
    <div className="flex flex-col col-span-2 space-y-2">
      <label htmlFor={id} className="font-medium">
        {name}
      </label>
      {type === "select" ? (
        <Select
          placeHolder={setValue || name }
          options={selectData}
          lClassName={`col-span-2 !w-full ${className}`}
          sendValue={handleSelectChange}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          className={`col-span-2 ${className}`}
          placeholder={placeholder || name}
          value={textValue}
          onChange={handleChange}
          required={nullable === false ? true : undefined}
        />
      )}
    </div>
  );
}

export default Input;
