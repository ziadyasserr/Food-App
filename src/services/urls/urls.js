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
  DELETE_RECIPE: (id) => `/Recipe/${id}`,
};
