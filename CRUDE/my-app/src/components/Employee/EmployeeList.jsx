import React from "react";
import EmployeeItem from "./EmployeeItem";

const EmployeeList = ({ employees, onView, onEdit, onDelete }) => {
  return (
    <table className="table table-hover ">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Position</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <EmployeeItem
            key={emp.id}
            emp={emp}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
