// import React from 'react'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../services/urls/urls';

export default function Verify() {
  let location = useLocation();
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: location.state } });

  const onSubmit = async (data) => {
    try {
      let response = await axiosInstance.put(USERS_URLS.VERIFY, data);
      console.log(response);
      toast.success(response?.data?.message || 'verify successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message || 'error on vaildation');
    }
  };
  return (
    <div>
      <div className="text my-5">
        <h5 className="">Verify Account</h5>
        <span className="d-block  text-muted">
          Welcome to community! please Verify your account
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="input-group ">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              disabled
              type="email"
              className="form-control no-outline"
              placeholder="Enter your email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              {...register('email')}
            />
          </div>
          {errors.email && (
            <span className="text-danger ">{errors?.email?.message}</span>
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
              placeholder="code"
              {...register('code', {
                required: 'code is required',
                  minLength: {
                    value: 4,
                    message: 'OTP must be at least 4 digits',
                  },
              })}
            />
          </div>
          {errors?.code && (
            <span className="text-danger">{errors?.code?.message}</span>
          )}
        </div>

        <div className="btn-login mt-5">
          <button
            className="btn btn-success w-100  fw-bold "
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verify ... ' : 'Verify'}
          </button>
        </div>
      </form>
    </div>
  );
}
