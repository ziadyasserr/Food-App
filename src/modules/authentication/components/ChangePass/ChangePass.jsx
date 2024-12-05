import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../services/urls/urls';

export default function ChangePass() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordNewVisible, setIsPasswordNewVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  let onSubmit = async (data) => {
    try {
      toast.info('Processing your request...');
      let response = await axiosInstance.put(USERS_URLS.CHANGE_PASSWORD, data);
      console.log(response);
      toast.success(response.data.message || 'Reset Password Success');
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message || 'Some Thing Is Wrong');
    }
  };
  return (
    <>
      <div>
        <div className="text my-4">
          <h5 className=""> Change Password</h5>
          <span className="d-block  text-muted">
            Please Enter Old Password and Update it
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <div className="input-group ">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                className="form-control no-outline"
                placeholder="Old Password"
                aria-label="number"
                aria-describedby="basic-addon1"
                autoComplete="old-password"
                {...register('oldPassword', {
                  required: 'old password is required',
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
            {errors.oldPassword && (
              <span className="text-danger">{errors.oldPassword.message}</span>
            )}
          </div>
          <div className="mb-4">
            <div className="input-group ">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type={isPasswordNewVisible ? 'text' : 'password'}
                className="form-control no-outline"
                placeholder="New Password"
                aria-label="number"
                aria-describedby="basic-addon1"
                autoComplete="new-password"
                {...register('newPassword', {
                  required: ' password is required',
                })}
              />
              <button
                className="input-group-text"
                id="basic-addon1"
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={(e) => e.preventDefault()}
                onClick={() => setIsPasswordNewVisible((prev) => !prev)}
              >
                {isPasswordVisible ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </button>
            </div>
            {errors.newPassword && (
              <span className="text-danger">{errors.newPassword.message}</span>
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
                autoComplete="confirm-New-Password"
                {...register('confirmNewPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watch('newPassword') || 'Passwords do not match',
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
            {errors.confirmNewPassword && (
              <span className="text-danger">
                {errors.confirmNewPassword.message}
              </span>
            )}
          </div>

          <div className="btn-login ">
            <button
              className="btn btn-success w-100  fw-bold "
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sumbiting ...' : 'submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
