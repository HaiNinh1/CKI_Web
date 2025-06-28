import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AddModal = (props) => {
  const { show, setShow, onAdd } = props;

  const handleClose = () => {
    setShow(false);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Validation states
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Validation functions
  const validateName = (value) => {
    if (!value.trim()) return "Name is required";
    if (!/^[a-zA-Z\s]+$/.test(value))
      return "Name should only contain letters and spaces";
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (value) => {
    if (!value.trim()) return "Phone number is required";
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(value.replace(/\D/g, "")))
      return "Phone number must have at least 10 digits";
    return "";
  };

  const validateAddress = (value) => {
    if (!value.trim()) return "Address is required";
    if (value.trim().length < 5) return "Address must be at least 5 characters";
    return "";
  };

  // Handle input changes with validation
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors({ ...errors, name: validateName(value) });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors({ ...errors, email: validateEmail(value) });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setErrors({ ...errors, phone: validatePhone(value) });
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    setErrors({ ...errors, address: validateAddress(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const addressError = validateAddress(address);

    // Update all errors
    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      address: addressError,
    });

    // Check if there are any errors
    if (nameError || emailError || phoneError || addressError) {
      return;
    }

    const newEmployee = {
      id: new Date().getTime(),
      name: name,
      email: email,
      phone: phone,
      address: address,
    };

    onAdd(newEmployee);

    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setErrors({ name: "", email: "", phone: "", address: "" });
    handleClose();
  };

  const headerStyle = {
    backgroundColor: "#0d6efd",
    color: "white",
    padding: "10px 15px",
    borderBottom: "none",
  };
  const titleStyle = {
    color: "white",
    fontWeight: "500",
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      backdrop="static"
      className="modal-add-user"
    >
      <Modal.Header closeButton style={headerStyle}>
        <Modal.Title style={titleStyle}>New Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={name}
              onChange={handleNameChange}
              required
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={email}
              onChange={handleEmailChange}
              required
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="col-12">
            <label className="form-label">Address</label>
            <input
              type="text"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              value={address}
              onChange={handleAddressChange}
              required
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>
          <div className="col-12">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>
          <div className="col-12 d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
