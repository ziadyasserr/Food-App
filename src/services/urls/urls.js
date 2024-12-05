import axios from 'axios';

export const IMAGE_URL = `https://upskilling-egypt.com:3006`;
export const baseURL = 'https://upskilling-egypt.com:3006/api/v1';
export const axiosInstance = axios.create({
  //   baseURL: baseURL  (another solution)
  baseURL,
  headers: { Authorization: localStorage.getItem('token') },
});

// USERS_URLS
export const USERS_URLS = {
  LOGIN: `/Users/Login`,
  RESET_REQUEST: `/Users/Reset/Request`,
  RESET: '/Users/Reset',
  GET_USERS: `/Users/`,
  REGISTER: `/Users/Register`,
  VERIFY: `/Users/verify`,
  CHANGE_PASSWORD: `/Users/ChangePassword`,
  DELETE_USER: (id) => `/Users/${id}`,
};

// CATEGORY_URLS
export const CATEGORY_URLS = {
  GET_CATEGORIES: `/Category/`,
  POST_CATEGORY: `/Category/`,
  DELETE_CATEGORY: (id) => `/Category/${id}`,
  UPDATE_CATEGORY: (id) => `/Category/${id}`,
};

// RECIPES_URLS
export const RECIPE_URLS = {
  GET_RECIPES: `/Recipe/`,
  CREATE_RECIPES: `/Recipe/`,
  GET_RECIPE: (recipeId) => `/Recipe/${recipeId}`,
  DELETE_RECIPE: (id) => `/Recipe/${id}`,
  UPDATE_RECIPE: (id) => `/Recipe/${id}`,
};
// FAVORITES_URLS
export const FAVORITES_URLS = {
  GET_FAVORITES: `/userRecipe/`,
  ADD_TO_FAVORITES: `/userRecipe/`,
  DELETE_FAVORITES: (id) => `/userRecipe/${id}`,
  
};
// TAGS_URLS
export const TAGS_URLS = {
  GET_TAGS: `/tag/`,
};
