import axios from 'axios';

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
  DELETE_CATEGORY: (id) => `/Category/${id}`,
};

// RECIPES_URLS
export const RECIPE_URLS = {
  GET_RECIPES: `/Recipe/`,
};

// IMAGE IN API

export const IMAGE_URL = {
  IMAGE_URL: `https://upskilling-egypt.com:3006`,
};
