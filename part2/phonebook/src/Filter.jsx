import React from "react";

const Filter = ({ handleFilter }) => {
  return (
    <form>
      <label>filter shown with</label>
      <input type="text" onChange={handleFilter} />
    </form>
  );
};

export default Filter;
