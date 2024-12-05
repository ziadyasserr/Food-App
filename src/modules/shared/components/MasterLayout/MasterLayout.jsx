// import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import SideBar from '../Sidebar/Sidebar';

export default function MasterLayout( ) {
  return (
    <>
      <div className="d-flex">
        <div >
          <SideBar />
        </div>
        <div className=" w-100  px-4 ">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
