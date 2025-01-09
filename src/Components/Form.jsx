import React from "react";

function Form({ className, children }) {
  return (
    <form
      className={`bg-white w-full p-6 rounded-xl grid grid-cols-4 gap-4 ${className}`}
    >
      {children}
    </form>
  );
}

export default Form;