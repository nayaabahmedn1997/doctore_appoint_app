import React from 'react';
import '../styles/layout.css';
const Layout = ({children}) => {
  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className="sidebar">Sidebar</div>

        <div className="content">
          <div className="header">Header</div>
          <div className="body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;