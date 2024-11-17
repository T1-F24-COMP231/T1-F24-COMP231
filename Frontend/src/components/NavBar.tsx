import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <header className="navbar navbar-expand-md d-print-none">
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
        <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <span>Custom Website Builder</span>
        </div>
        <div className="navbar-nav flex-row order-md-last">
          <div className="nav-link d-flex lh-1 text-reset p-0">
            <span
              className="avatar avatar-sm"
              style={{
                backgroundImage: `url('./static/avatars/003m.jpg')`,
              }}
            ></span>
            <div className="d-none d-xl-block ps-2">
              <div>User</div>
              <div className="mt-1 small text-secondary">Admin</div>
            </div>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/users">
                  <span className="nav-link-title">User List</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/system-monitor">
                  <span className="nav-link-title">System Monitor</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <span className="nav-link-title">Profile Management</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/website-status">
                  <span className="nav-link-title">Website Status</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
