import axios from 'axios';

import Swal from 'sweetalert2';
//export const backendUrl = "http://localhost:4000/";
//export const backendUrl = "http://192.168.1.2:4000/";
export const backendUrl = 'https://mightyeagle-be.herokuapp.com';

const AUTH_TOKEN = localStorage.getItem('token') || '';

export const httpService = axios.create({
  baseURL: backendUrl,
  timeout: 10000,
  withCredentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response;
    if (response) {
      if (
        response.status === 401 &&
        response.data.message === 'Incorrect Email or Password'
      ) {
        Swal.fire({ icon: 'error', text: response.data.message });
      } else if (
        response.status === 401 &&
        (response.data.message === 'invalid token' ||
          response.data.message === 'invalid algorithm' ||
          response.data.message === 'jwt must be provided' ||
          response.data.message === 'jwt expired')
      ) {
        Swal.fire({
          icon: 'warning',
          text: 'Unavailable to validate token.',
        }).then(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('loggedInUser');
          window.location.assign('/login');
        });
      } else if (response.status === 403) {
        Swal.fire({
          icon: 'warning',
          titleText: 'Access Denied',
          text: response.data.message,
        });
      } else if (response.status === 409) {
        Swal.fire({
          icon: 'error',
          titleText: "Can't create",
          text: 'Duplicate data found.',
        });
      }
    }
  }
);

export const loggedInUser =
  JSON.parse(localStorage.getItem('loggedInUser')) || null;

class DataService {
  loggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser')) || null;
  }
  async logout() {
    Swal.fire({
      icon: 'info',
      html: `<div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
  </div>`,
      showConfirmButton: false,
      title: 'Logging out',
    });
    const path = 'auth/logout';
    await httpService
      .post(path, {})
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
      })
      .then(() => window.location.assign('/'));
  }
}

export const dataService = new DataService();
