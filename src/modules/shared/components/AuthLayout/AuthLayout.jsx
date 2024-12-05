// import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../../../../assets/images/logo.png';

export default function AuthLayout() {
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-lg-5">
              <div className=" p-4 bg-white rounded rounded-2">
                <div className="logo text-center ">
                  <img src={logo} alt="logo" className="w-75   " />
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
