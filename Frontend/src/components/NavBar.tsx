import React from 'react';
import { useLocation, Link } from 'react-router-dom';
interface NavBarProps {
  onLogout: () => void;
  isAdmin: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ onLogout, isAdmin }) => {
  const location = useLocation();
  return (
    <>
      <header className="navbar navbar-expand-md d-print-none ">
        <div className="container-xl">
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

          <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal ps-2 ms-2 color-primary">
            <Link to="/" className="text-decoration-none text-reset ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-ao3 me-2"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M2 5c7.109 4.1 10.956 10.131 12 14c1.074 -4.67 4.49 -8.94 8 -11" />
                  <path d="M14 8m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M7 9c-.278 5.494 -2.337 7.33 -4 10c4.013 -2 6.02 -5 15.05 -5c4.012 0 3.51 2.5 1 3c2 .5 2.508 5 -2.007 2" />
                </svg>
                Custom Website Builder
              </span>
            </Link>
          </div>

          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-link d-flex lh-1 text-reset p-0">
              <span className="avatar avatar-sm bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="color-primary"
                  x-bind:width="size"
                  x-bind:height="size"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  x-bind:strokewidth="stroke"
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

          {/* Logout Button */}
          <button className="btn btn-outline-primary ms-3" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <header className="navbar-expand-md">
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="navbar">
            <div className="container-xl">
              <div className="row flex-fill align-items-center">
                <div className="col">
                  <ul className="navbar-nav">
                    <li
                      className={`nav-item ${
                        location.pathname === '/' ? 'active' : ''
                      }`}
                    >
                      <Link className="nav-link " to="/">
                        <span className="nav-link-icon d-md-none d-lg-inline-block m-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-home"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                          </svg>
                        </span>
                      </Link>
                    </li>
                    {isAdmin && (
                      <li
                        className={`nav-item mx-1 ${
                          location.pathname === '/users' ? 'active' : ''
                        }`}
                      >
                        <Link className="nav-link " to="/users">
                          <span className="nav-link-icon d-md-none d-lg-inline-block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-tabler icons-tabler-outline icon-tabler-list"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M9 6l11 0" />
                              <path d="M9 12l11 0" />
                              <path d="M9 18l11 0" />
                              <path d="M5 6l0 .01" />
                              <path d="M5 12l0 .01" />
                              <path d="M5 18l0 .01" />
                            </svg>
                          </span>
                          <span className="nav-link-title">User List</span>
                        </Link>
                      </li>
                    )}
                    <li
                      className={`nav-item mx-1 ${
                        location.pathname === '/system-monitor' ? 'active' : ''
                      }`}
                    >
                      <Link className="nav-link " to="/system-monitor">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-device-desktop-analytics"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 4m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z" />
                            <path d="M7 20h10" />
                            <path d="M9 16v4" />
                            <path d="M15 16v4" />
                            <path d="M9 12v-4" />
                            <path d="M12 12v-1" />
                            <path d="M15 12v-2" />
                            <path d="M12 12v-1" />
                          </svg>
                        </span>

                        <span className="nav-link-title">System Monitor</span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item mx-1 ${
                        location.pathname === '/profile' ? 'active' : ''
                      }`}
                    >
                      <Link className="nav-link " to="/profile">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                          </svg>
                        </span>

                        <span className="nav-link-title">
                          Profile Management
                        </span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item mx-1 ${
                        location.pathname === '/website-status' ? 'active' : ''
                      }`}
                    >
                      <Link className="nav-link " to="/website-status">
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-brand-redux"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M16.54 7c-.805 -2.365 -2.536 -4 -4.54 -4c-2.774 0 -5.023 2.632 -5.023 6.496c0 1.956 1.582 4.727 2.512 6" />
                            <path d="M4.711 11.979c-1.656 1.877 -2.214 4.185 -1.211 5.911c1.387 2.39 5.138 2.831 8.501 .9c1.703 -.979 2.875 -3.362 3.516 -4.798" />
                            <path d="M15.014 19.99c2.511 0 4.523 -.438 5.487 -2.1c1.387 -2.39 -.215 -5.893 -3.579 -7.824c-1.702 -.979 -4.357 -1.235 -5.927 -1.07" />
                            <path d="M10.493 9.862c.48 .276 1.095 .112 1.372 -.366a1 1 0 0 0 -.367 -1.365a1.007 1.007 0 0 0 -1.373 .366a1 1 0 0 0 .368 1.365z" />
                            <path d="M9.5 15.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                            <path d="M15.5 14m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          </svg>
                        </span>
                        <span className="nav-link-title">Website Status</span>
                      </Link>
                    </li>
                    {isAdmin && (
                      <li
                        className={`nav-item mx-1 ${
                          location.pathname === '/backup-management'
                            ? 'active'
                            : ''
                        }`}
                      >
                        <Link className="nav-link " to="/backup-management">
                          <span className="nav-link-icon d-md-none d-lg-inline-block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-tabler icons-tabler-outline icon-tabler-device-desktop-analytics"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M3 4m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z" />
                              <path d="M7 20h10" />
                              <path d="M9 16v4" />
                              <path d="M15 16v4" />
                              <path d="M9 12v-4" />
                              <path d="M12 12v-1" />
                              <path d="M15 12v-2" />
                              <path d="M12 12v-1" />
                            </svg>
                          </span>
                          <span className="nav-link-title">Backup</span>
                        </Link>
                      </li>
                    )}
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
