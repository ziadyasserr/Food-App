// import React from 'react'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../services/urls/urls';
import {
  EMAIL_VALIDATION,
  GetRequiredMessage,
} from '../../../../services/validation/validation';

export default function Register() {
  let navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  let {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  let onSumbit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('userName', data.userName);
      formData.append('email', data.email);
      formData.append('country', data.country);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('password', data.password);
      formData.append('confirmPassword', data.confirmPassword);

      if (data.profileImage && data.profileImage[0]) {
        formData.append('profileImage', data.profileImage[0]);
      }

      let response = await axiosInstance.post(USERS_URLS.REGISTER, formData);
      console.log(response);

      toast.success(response?.data?.message || 'sucessfully...Need to verify');
      navigate('/verify', { state: data.email });
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message || 'Register failed');
    }
  };
  return (
    <>
      <div>
        <div className="text my-4">
          <h5 className="">Register</h5>
          <span className="d-block text-muted">
            Welcome Back! Please enter your details
          </span>
        </div>

        <form onSubmit={handleSubmit(onSumbit)} className="row ">
          <div className="mb-4 col-12 col-md-6">
            <div className="input-group ">
              <span className="input-group-text">
                <i className="fa-solid fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control no-outline"
                placeholder="Enter your username"
                {...register('userName', {
                  required: GetRequiredMessage('Username'),
                  maxLength: {
                    value: 8,
                    message:
                      'The userName may not be greater than 8 characters.',
                  },
                  pattern: {
                    value: /^[a-zA-Z]+[0-9]$/,
                    message:
                      'Username must start with letters, end with a number, and be spaceless.',
                  },
                })}
              />
            </div>
            {errors?.userName && (
              <span className="text-danger">{errors?.userName?.message}</span>
            )}
          </div>

          <div className="mb-4 col-12 col-md-6">
            <div className="input-group ">
              <span className="input-group-text">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control no-outline"
                placeholder="Enter your E-mail"
                {...register('email', EMAIL_VALIDATION)}
              />
            </div>
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4 col-12 col-md-6">
            <div className="input-group ">
              <span className="input-group-text">
                <i className="fa-solid fa-earth-americas"></i>{' '}
              </span>
              <input
                type="text"
                className="form-control no-outline"
                placeholder="Enter your country"
                {...register('country', {
                  required: GetRequiredMessage('country'),
                })}
              />
            </div>
            {errors?.country && (
              <p className="text-danger">{errors?.country?.message}</p>
            )}
          </div>

          <div className="mb-4 col-12 col-md-6">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-solid fa-phone"></i>{' '}
              </span>
              <input
                type="text"
                className="form-control no-outline"
                placeholder="Enter your phone number"
                {...register('phoneNumber', {
                  required: GetRequiredMessage('phoneNumber'),
                  pattern: {
                    value: /^01\d{9}$/,
                    message: 'Phone number is incorrect .',
                  },
                })}
              />
            </div>
            {errors?.phoneNumber && (
              <p className="text-danger">{errors?.phoneNumber?.message}</p>
            )}
          </div>

          <div className="mb-4 col-12 col-md-6">
            <div className="input-group ">
              <span className="input-group-text">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                className="form-control no-outline"
                placeholder="New Password"
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
            {errors?.password && (
              <span className="text-danger">{errors?.password?.message}</span>
            )}
          </div>

          <div className="mb-4 col-12 col-md-6">
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

          <div className="mb-4 col-12 ">
            <div className="input-group ">
              <input
                type="file"
                className="form-control no-outline"
                {...register('profileImage')}
              />
            </div>
          </div>

          <div className="btn-login ">
            <button
              disabled={isSubmitting}
              className="btn btn-success w-100  fw-bold"
            >
              {isSubmitting ? `Register ...` : `Register`}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
