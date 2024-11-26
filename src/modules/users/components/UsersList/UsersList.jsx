// import React from 'react'

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import defaultimg from '../../../../assets/images/header-man.png';
import {
  axiosInstance,
  IMAGE_URL,
  USERS_URLS,
} from '../../../../services/urls/urls';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import Header from '../../../shared/components/Header/Header';
import NoData from '../../../shared/components/NoData/NoData';

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [arrayOfPageNumber, setArrayOfPageNumber] = useState([]);

  let getUsers = async (pageNumber, pageSize) => {
    try {
      let response = await axiosInstance.get(USERS_URLS.GET_USERS, {
        params: { pageSize: pageSize, pageNumber: pageNumber },
      });
      console.log(response);
      setUsersList(response.data.data);
      setArrayOfPageNumber(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1),
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers(1, 50);
  }, []);

  //delete confirmation
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUserId(id);
    setShow(true);
  };

  let deleteUser = async () => {
    try {
      let response = await axiosInstance.delete(USERS_URLS.DELETE_USER(userId));
      toast.success(response?.data?.message || 'delete Sucessfully');
      getUsers();
    } catch (error) {
      console.log(error);
      toast.error('delete faild');
    }
    handleClose();
  };

  return (
    <>
      <DeleteConfirmation
        deleteItem={'User'}
        deleteFun={deleteUser}
        show={show}
        handleClose={handleClose}
      />
      <div>
        <Header
          title={'Users List '}
          description={
            'You can now add your items that any user can order it from the Application and you can edit'
          }
        />
      </div>
      <div className=" my-4">
        <div>
          <span className="fw-semibold d-block fs-5 ">
            Recipe Table Details
          </span>
          <span className="d-block text-black-50 fs-6">
            You can check all details
          </span>
        </div>
      </div>

      <div>
        {usersList.length > 0 ? (
          <table className="table rounded-3 overflow-hidden ">
            <thead className="table-secondary  rounded-2 overflow-hidden">
              <tr>
                <th scope="col  " className="py-4 border-0  fs-5   ">
                  Name
                </th>
                <th scope="col " className="py-4 border-0   fs-5  ">
                  Image
                </th>
                {/* <th scope="col " className="py-4 border-0   fs-5  ">
                  Price
                </th> */}
                <th scope="col " className="py-4 border-0   fs-5  ">
                  Email
                </th>
                <th scope="col " className="py-4 border-0   fs-5  ">
                  Country
                </th>
                <th scope="col " className="py-4 border-0  fs-5   ">
                  PhoneNumber
                </th>
                <th scope="col " className="py-4 border-0  fs-5   ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user.id}>
                  <td>{user.userName}</td>
                  <td>
                    <img
                      src={
                        user.imagePath
                          ? `${IMAGE_URL}/${user.imagePath}`
                          : defaultimg
                      }
                      alt={user.name}
                      // className="img-fluid"
                      style={{
                        width: '45px',
                        height: '45px',
                        objectFit: 'cover',
                      }}
                    />
                  </td>
                  {/* <td>{user.price || 'No added'}</td> */}
                  <td>{user?.email}</td>
                  <td>{user.country || 'NO country'}</td>
                  <td>{user.phoneNumber || 'No added'}</td>
                  <td>
                    <button
                      className=" text-success bg-white border-0"
                      onClick={() => handleShow(user.id)}
                    >
                      <i className="fa-solid fa-trash "></i>
                    </button>
                    <button className=" text-success bg-white border-0">
                      <i className="fa fa-trash "></i>
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

      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            {arrayOfPageNumber.map((pageNumber) => (
              <li
                className="page-item"
                key={pageNumber}
                onClick={() => getUsers(pageNumber, 50)}
              >
                <a className="page-link" href="#">
                  {pageNumber}
                </a>
              </li>
            ))}

            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
