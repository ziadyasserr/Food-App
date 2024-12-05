// import React from 'react'

import { useContext, useEffect, useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { FaNfcDirectional } from 'react-icons/fa6';
import { IoHomeOutline, IoLogOutOutline } from 'react-icons/io5';
import { LuUsers } from 'react-icons/lu';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/images/logo-sidebar.png';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
export default function SideBar() {
  let navigate = useNavigate();
  const { loginData } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const save = localStorage.getItem('saveCurrentState');
    return save === 'true';
  });
  let toggleIsCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  let handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };


  // const [activeMenuItem, setActiveMenuItem] = useState(null);

  // const handleMenuItemClick = (itemName) => {
  //   setActiveMenuItem(itemName);
  // };

  useEffect(() => {
    localStorage.setItem('saveCurrentState', isCollapsed);
  }, [isCollapsed]);

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

          {loginData?.userGroup == 'SuperAdmin' ? (
            <MenuItem icon={<LuUsers />} component={<Link to="users" />}>
              Users
            </MenuItem>
          ) : (
            ' '
          )}

          <MenuItem
            icon={<FaNfcDirectional />}
            component={<Link to="recipes" />}
            active={true}
          >
            Recipes
          </MenuItem>
          {loginData?.userGroup != 'SuperAdmin' ? (
            <MenuItem
              icon={<FaNfcDirectional />}
              component={<Link to="favorites" />}
            >
              Favorites
            </MenuItem>
          ) : (
            ''
          )}

          {loginData?.userGroup == 'SuperAdmin' ? (
            <MenuItem
              icon={<BiCategory />}
              component={<Link to="categories" />}
            >
              Categories
            </MenuItem>
          ) : (
            ' '
          )}

          <MenuItem
            icon={<RiLockPasswordLine />}
            component={<Link to="/change-password" />}
          >
            Change Password
          </MenuItem>
          <MenuItem
            icon={<IoLogOutOutline />}
            // component={<Link to="users" />}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
