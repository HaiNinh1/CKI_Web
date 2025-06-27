import React from "react";
import EmployeeItem from "./EmployeeItem";

const EmployeeList = ({
  employees,
  selectedEmployees,
  onSelectEmployee,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  const allIds = employees.map((emp) => emp.id);
                  onSelectEmployee(allIds);
                } else {
                  onSelectEmployee([]);
                }
              }}
              checked={selectedEmployees?.length === employees.length}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <EmployeeItem
            key={emp.id}
            emp={emp}
            isSelected={selectedEmployees?.includes(emp.id)}
            onSelect={() => onSelectEmployee(emp.id)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
