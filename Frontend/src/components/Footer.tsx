import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer footer-transparent d-print-none text-secondary bg-none py-3">
      <div className="container-xl">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item ms-2">
                Copyright © 2024
                <a href="." className="link-secondary mx-2">
                  Custom Website Builder.
                </a>
                All rights reserved.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
