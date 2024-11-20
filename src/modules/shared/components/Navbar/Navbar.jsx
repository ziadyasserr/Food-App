// import React from 'react'
import { CiSearch } from 'react-icons/ci';
import navbarimg from '../../../../assets/images/Navbar.png';

export default function Navbar({ loginData }) {
  return (
    <div className="Navbar d-flex justify-content-between align-items-center m-1 py-2 px-4">
      <div className="input-group w-75 ">
        <input
          type="text"
          className="form-control border-0"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-icon"
        />
        <span className="input-group-text border-0 bg-white" id="search-icon">
          <CiSearch />
        </span>
      </div>

      <div className="d-flex justify-content-center align-items-center gap-3">
        <div>
          <img src={navbarimg} alt="navbarimg" />
        </div>
        <div>
          <h4>{loginData?.userName}</h4>
        </div>
      </div>
    </div>
  );
}
