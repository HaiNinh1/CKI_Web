import React from "react";

const EmployeeItem = ({ emp, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{emp.name}</td>
      <td>{emp.email}</td>
      <td>{emp.address}</td>
      <td>{emp.phone}</td>
      <td>
        <button
          className="btn text-warning bg-transparent border-0 me-2"
          onClick={() => onEdit(emp)}
          title="Edit"
        >
          <i className="bi bi-pencil-fill"></i>
        </button>
        <button
          className="btn text-danger bg-transparent border-0"
          onClick={() => onDelete(emp)}
          title="Delete"
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </td>
    </tr>
  );
};

export default EmployeeItem;
