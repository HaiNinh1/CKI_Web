import React from "react";
import EmployeeItem from "./EmployeeItem";

const EmployeeList = ({ employees, onEdit, onDelete, notification }) => {
  return (
    <>
      {notification && notification.show && (
        <div className={`alert alert-${notification.type} mb-3`} role="alert">
          {notification.message}
        </div>
      )}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
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
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeList;
