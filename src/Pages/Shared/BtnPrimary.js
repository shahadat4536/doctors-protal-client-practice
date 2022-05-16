import React from "react";

const BtnPrimary = ({ children }) => {
  return (
    <button class="btn btn-primary  bg-gradient-to-r from-secondary to-primary text-white uppercase">
      {children}
    </button>
  );
};

export default BtnPrimary;
