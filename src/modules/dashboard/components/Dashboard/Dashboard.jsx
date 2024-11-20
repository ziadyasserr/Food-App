// import React from 'react'

// import headerImg from '../../../../assets/images/header.png';
import Header from '../../../shared/components/Header/Header';

export default function Dashboard({ loginData }) {
  return (
    <>
      <Header
        title={`Welcome ${loginData?.userName}`}
        description={'This is a welcoming screen for the entry of the application , you can now see the options'}
        // img={headerImg}
      />
    </>
  );
}
