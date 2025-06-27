import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import EmployeeList from "./components/Employee/EmployeeList.jsx";
import AddModal from "./components/Employee/AddModal.jsx";
import EditModal from "./components/Employee/EditModal.jsx";
import DeleteModal from "./components/Employee/DeleteModal.jsx";
import ViewModal from "./components/Employee/ViewModal.jsx";
import { initialEmployeesData } from "./data";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    setEmployees(initialEmployeesData);
  }, []);

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
  };

  // Xóa employee đã chọn
  const handleDeleteSelected = () => {
    if (selectedEmployees.length === 0) return;
    const updatedEmployees = employees.filter(
      (emp) => !selectedEmployees.includes(emp.id)
    );
    setEmployees(updatedEmployees);
    setSelectedEmployees([]);
  };

  // Xóa một employee
  const handleDeleteEmployee = (id) => {
    const updated = employees.filter((e) => e.id !== id);
    setEmployees(updated);
  };

  // Sửa employee
  const handleEditEmployee = (updatedEmp) => {
    const updated = employees.map((e) =>
      e.id === updatedEmp.id ? updatedEmp : e
    );
    setEmployees(updated);
  };

  // Toggle employee selection
  const handleSelectEmployee = (id) => {
    setSelectedEmployees((prev) => {
      if (prev.includes(id)) {
        return prev.filter((empId) => empId !== id);
      } else {
        return [...prev, id];
      }
    });
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
      <div className="app-body container mt-5">
        <div className="header d-flex justify-content-between align-items-center bg-dark text-white p-3">
          <h3 className="mb-0">Manage Employees</h3>
          <div>
            <button
              className="btn btn-danger me-2"
              onClick={handleDeleteSelected}
              disabled={selectedEmployees.length === 0}
            >
              <i className="bi bi-dash-circle me-1"></i> Delete
            </button>
            <button
              className="btn btn-success"
              onClick={() => setShowModalAdd(true)}
            >
              <i className="bi bi-plus-circle me-1"></i> Add New Employee
            </button>
          </div>
        </div>
        <EmployeeList
          employees={employees}
          selectedEmployees={selectedEmployees}
          onSelectEmployee={handleSelectEmployee}
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

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <span>Showing 5 out of {employees.length} entries</span>
          </div>
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo; Previous</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">Next &raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default App;
