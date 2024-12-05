// import React from 'react'

import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import headerImg from '../../../../assets/images/header.png';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import { axiosInstance, CATEGORY_URLS } from '../../../../services/urls/urls';
import { GetRequiredMessage } from '../../../../services/validation/validation';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import Header from '../../../shared/components/Header/Header';
import NoData from '../../../shared/components/NoData/NoData';

export default function CategoriesList() {
  const { loginData } = useContext(AuthContext);
  let navigate = useNavigate();

  const [categoriesList, setCategoriesList] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  let {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  ////////////////// Delete confirmation modal //////////////////////////
  const [showDelete, setShowDelete] = useState(false);
  const handleClose = () => setShowDelete(false);
  const handleShow = (id) => {
    setCategoryId(id);
    setShowDelete(true);
  };
  let deleteCatagory = async () => {
    try {
      await axiosInstance.delete(
        CATEGORY_URLS.DELETE_CATEGORY(categoryId),
        // `${CATEGORY_URLS.DELETE_CATEGORY}/${categoryId}`,
      );
      toast.success('delete success');
      getCategories();
    } catch (error) {
      console.log(error);
      toast.error('delete failed');
    }
    handleClose();
  };

  ///////////////// Add/Update confirmation modal ////////////////////////
  const [categoryUpdateId, setCategoryUpdateId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };
  const handleShowModal = (category) => {
    if (category) {
      setCategoryUpdateId(category.id);
      setIsUpdateModal(true);
      setValue('name', category.name);
    } else {
      setIsUpdateModal(false);
    }
    setShowModal(true);
  };

  ///////////////// get Categories ////////////////////////
  let getCategories = async () => {
    try {
      let response = await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES, {
        params: { pageSize: 10, pageNumber: 1 },
      });
      console.log(response);
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // useEffect(() => {
  //   if (loginData?.userGroup == 'SuperAdmin') getCategories();
  //   else navigate('/login');
  // }, []);

  useEffect(() => {
    if (loginData) {
      if (loginData.userGroup === 'SuperAdmin') {
        getCategories();
      } else {
        navigate('/login');
      }
    }
  }, [loginData]);

  let onSubmit = async (data) => {
    try {
      if (isUpdateModal) {
        await axiosInstance.put(
          CATEGORY_URLS.UPDATE_CATEGORY(categoryUpdateId),
          data,
        );
        toast.success('Category updated successfully');
      } else {
        await axiosInstance.post(CATEGORY_URLS.POST_CATEGORY, data);
        toast.success('Category Added successfully');
        // reset(); // Clear form inputs
      }
      getCategories();
    } catch (error) {
      console.log(error);
      toast.error('Add Category Failed');
    }
    handleCloseModal();
  };

  return (
    <>
      {/* /////////////// Add/Update confirmation modal ////////////////// */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className="border-bottom ">
          <span className="fw-bold fs-4">
            {isUpdateModal ? 'Update Category' : 'Add Category'}
          </span>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3 p-1">
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control no-outline"
                  placeholder="Category Name"
                  aria-label="name"
                  aria-describedby="basic-addon1"
                  {...register('name', {
                    required: GetRequiredMessage('Category'),
                  })}
                />
              </div>
              {errors.name && (
                <span className="text-danger ">{errors.name.message}</span>
              )}
            </div>

            <div className=" text-end ">
              <button
                className="btn btn-success  mt-3 fw-bold text-end px-5 py-2"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isUpdateModal
                    ? 'Updateing ...'
                    : 'Adding ...'
                  : 'Save'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <DeleteConfirmation
        deleteItem={'Catagory'}
        deleteFun={deleteCatagory}
        show={showDelete}
        handleClose={handleClose}
      />

      <div>
        <Header
          name={`Categories`}
          title={' item'}
          description={
            'You can now add your items that any user can order it from the Application and you can edit'
          }
        />
      </div>

      <div className="d-flex justify-content-between align-items-center my-4">
        <div>
          <span className="fw-semibold d-block fs-5 ">
            Categories Table Details
          </span>
          <span className="d-block text-black-50 fs-6">
            You can check all details
          </span>
        </div>
        <div>
          <button
            className="btn btn-success px-4"
            onClick={() => handleShowModal()}
          >
            Add New Category
          </button>
        </div>
      </div>

      <div>
        {categoriesList.length > 0 ? (
          <table className="table rounded-3 overflow-hidden ">
            <thead className="table-secondary  rounded-2 overflow-hidden">
              <tr>
                <th scope="col  " className="py-4 border-0  fs-5">
                  Name
                </th>
                <th scope="col " className="py-4 border-0  fs-5">
                  creationDate
                </th>
                <th scope="col " className="py-4 border-0  fs-5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((category, index) => (
                <tr key={index}>
                  <td>{category.name}</td>
                  <td>{category.creationDate || 'From Close'}</td>

                  <td className="">
                    <button
                      className=" text-success bg-white border-0"
                      onClick={() => handleShow(category.id)}
                    >
                      <i className="fa-solid fa-trash "></i>
                    </button>
                    <button
                      className=" text-success bg-white border-0"
                      onClick={() => handleShowModal(category)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
