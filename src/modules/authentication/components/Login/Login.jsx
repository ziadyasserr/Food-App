// import React from 'react'
import { useForm } from 'react-hook-form';

import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../services/urls/urls';
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from '../../../../services/validation/validation';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';

export default function Login() {
  const { saveLoginData } = useContext(AuthContext);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  let onSumbit = async (data) => {
    try {
      let response = await axiosInstance.post(USERS_URLS.LOGIN, data);
      localStorage.setItem('token', response.data.token);
      saveLoginData();
      toast.success('Login Success');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message || 'Login Failed');
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
                {...register('email', EMAIL_VALIDATION)}
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
              type={isPasswordVisible ? 'text' : 'password'}
              className="form-control no-outline"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              {...register('password', PASSWORD_VALIDATION)}
            />
            <button
              className="input-group-text"
              id="basic-addon1"
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              {isPasswordVisible ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </button>
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
            <button
              disabled={isSubmitting}
              className="btn btn-success w-100  fw-bold"
            >
              {isSubmitting ? `logining ...` : `login`}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
