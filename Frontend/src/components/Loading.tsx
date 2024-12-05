import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="page page-center m-5">
      <div className="container container-slim py-4">
        <div className="text-center">
          
          <div className="text-secondary mb-3">Preparing application</div>
          <div className="progress progress-sm">
            <div className="progress-bar progress-bar-indeterminate"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
