import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/src/index.js";
import {Modal} from "react-bootstrap";

export function TaskModal(props) {
    // Regex for DD/MM/YYYY format
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

    const schema = yup
        .object({
            name: yup.string().required("Tên công việc là bắt buộc").max(100, "Tên công việc không được vượt quá 100 ký tự"),
            startDate: yup.string().required("Ngày bắt đầu là bắt buộc").matches(dateRegex, "Ngày bắt đầu phải theo định dạng DD/MM/YYYY"),
            endDate: yup.string().required("Ngày kết thúc là bắt buộc").matches(dateRegex, "Ngày kết thúc phải theo định dạng DD/MM/YYYY").test(
                "is-after-start",
                "Ngày kết thúc phải sau ngày bắt đầu",
                function (value) {
                    const {startDate} = this.parent;
                    if (!startDate || !value) return true;
                    const [d1, m1, y1] = startDate.split("/").map(Number);
                    const [d2, m2, y2] = value.split("/").map(Number);
                    const date1 = new Date(y1, m1 - 1, d1);
                    const date2 = new Date(y2, m2 - 1, d2);
                    return date2 > date1;
                }
            ),
            status: yup.string().oneOf(["in-progress", "delayed", "urgent"], "Trạng thái không hợp lệ").required("Trạng thái là bắt buộc"),
        })
        .required();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
        default: {
            name: "",
            startDate: "",
            endDate: "",
            status: "in-progress",
        },
        mode: "onChange",
    })

    const onSubmit = (data) => {
        const newTask = {
            id: new Date().getTime(),
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            status: data.status === "in-progress" ? "Đang thực hiện" : data.status === "delayed" ? "Trì hoãn" : "Khẩn cấp",
        };
        props.onAddTask(newTask);
        reset();
        props.onHide();
    }

    return <Modal
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
            <form>
                <div className="mb-3">
                    <label htmlFor="taskName" className="form-label">
                        Tên công việc
                    </label>
                    <input
                        type="text"
                        className={"form-control" + (errors.name ? " is-invalid" : "")}
                        id="taskName"
                        {...register("name")}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">
                        Ngày bắt đầu
                    </label>
                    <input
                        type="text"
                        className={"form-control" + (errors.startDate ? " is-invalid" : "")}
                        id="startDate"
                        {...register("startDate")}
                    />
                    {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">
                        Ngày kết thúc
                    </label>
                    <input
                        type="text"
                        className={"form-control" + (errors.endDate ? " is-invalid" : "")}
                        id="endDate"
                        {...register("endDate")}
                    />
                    {errors.endDate && <div className="invalid-feedback">{errors.endDate.message}</div>}
                </div>
                <div className="mb-3 d-flex justify-content-between">
                    <label className="form-label d-block">
                        Trạng thái
                    </label>
                    <div>
                        <label className="form-check-label bg-primary text-white p-1 px-2"
                               htmlFor="modal-status-in-progress">
                            <input
                                type="radio"
                                name="status"
                                id="modal-status-in-progress"
                                value="in-progress"
                                className="me-1"
                                defaultChecked
                                {...register("status")}
                            />
                            Đang thực hiện
                        </label>
                        <label className="form-check-label bg-warning p-1 px-2"
                               htmlFor="modal-status-delayed">
                            <input type="radio" name="status" id="modal-status-delayed" value="delayed"
                                   className="me-1" {...register("status")}/>
                            Trì hoãn
                        </label>
                        <label className="form-check-label bg-danger text-white p-1 px-2"
                               htmlFor="modal-status-urgent">
                            <input type="radio" name="status" id="modal-status-urgent" value="urgent"
                                   className="me-1" {...register("status")}/>
                            Khẩn cấp
                        </label>
                    </div>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <button className="btn" onClick={() => {
                reset();
                props.onHide();
            }}>
                Hủy
            </button>
            <button className="btn btn-primary rounded-0" onClick={handleSubmit(onSubmit)}>
                Lưu
            </button>
        </Modal.Footer>
    </Modal>;
}