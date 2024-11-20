// import React from 'react'

import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { USERS_URLS } from '../../../../services/urls/urls';

export default function Resetpass() {
  const location = useLocation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: location.state } });

  let onSubmit = async (data) => {
    try {
      let response = await axios.post(USERS_URLS.RESET, data);
      console.log(response);
      toast.success(response.data.message || 'Reset Password Success');
      navigate('/login');
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message || 'Some Thing Is Wrong');
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
                disabled={true}
                type="email"
                className="form-control no-outline"
                placeholder="email"
                aria-label="e mail"
                aria-describedby="basic-addon1"
                autoComplete="email"
                {...register('email')}
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
                type={isPasswordVisible ? 'text' : 'password'}
                className="form-control no-outline"
                placeholder="New Password"
                aria-label="number"
                aria-describedby="basic-addon1"
                autoComplete="new-password"
                {...register('password', {
                  required: ' password is required',
                })}
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
          </div>
          <div className="mb-4">
            <div className="input-group ">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                className="form-control no-outline"
                placeholder="Confirm New Password"
                aria-label="number"
                aria-describedby="basic-addon1"
                autoComplete="new-password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                })}
              />
              <button
                className="input-group-text"
                id="basic-addon1"
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={(e) => e.preventDefault()}
                onClick={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              >
                {isConfirmPasswordVisible ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-danger">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="btn-login ">
            <button
              className="btn btn-success w-100  fw-bold "
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Reseting Password ...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
