import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ViewModal = ({ show, setShow, employee }) => {
  const handleClose = () => {
    setShow(false);
  };

  const headerStyle = {
    backgroundColor: "#0dcaf0",
    color: "white",
    padding: "10px 15px",
    borderBottom: "none",
  };
  const titleStyle = {
    color: "black",
    fontWeight: "500",
  };

  if (!employee) return null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      backdrop="static"
      className="modal-view-user"
    >
      <Modal.Header closeButton style={headerStyle}>
        <Modal.Title style={titleStyle}>Employee Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="employee-details">
          <div className="mb-3">
            <label className="fw-bold">ID:</label>
            <p>{employee.id}</p>
          </div>
          <div className="mb-3">
            <label className="fw-bold">Name:</label>
            <p>{employee.name}</p>
          </div>
          <div className="mb-3">
            <label className="fw-bold">Email:</label>
            <p>{employee.email}</p>
          </div>
          <div className="mb-3">
            <label className="fw-bold">Phone:</label>
            <p>{employee.phone}</p>
          </div>
          <div className="mb-3">
            <label className="fw-bold">Position:</label>
            <p>{employee.position}</p>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewModal;
