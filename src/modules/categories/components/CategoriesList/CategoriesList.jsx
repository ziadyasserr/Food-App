// import React from 'react'

import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
// import headerImg from '../../../../assets/images/header.png';
import nodata from '../../../../assets/images/nodata.png';
import { axiosInstance, CATEGORY_URLS } from '../../../../services/urls/urls';
import Header from '../../../shared/components/Header/Header';

export default function CategoriesList() {
  const [categoryId, setCategoryId] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCategoryId(id);
    setShow(true);
  };
  const [categoriesList, setCategoriesList] = useState([]);
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
      toast.error('delete faild');
    }
    handleClose();
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div>
        <Header
          title={'categories item'}
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
          <button className="btn btn-success px-4">Add New Category</button>
        </div>
      </div>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="text-center">
            <img src={nodata} alt="nodata" className="img-fluid" />
            <h4>Delete This Item ?</h4>
            <span className="d-block text-muted">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </span>
          </Modal.Body>
          <Modal.Footer>
            <button
              className=" text-capitalize border-danger text-danger bg-white fw-bold p-2 rounded-3"
              onClick={deleteCatagory}
            >
              delete this item
            </button>
          </Modal.Footer>
        </Modal>
      </div>

      <div>
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
                <td>{category.creationDate || "From Close"}</td>

                <td className="">
                  <button
                    className=" text-success bg-white border-0"
                    onClick={() => handleShow(category.id)}
                  >
                    <i className="fa-solid fa-trash "></i>
                  </button>
                  <button className=" text-success bg-white border-0">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}



