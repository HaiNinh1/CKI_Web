import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditModal = ({ show, setShow, employee, onEdit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Populate form when employee changes
  useEffect(() => {
    if (employee) {
      setName(employee.name || "");
      setEmail(employee.email || "");
      setPhone(employee.phone || "");
      setAddress(employee.address || "");
    }
  }, [employee]);

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) return;

    onEdit({
      id: employee.id,
      name,
      email,
      phone,
      address,
    });

    handleClose();
  };

  const headerStyle = {
    backgroundColor: "#ffc107",
    color: "white",
    padding: "10px 15px",
    borderBottom: "none",
  };
  const titleStyle = {
    color: "black",
    fontWeight: "500",
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      backdrop="static"
      className="modal-edit-user"
    >
      <Modal.Header closeButton style={headerStyle}>
        <Modal.Title style={titleStyle}>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="col-12 d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="warning" type="submit">
              Update
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
