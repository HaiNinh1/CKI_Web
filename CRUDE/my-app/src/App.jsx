import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import EmployeeList from "./components/Employee/EmployeeList.jsx";
import AddModal from "./components/Employee/AddModal.jsx";
import EditModal from "./components/Employee/EditModal.jsx";
import DeleteModal from "./components/Employee/DeleteModal.jsx";
import ViewModal from "./components/Employee/ViewModal.jsx";
import { initialEmployeesData } from "./data";

function App() {
  // Lấy danh sách employee từ localStorage hoặc data.js
  const getInitialEmployees = () => {
    const stored = localStorage.getItem("employees");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("employees", JSON.stringify(initialEmployeesData));
    return initialEmployeesData;
  };

  const [employees, setEmployees] = useState(getInitialEmployees());

  // Modal states
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Thêm employee
  const handleAddEmployee = (employee) => {
    const newId =
      employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
    const newEmployee = { ...employee, id: newId };
    const updated = [...employees, newEmployee];
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
  };

  // Xóa employee
  const handleDeleteEmployee = (id) => {
    const updated = employees.filter((e) => e.id !== id);
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
  };

  // Sửa employee
  const handleEditEmployee = (updatedEmp) => {
    const updated = employees.map((e) =>
      e.id === updatedEmp.id ? updatedEmp : e
    );
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
  };

  // Open View modal
  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowModalView(true);
  };

  // Open Edit modal
  const handleOpenEditModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModalEdit(true);
  };

  // Open Delete modal
  const handleOpenDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModalDelete(true);
  };

  return (
    <>
      <Navbar />
      <div className="app-body container">
        <div className="header d-flex justify-content-between">
          <h2 className="">Employee Management</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowModalAdd(true)}
          >
            + Add
          </button>
        </div>
        <EmployeeList
          employees={employees}
          onView={handleViewEmployee}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />

        {/* All Modals */}
        <AddModal
          show={showModalAdd}
          setShow={setShowModalAdd}
          onAdd={handleAddEmployee}
        />

        <EditModal
          show={showModalEdit}
          setShow={setShowModalEdit}
          employee={selectedEmployee}
          onEdit={handleEditEmployee}
        />

        <DeleteModal
          show={showModalDelete}
          setShow={setShowModalDelete}
          employee={selectedEmployee}
          onDelete={handleDeleteEmployee}
        />

        <ViewModal
          show={showModalView}
          setShow={setShowModalView}
          employee={selectedEmployee}
        />
      </div>
    </>
  );
}

export default App;
