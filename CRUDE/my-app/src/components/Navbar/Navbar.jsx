import "./Navbar.css"

const Navbar = () => {
  return (
      <nav className="navbar navbar-expand-lg bg-dark ">
          <div className="container-fluid">
              <a className="navbar-brand text-light fw-bold " href="#">Navbar</a>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                          <a className="nav-link active text-light" aria-current="page" href="#">Home</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link text-light disabled" href="#">Link</a>
                      </li>

                  </ul>
                  <form className="d-flex" role="search">
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button className="btn btn-outline-success" type="submit">Search</button>
                  </form>
              </div>
          </div>
      </nav>
  );
}

export default Navbar;