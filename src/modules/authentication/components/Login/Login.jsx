// import React from 'react'
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let onSumbit = async (data) => {
    try {
      let response = await axios.post(
        'https://upskilling-egypt.com:3006/api/v1/Users/Login',
        data,
      );
      console.log(response);
      toast.success('login success');
      navigate('/dashboard');
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div>
        <div className="text my-4">
          <h5 className="">Log In</h5>
          <span className="d-block text-muted">
            Welcome Back! Please enter your details
          </span>
        </div>

        <form onSubmit={handleSubmit(onSumbit)}>
          <div className="mb-4">
            <div className="input-group ">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control no-outline"
                placeholder="Enter your E-mail"
                aria-label="Email"
                aria-describedby="basic-addon1"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email format',
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="text"
              className="form-control no-outline"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              {...register('password', {
                required: 'password is required',
              })}
            />
          </div>
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}

          <div className="links d-flex justify-content-between my-4">
            <Link to={'/register'} className="text-decoration-none text-black">
              Register Now?
            </Link>
            <Link
              to={'/forget-password'}
              className="text-decoration-none text-success"
            >
              Forget Password?
            </Link>
          </div>
          <div className="btn-login ">
            <button className="btn btn-success w-100  fw-bold">Login</button>
          </div>
        </form>
      </div>
    </>
  );
}
