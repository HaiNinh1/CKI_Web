import { useEffect, useState } from "react";
import tasksData from "../data.js";
import { TaskModal } from "./TaskModal.jsx";
import { TableHeader } from "./TableHeader.jsx";

export default function DataTable() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [tasks, setTasks] = useState(tasksData);

  const [modalShow, setModalShow] = useState(false);
  const onOpenModal = () => setModalShow(true);
  const onCloseModal = () => setModalShow(false);

  useEffect(() => {
    setTasks([...tasksData]);
  }, []);

  const filteredTasks =
    statusFilter === "all"
      ? tasks
      : tasks.filter((task) => {
          if (statusFilter === "urgent") {
            return task.status === "Khẩn cấp";
          } else if (statusFilter === "in-progress") {
            return task.status === "Đang thực hiện";
          } else if (statusFilter === "delayed") {
            return task.status === "Trì hoãn";
          }
          return true;
        });

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <>
      <TableHeader onChange={handleStatusChange} statusFilter={statusFilter} />

      <div className="p-4">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Công việc</th>
              <th scope="col">Thời gian bắt đầu</th>
              <th scope="col">Thời gian kết thúc</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Quản lý</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, idx) => (
              <tr key={task.id}>
                <td>{idx + 1}</td>
                <td>{task.name}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                <td>
                  <span
                    className={
                      task.status === "Đang thực hiện"
                        ? "badge bg-primary"
                        : task.status === "Trì hoãn"
                        ? "badge bg-warning text-dark"
                        : "badge bg-danger"
                    }
                  >
                    {task.status}
                  </span>
                </td>
                <td className="d-flex gap-2 align-items-center">
                  <button
                    type="button"
                    className="btn btn-sm p-0 "
                    onClick={onOpenModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      style={{
                        width: "1.5em",
                        height: "1.5em",
                        verticalAlign: "-0.125em",
                      }}
                    >
                      <circle cx="256" cy="256" r="256" fill="#198754" />{" "}
                      <rect
                        x="236"
                        y="136"
                        width="40"
                        height="240"
                        rx="20"
                        fill="#fff"
                      />
                      <rect
                        x="136"
                        y="236"
                        width="240"
                        height="40"
                        rx="20"
                        fill="#fff"
                      />
                    </svg>
                  </button>
                  <button
                    className="btn  btn-sm p-0"
                    onClick={() => {
                      setTasks(tasks.filter((t) => t.id !== task.id));
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      style={{
                        width: "1.5em",
                        height: "1.5em",
                        verticalAlign: "-0.125em",
                      }}
                    >
                      <path
                        fill="#dc3545"
                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            Hiển thị <b>{tasks.length}</b> bản ghi
          </div>
          <nav>
            <ul className="pagination mb-0">
              <li className="page-item disabled">
                <button className="page-link">Trước</button>
              </li>
              <li className="page-item active">
                <button className="page-link">1</button>
              </li>
              <li className="page-item disabled">
                <button className="page-link">Sau</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <TaskModal
        show={modalShow}
        onHide={onCloseModal}
        onAddTask={handleAddTask}
      />
    </>
  );
}
