// import React from 'react'

import { useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { FaNfcDirectional } from 'react-icons/fa6';
import { IoHomeOutline, IoLogOutOutline } from 'react-icons/io5';
import { LuUsers } from 'react-icons/lu';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/logo-sidebar.png';
export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  let toggleIsCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className="sidebar-container top-0 position-sticky align-self-start">
      <Sidebar className="vh-100 " collapsed={isCollapsed}>
        <Menu>
          <MenuItem
            onClick={toggleIsCollapsed}
            icon={<img src={logo} alt="logo" />}
            // component={<Link to="/dashboard" />}
            className=" my-5 sidebar-logo  text-center"
          ></MenuItem>

          <MenuItem
            icon={<IoHomeOutline />}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          <MenuItem icon={<LuUsers />} component={<Link to="users" />}>
            Users
          </MenuItem>

          <MenuItem
            icon={<FaNfcDirectional />}
            component={<Link to="recipes" />}
          >
            Recipes
          </MenuItem>
          <MenuItem icon={<BiCategory />} component={<Link to="categories" />}>
            Categories
          </MenuItem>
          <MenuItem
            icon={<RiLockPasswordLine />}
            component={<Link to="users" />}
          >
            Change Password
          </MenuItem>
          <MenuItem icon={<IoLogOutOutline />} component={<Link to="users" />}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
