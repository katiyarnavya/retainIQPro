import React, { useState } from "react";
import TableRow from "./TableRow"; // Importing the TableRow component

const Table = () => {
  const [rows, setRows] = useState([0]);

  const handleAddRow = () => {
    setRows([...rows, rows.length]); // Adds a new row by extending the rows array
  };

  const handleRemoveRow = (indexToRemove) => {
    setRows(rows.filter((_, index) => index !== indexToRemove)); // Removes the row at the specified index
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Product Collection</th>
          <th>Variants</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <TableRow key={index} index={index} handleRemoveRow={handleRemoveRow} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="4" style={{ textAlign: "center" }}>
            <button className="add-row-button" onClick={handleAddRow}>
              Add Row
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
