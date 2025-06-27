import React from "react";

const EmployeeItem = ({ emp, onView, onEdit, onDelete }) => {
  return (
    <tr>
      <th scope="row">{emp.id}</th>
      <td>{emp.name}</td>
      <td>{emp.email}</td>
      <td>{emp.phone}</td>
      <td>{emp.position}</td>
      <td className="d-flex gap-1">
        <button className="btn btn-info btn-sm" onClick={() => onView(emp)}>
          View
        </button>
        <button className="btn btn-warning btn-sm" onClick={() => onEdit(emp)}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(emp)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmployeeItem;
