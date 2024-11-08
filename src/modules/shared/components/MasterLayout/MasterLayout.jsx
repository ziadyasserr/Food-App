// import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="bg-info w-25">
          <Sidebar />
        </div>
        <div className="bg-danger w-100 ">
          <Navbar />
          <Header/>
          <Outlet />
        </div>
      </div>
    </>
  );
}
