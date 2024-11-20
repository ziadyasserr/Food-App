// import React from 'react'

import { useEffect, useState } from 'react';
import defaultimg from '../../../../assets/images/header-man.png';
import {
  axiosInstance,
  IMAGE_URL,
  RECIPE_URLS,
} from '../../../../services/urls/urls';
import Header from '../../../shared/components/Header/Header';

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);

  let getRecipes = async () => {
    try {
      let response = await axiosInstance.get(RECIPE_URLS.GET_RECIPES, {
        params: { pageSize: 10, pageNumber: 1 },
      });
      console.log(response.data.data);
      setRecipesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
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
          <button className="btn btn-success px-5">Add New Item</button>
        </div>
      </div>

      <div>
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
                        ? `${IMAGE_URL.IMAGE_URL}/${recipe.imagePath}`
                        : defaultimg
                    }
                    alt={recipe.name}
                    className="img-contain"
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
                  <button className=" text-success bg-white border-0">
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
