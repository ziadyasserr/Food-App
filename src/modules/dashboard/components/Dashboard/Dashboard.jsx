// import React from 'react'

// import headerImg from '../../../../assets/images/header.png';
import { useContext } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import Header from '../../../shared/components/Header/Header';

export default function Dashboard() {
  let navigate = useNavigate();
  let { loginData } = useContext(AuthContext);
  return (
    <>
      {/* <h1>{loginData.userGroup}</h1> */}
      <Header
        name={'Welcome'}
        title={` ${loginData?.userName}`}
        description={
          'This is a welcoming screen for the entry of the application , you can now see the options'
        }
        // img={headerImg}
      />

      <div className="d-flex justify-content-between align-items-center under-header mt-5 p-5">
        <div>
          <h2>
            Fill the <span className="text-success">Recipes !</span>{' '}
          </h2>
          <span className="d-block w-75">
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </span>
        </div>
        <button className="d-flex justify-content-between align-items-center bg-success px-4 py-1 text-white rounded-3 btn border-0">
          <button
            className="btn border-0  text-white"
            onClick={() => navigate('/dashboard/recipes')}
          >
            Fill Recipes
          </button>
          <div>
            <FaArrowRight />
          </div>
        </button>
      </div>
    </>
  );
}
