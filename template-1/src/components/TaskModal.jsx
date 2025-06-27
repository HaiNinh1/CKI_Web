import { useState } from "react";
import { Modal } from "react-bootstrap";

export function TaskModal(props) {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "in-progress",
  });

  const [errors, setErrors] = useState({});

  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  const nameRegex = /^.{1,100}$/; // 1-100 characters

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Tên công việc là bắt buộc";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Tên công việc không được vượt quá 100 ký tự";
    }

    // Validate start date
    if (!formData.startDate.trim()) {
      newErrors.startDate = "Ngày bắt đầu là bắt buộc";
    } else if (!dateRegex.test(formData.startDate)) {
      newErrors.startDate = "Ngày bắt đầu phải theo định dạng DD/MM/YYYY";
    }

    // Validate end date
    if (!formData.endDate.trim()) {
      newErrors.endDate = "Ngày kết thúc là bắt buộc";
    } else if (!dateRegex.test(formData.endDate)) {
      newErrors.endDate = "Ngày kết thúc phải theo định dạng DD/MM/YYYY";
    } else if (formData.startDate && dateRegex.test(formData.startDate)) {
      // Check if end date is after start date
      const [d1, m1, y1] = formData.startDate.split("/").map(Number);
      const [d2, m2, y2] = formData.endDate.split("/").map(Number);
      const startDateObj = new Date(y1, m1 - 1, d1);
      const endDateObj = new Date(y2, m2 - 1, d2);

      if (endDateObj <= startDateObj) {
        newErrors.endDate = "Ngày kết thúc phải sau ngày bắt đầu";
      }
    }

    // Validate status
    const validStatuses = ["in-progress", "delayed", "urgent"];
    if (!validStatuses.includes(formData.status)) {
      newErrors.status = "Trạng thái không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newTask = {
        id: new Date().getTime(),
        name: formData.name,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status:
          formData.status === "in-progress"
            ? "Đang thực hiện"
            : formData.status === "delayed"
            ? "Trì hoãn"
            : "Khẩn cấp",
      };
      props.onAddTask(newTask);
      handleReset();
      props.onHide();
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      status: "in-progress",
    });
    setErrors({});
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
      centered
      bsPrefix="modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm công việc</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="taskName" className="form-label">
              Tên công việc
            </label>
            <input
              type="text"
              className={"form-control" + (errors.name ? " is-invalid" : "")}
              id="taskName"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Ngày bắt đầu
            </label>
            <input
              type="text"
              className={
                "form-control" + (errors.startDate ? " is-invalid" : "")
              }
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              placeholder="DD/MM/YYYY"
            />
            {errors.startDate && (
              <div className="invalid-feedback">{errors.startDate}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              Ngày kết thúc
            </label>
            <input
              type="text"
              className={"form-control" + (errors.endDate ? " is-invalid" : "")}
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              placeholder="DD/MM/YYYY"
            />
            {errors.endDate && (
              <div className="invalid-feedback">{errors.endDate}</div>
            )}
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <label className="form-label d-block">Trạng thái</label>
            <div>
              <label
                className="form-check-label bg-primary text-white p-1 px-2"
                htmlFor="modal-status-in-progress"
              >
                <input
                  type="radio"
                  name="status"
                  id="modal-status-in-progress"
                  value="in-progress"
                  className="me-1"
                  checked={formData.status === "in-progress"}
                  onChange={handleInputChange}
                />
                Đang thực hiện
              </label>
              <label
                className="form-check-label bg-warning p-1 px-2"
                htmlFor="modal-status-delayed"
              >
                <input
                  type="radio"
                  name="status"
                  id="modal-status-delayed"
                  value="delayed"
                  className="me-1"
                  checked={formData.status === "delayed"}
                  onChange={handleInputChange}
                />
                Trì hoãn
              </label>
              <label
                className="form-check-label bg-danger text-white p-1 px-2"
                htmlFor="modal-status-urgent"
              >
                <input
                  type="radio"
                  name="status"
                  id="modal-status-urgent"
                  value="urgent"
                  className="me-1"
                  checked={formData.status === "urgent"}
                  onChange={handleInputChange}
                />
                Khẩn cấp
              </label>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn"
          onClick={() => {
            handleReset();
            props.onHide();
          }}
        >
          Hủy
        </button>
        <button className="btn btn-primary rounded-0" onClick={handleSubmit}>
          Lưu
        </button>
      </Modal.Footer>
    </Modal>
  );
}
