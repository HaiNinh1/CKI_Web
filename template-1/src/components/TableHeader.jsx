export function TableHeader(props) {
    return (
        <div className="mt-4 bg-secondary p-3 text-white d-flex justify-content-between align-items-center rounded-top">
            <h2>
                Quản lý <b>Công việc</b>
            </h2>
            <div className="d-flex">
                <label htmlFor="status-all" className="bg-primary p-2 ">
                    <input
                        type="radio"
                        name="status"
                        id="status-all"
                        value="all"
                        onChange={props.onChange}
                        checked={props.statusFilter === "all"}
                    />
                    <span className="ms-1">Tất cả</span>
                </label>
                <label htmlFor="status-urgent" className="bg-danger p-2 ">
                    <input
                        type="radio"
                        name="status"
                        id="status-urgent"
                        value="urgent"
                        onChange={props.onChange}
                        checked={props.statusFilter === "urgent"}
                    />
                    <span className="ms-1">Khẩn cấp</span>
                </label>
                <label htmlFor="status-in-progress" className="bg-info p-2 ">
                    <input
                        type="radio"
                        name="status"
                        id="status-in-progress"
                        value="in-progress"
                        onChange={props.onChange}
                        checked={props.statusFilter === "in-progress"}
                    />
                    <span className="ms-1">Đang thực hiện</span>
                </label>

                <label
                    htmlFor="status-delayed"
                    className="bg-warning text-dark p-2 "
                >
                    <input
                        type="radio"
                        name="status"
                        id="status-delayed"
                        value="delayed"
                        onChange={props.onChange}
                        checked={props.statusFilter === "delayed"}
                    />
                    <span className="ms-1">Trì hoãn</span>
                </label>
            </div>
        </div>
    );
}
