// import React from 'react'

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import defaultimg from '../../../../assets/images/header-man.png';
import {
  axiosInstance,
  CATEGORY_URLS,
  IMAGE_URL,
  RECIPE_URLS,
  TAGS_URLS,
} from '../../../../services/urls/urls';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import Header from '../../../shared/components/Header/Header';
import NoData from '../../../shared/components/NoData/NoData';

export default function RecipesList() {
  //search input
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [nameValue, setNameValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');

  useEffect(() => {
    const getTags = async () => {
      try {
        let response = await axiosInstance.get(TAGS_URLS.GET_TAGS);
        console.log(response);

        setTags(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getCategories = async () => {
      try {
        let response = await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES);
        // console.log('cat', response.data.data);

        setCategory(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTags();
    getCategories();
  }, []);

  let getNameValue = (input) => {
    setNameValue(input.target.value);
    getRecipes(1, 3, input.target.value, tagValue, categoryValue);
  };
  let getTagValue = (input) => {
    setTagValue(input.target.value);
    getRecipes(1, 3, nameValue, input.target.value, categoryValue);
  };
  let getCategoryValue = (input) => {
    setCategoryValue(input.target.value);
    getRecipes(1, 3, nameValue, tagValue, input.target.value);
  };
  //search input

  const [recipeId, setRecipeId] = useState(null);

  const [show, setShow] = useState(false);
  const handleShow = (id) => {
    setRecipeId(id);
    setShow(true);
  };

  const handleClose = () => setShow(false);
  const [recipesList, setRecipesList] = useState([]);
  const [arrayOfPageNumber, setArrayOfPageNumber] = useState([]);

  let getRecipes = async (pageNumber, pageSize, name, tagId, categoryId) => {
    try {
      let response = await axiosInstance.get(RECIPE_URLS.GET_RECIPES, {
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber,
          name: name,
          tagId: tagId,
          categoryId: categoryId,
        },
      });
      // console.log('pageeeeeeeeeeeeee', response);
      console.log(response.data.data);
      setRecipesList(response.data.data);
      setArrayOfPageNumber(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1), //(_)is a placeholder for the value of each element (not used here because all elements are undefined)//(i) is the index of the element.
      );
      // setArrayOfPageNumber(response.data.totalNumberOfPages);
    } catch (error) {
      console.log(error);
    }
  };

  let deleteRecipe = async () => {
    try {
      await axiosInstance.delete(
        RECIPE_URLS.DELETE_RECIPE(recipeId),
        // `${CATEGORY_URLS.DELETE_CATEGORY}/${categoryId}`,
      );
      toast.success('delete success');
      getRecipes();
    } catch (error) {
      console.log(error);
      toast.error('delete faild');
    }
    handleClose();
  };

  useEffect(() => {
    getRecipes(1, 3);
  }, []);

  return (
    <>
      <DeleteConfirmation
        deleteItem={'Recipe'}
        deleteFun={deleteRecipe}
        show={show}
        handleClose={handleClose}
      />
      <div>
        <Header
          title={'Recipes Items'}
          description={
            'You can now add your items that any user can order it from the Application and you can edit'
          }
        />
      </div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div>
          <span className="fw-semibold d-block fs-5 ">
            Recipe Table Details
          </span>
          <span className="d-block text-black-50 fs-6">
            You can check all details
          </span>
        </div>
        <div>
          <Link
            to="/dashboard/recipes/new-recipe"
            className="btn btn-success px-5"
          >
            Add New Item
          </Link>
        </div>
      </div>

      <div className="my-4">
        <div className="row ">
          <div className="col-12 col-md-8">
            <div className="form-control-with-icon">
              <i className="fas fa-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search here..."
                onChange={getNameValue}
              />
            </div>
          </div>
          <div className="col-6 col-md-2">
            <select className="form-select" onChange={getTagValue}>
              <option selected>Tag</option>
              {tags.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-2">
            <select className="form-select" onChange={getCategoryValue}>
              <option selected>Category</option>
              {category.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        {recipesList.length > 0 ? (
          <table className="table rounded-3 overflow-hidden ">
            <thead className="table-secondary  rounded-2 overflow-hidden">
              <tr>
                <th scope="col  " className="py-4 border-0  fs-5   ">
                  Item Name
                </th>
                <th scope="col " className="py-4 border-0   fs-5  ">
                  Image
                </th>
                <th scope="col " className="py-4 border-0   fs-5  ">
                  Price
                </th>
                <th scope="col " className="py-4 border-0   fs-5  ">
                  Description
                </th>
                <th scope="col " className="py-4 border-0   fs-5  ">
                  Tag
                </th>
                <th scope="col " className="py-4 border-0  fs-5   ">
                  Category
                </th>
                <th scope="col " className="py-4 border-0  fs-5   ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recipesList.map((recipe, index) => (
                <tr key={index}>
                  <td>{recipe.name}</td>
                  <td>
                    <img
                      src={
                        recipe.imagePath
                          ? `${IMAGE_URL}/${recipe.imagePath}`
                          : defaultimg
                      }
                      alt={recipe.name}
                      // className="img-fluid"
                      style={{
                        width: '45px',
                        height: '45px',
                        objectFit: 'cover',
                      }}
                    />
                  </td>
                  <td>{recipe.price || '120'}</td>
                  <td>{recipe.description || 'It is Main dish'}</td>
                  <td>{recipe.tag?.name || 'NO Tag'}</td>
                  <td>{recipe.category?.[0]?.name || 'No category'}</td>
                  <td>
                    <button
                      className=" text-success bg-white border-0"
                      onClick={() => handleShow(recipe.id)}
                    >
                      <i className="fa-solid fa-trash "></i>
                    </button>
                    <Link
                      to={`/dashboard/recipes/${recipe.id}`}
                      className=" text-success bg-white border-0"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
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
            {arrayOfPageNumber.map((pageNumberr) => (
              <li
                className="page-item"
                key={pageNumberr}
                onClick={() => getRecipes(pageNumberr, 3)}
              >
                <a className="page-link" href="#">
                  {pageNumberr}
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
