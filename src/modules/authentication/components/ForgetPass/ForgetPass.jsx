// import React from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgetPass() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        'https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',
        data,
      );
      // console.log(response);
      toast.success(response.data.message)
      navigate("/reset-password")

    } catch (error) {
      toast.error(error.response.data.message)
    }
  };
  return (
    <>
      <div>
        <div className="text my-5">
          <h5 className="">Forgot Your Password?</h5>
          <span className="d-block  text-muted">
            No worries! Please enter your email and we will send a password
            reset link
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-2">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control no-outline"
              placeholder="Enter your email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              {...register('email', { required: 'Email is required' })}
            />
          </div>
          {errors.email && (
            <span className="text-danger ">{errors.email.message}</span>
          )}
          <div className="btn-login mt-5">
            <button className="btn btn-success w-100  fw-bold ">Sumbit</button>
          </div>
        </form>
      </div>
    </>
  );
}
