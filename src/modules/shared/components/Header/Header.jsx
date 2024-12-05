// import React from 'react'

import { useLocation } from 'react-router-dom';
import headerman from '../../../../assets/images/header-man.png';
import headerwoman from '../../../../assets/images/header-woman.png';

export default function Header({ name, title, description }) {
  let location = useLocation();
  return (
    <div className="header-container d-flex justify-content-between align-items-center rounded-3  ">
      <div className="text-light px-5 text-header">
        <h3 className="fw-semibold  text-capitalize">
          {name} <span className="text-white-50 fw-bolder">{title}</span>
        </h3>
        <span className="d-block">{description}</span>
      </div>
      <div>
        <img
          src={location.pathname === '/dashboard' ? headerwoman : headerman}
          alt=""
          style={
            location.pathname === '/dashboard'
              ? { width: '210px', height: '210px' }
              : {}
          }
        />
      </div>
    </div>
  );
}
