import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import EmployeeList from "./components/Employee/EmployeeList.jsx";
import AddModal from "./components/Employee/AddModal.jsx";
import EditModal from "./components/Employee/EditModal.jsx";
import DeleteModal from "./components/Employee/DeleteModal.jsx";
import ViewModal from "./components/Employee/ViewModal.jsx";
import { initialEmployeesData } from "./data";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    setEmployees(initialEmployeesData);
  }, []);

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    let timer;
    if (notification.show) {
      timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [notification.show]);

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Thêm employee
  const handleAddEmployee = (employee) => {
    const updated = [...employees, employee];
    setEmployees(updated);
    setNotification({
      show: true,
      message: "Employee added successfully!",
      type: "success",
    });
  };

  // Xóa một employee
  const handleDeleteEmployee = (id) => {
    const updated = employees.filter((e) => e.id !== id);
    setEmployees(updated);
    setNotification({
      show: true,
      message: "Employee deleted successfully!",
      type: "success",
    });
  };

  // Sửa employee
  const handleEditEmployee = (updatedEmp) => {
    const updated = employees.map((e) =>
      e.id === updatedEmp.id ? updatedEmp : e
    );
    setEmployees(updated);
    setNotification({
      show: true,
      message: "Employee updated successfully!",
      type: "success",
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
              className="btn btn-success"
              onClick={() => setShowModalAdd(true)}
            >
              <i className="bi bi-plus-circle me-1"></i> Add New Employee
            </button>
          </div>
        </div>
        <EmployeeList
          employees={employees}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
          notification={notification}
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
