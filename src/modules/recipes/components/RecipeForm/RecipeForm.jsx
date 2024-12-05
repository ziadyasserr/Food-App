// import React from 'react'

import { Children, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  axiosInstance,
  CATEGORY_URLS,
  RECIPE_URLS,
  TAGS_URLS,
} from '../../../../services/urls/urls';
import { GetRequiredMessage } from '../../../../services/validation/validation';

import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import beforeUnload from '../../../../hooks/beforeUnload';

export default function RecipeForm() {
  beforeUnload();
  const { loginData } = useContext(AuthContext);

  const params = useParams();
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);

  // let isNewRecipe = params.recipeId !== 'new-recipe';
  let isNewRecipe = params.recipeId;

  useEffect(() => {
    if (loginData) {
      if (loginData?.userGroup == 'SuperAdmin') Children;
      else navigate('/login');
    }
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
        console.log('cat', response.data.data);

        setCategory(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    (async () => {
      await getTags();
      await getCategories();

      if (params.recipeId) {
        const getRecipeById = async () => {
          const response = await axiosInstance.get(
            RECIPE_URLS.GET_RECIPE(params.recipeId),
          );
          //   console.log('zzzzzzzz', response);
          setValue('name', response?.data.name);
          setValue('tagId', response?.data.tag.id);
          setValue('categoriesIds', response?.data.category[0].id);
          setValue('price', response?.data.price);
          setValue('description', response?.data.description);
        };

        getRecipeById();
      }
    })();
  }, [isNewRecipe, params.recipeId, setValue]);

  let onSubmit = async (data) => {
    let formData = new FormData();
    formData.append('name', data?.name);
    formData.append('description', data?.description);
    formData.append('price', data?.price);
    formData.append('tagId', data?.tagId);
    formData.append('categoriesIds', data?.categoriesIds);
    formData.append('recipeImage', data?.recipeImage[0]);

    try {
      let response = await axiosInstance[isNewRecipe ? 'put' : 'post'](
        isNewRecipe
          ? RECIPE_URLS.UPDATE_RECIPE(params.recipeId)
          : RECIPE_URLS.CREATE_RECIPES,

        formData,
      );
      isNewRecipe
        ? toast.success(response.data.message || 'Update successfully')
        : toast.success(response.data.message || 'create successfully');
      navigate('/dashboard/recipes');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mt-3">
      <header className=" header-form row justify-content-between align-items-center ">
        <div className="col-12 col-md-10">
          <h3>
            Fill the <span className="text-success">Recipes</span> !
          </h3>
          <span className="d-block text-header">
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </span>
        </div>
        <div className="col-12 col-md-2 mt-4 mt-md-0">
          <Link
            to="/dashboard/recipes"
            className="btn btn-success px-md-4 py-md-2"
          >
            All Recipes
            <FaArrowRight />
          </Link>
        </div>
      </header>
      <section className="m-md-5 ">
        <form
          className="flex-column d-flex gap-4 p-0 px-md-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Recipe Name"
              {...register('name', { required: GetRequiredMessage('Name') })}
            />
            {errors.name && (
              <span className="text-danger ">{errors.name.message}</span>
            )}
          </div>
          <div className="form-group">
            <select
              className="form-control"
              {...register('tagId', { required: GetRequiredMessage('Tag') })}
            >
              <option value="">Tag</option>
              {tags.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            {errors?.tagId && (
              <span className="text-danger">{errors?.tagId?.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              {...register('price', { required: GetRequiredMessage('price') })}
            />
            {errors?.price && (
              <span className="text-danger">{errors?.price?.message}</span>
            )}
          </div>
          <div className="form-group">
            <select
              className="form-control"
              {...register('categoriesIds', {
                required: GetRequiredMessage('categories'),
              })}
            >
              <option value="">Category</option>
              {category.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            {errors?.categoriesIds && (
              <span className="text-danger">
                {errors?.categoriesIds?.message}
              </span>
            )}
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="description"
              rows="3"
              {...register('description', {
                required: GetRequiredMessage('description'),
              })}
            ></textarea>
            {errors?.description && (
              <span className="text-danger">
                {errors?.description?.message}
              </span>
            )}
          </div>
          <input
            type="file"
            className="form-control"
            //   placeholder="Price"
            {...register('recipeImage')}
          />
          <div>
            <button disabled={isSubmitting} className="btn btn-success">
              {isSubmitting ? 'Saveing ...' : 'Save'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
