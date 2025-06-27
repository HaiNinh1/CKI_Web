import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteModal = ({ show, setShow, employee, onDelete }) => {
  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = () => {
    onDelete(employee.id);
    handleClose();
  };

  const headerStyle = {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "10px 15px",
    borderBottom: "none",
  };
  const titleStyle = {
    color: "white",
    fontWeight: "500",
  };

  if (!employee) return null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      backdrop="static"
      className="modal-delete-user"
    >
      <Modal.Header closeButton style={headerStyle}>
        <Modal.Title style={titleStyle}>Delete Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete employee:{" "}
          <strong>{employee.name}</strong>?
        </p>
        <p>This action cannot be undone.</p>
        <div className="d-flex justify-content-end mt-4">
          <Button variant="secondary" onClick={handleClose} className="me-2">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
