export default function Header() {
    return (
        <header className="p-2 mb-3 border-bottom shadow-lg ">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
                <ul className="nav justify-content-center align-items-center">
                    <li>
                        <h3 className="m-1 ms-3">TLU</h3>
                    </li>
                    <li>
                        <a href="#" className="nav-link px-2 link-secondary">
                            Trang chu
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link px-2 link-dark">
                            Quan ly cong viec
                        </a>
                    </li>
                </ul>

                <form className="d-flex align-items-center gap-2">
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Nhap noi dung"
                        aria-label="Search"
                    />
                    <button
                        name="Tim kiem"
                        className="btn btn-outline-primary text-nowrap"
                        type="submit"
                    >
                        Tim kiem
                    </button>
                </form>
            </div>
        </header>
    );
}
