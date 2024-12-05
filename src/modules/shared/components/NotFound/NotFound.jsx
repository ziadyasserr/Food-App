import React from 'react'
import notfound from "../../../../assets/images/Not Found.png" 

export default function NotFound() {
  return (
    <div className='d-flex justify-content-center align-items-center '>
      <img src={notfound} className='vh-100 w-100 ' alt="notFound" />
    </div>
  )
}
