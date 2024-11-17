import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/website-builder');
  };

  return (
    <div className="mb-3">
      <header className="navbar navbar-expand-md d-print-none">
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
                <li className="nav-item active">
                  <a className="nav-link" href="./#">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
                      </svg> */}
                    </span>
                    <span className="nav-link-title">First</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./#">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
                      </svg> */}
                    </span>
                    <span className="nav-link-title">Second</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
    // <div style={{ textAlign: 'center', marginTop: '50px' }}>
    //   <h1>Welcome to the Website Builder App</h1>
    //   <button
    //     onClick={handleNavigate}
    //     style={{
    //       padding: '10px 20px',
    //       backgroundColor: '#007bff',
    //       color: '#fff',
    //       border: 'none',
    //       borderRadius: '5px',
    //       cursor: 'pointer',
    //       marginTop: '20px',
    //     }}
    //   >
    //     Open Website Builder
    //   </button>
    // </div>
  );
};

export default Home;
