// import React from 'react'

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Resetpass() {
  let navigate = useNavigate()
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let onSubmit = async (data) => {
    try {
      let response = await axios.post(
        'https://upskilling-egypt.com:3006/api/v1/Users/Reset',
        data,
      );
      console.log(response);
      toast.success(response.data.message)
      navigate("/login")
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message)
    }
  };
  return (
    <>
      <div>
        <div className="text my-4">
          <h5 className=""> Reset Password</h5>
          <span className="d-block  text-muted">
            Please Enter Your Otp or Check Your Inbox
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <div className="input-group ">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control no-outline"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                autoComplete="email"  

                {...register('email', { required: 'Email is required' })}
              />
            </div>
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-4">
            <div className="input-group ">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-user-lock"></i>
              </span>
              <input
                type="text"
                className="form-control no-outline"
                placeholder="OTP"
                aria-label="number"
                aria-describedby="basic-addon1"
                {...register('seed', {
                  required: 'OTP is required',
                  minLength: {
                    value: 4,
                    message: 'OTP must be at least 4 digits',
                  },
                })}
              />
            </div>
            {errors.seed && (
              <span className="text-danger">{errors.seed.message}</span>
            )}
          </div>
          <div className="mb-4">
            <div className="input-group ">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control no-outline"
                placeholder="New Password"
                aria-label="number"
                aria-describedby="basic-addon1"
                autoComplete="new-password"  
                {...register('password', {
                  required: ' password is required',
                })}
              />
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </div>
          <div className="mb-4">
            <div className="input-group ">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control no-outline"
                placeholder="Confirm New Password"
                aria-label="number"
                aria-describedby="basic-addon1"
                autoComplete="new-password"  

                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                })}
              />
            </div>
            {errors.confirmPassword && (
              <span className="text-danger">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="btn-login ">
            <button className="btn btn-success w-100  fw-bold ">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
