import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <header className="navbar navbar-expand-md d-print-none ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            aria-controls="navbar-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal ps-2 ms-1 text-pink">
            <Link to="/" className="text-decoration-none text-reset ">
              <span>Custom Website Builder</span>
            </Link>
          </div>

          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-link d-flex lh-1 text-reset p-0">
              <span className="avatar avatar-sm bg-custom">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-pink"
                  x-bind:width="size"
                  x-bind:height="size"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  x-bind:stroke-width="stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24"
                  height="24"
                  strokeWidth="2"
                >
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                </svg>
              </span>
              <div className="d-none d-xl-block ps-2 ">
                <div>User</div>
                <div className="mt-1 small text-secondary">Admin</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="navbar-expand-md">
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="navbar">
            <div className="container-fluid">
              <div className="row flex-fill align-items-center">
                <div className="col">
                  <ul className="navbar-nav">
                    <li
                      className={`nav-item ${
                        location.pathname === '/' ? 'active' : ''
                      }`}
                    >
                      <Link className="nav-link " to="/">
                        <span className="nav-link-title">Home</span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname === '/users' ? 'active' : ''
                      }`}
                    >
                      <Link className="nav-link " to="/users">
                        <span className="nav-link-title">User List</span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname === '/system-monitor' ? 'active' : ''
                      }`}
                    >
                      <Link className="nav-link " to="/system-monitor">
                        <span className="nav-link-title">System Monitor</span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname === '/profile' ? 'active' : ''
                      }`}
                    >
                      <Link className="nav-link " to="/profile">
                        <span className="nav-link-title">
                          Profile Management
                        </span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname === '/website-status' ? 'active' : ''
                      }`}
                    >
                      <Link className="nav-link " to="/website-status">
                        <span className="nav-link-title">Website Status</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
