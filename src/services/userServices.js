import config from './config.json';
import http from './httpService';
import qs from 'qs';
import axios from 'axios';
import Cookies from 'js-cookie';

export const userRegister = (user) => {
  return http.post(`${config.baseUrl}/api/user/create/`, JSON.stringify(user));
};

export const fillProfile = (user, phoneNumber) => {
  return http.post(
    `${config.baseUrl}/api/user/update/${phoneNumber}/`,
    JSON.stringify(user)
  );
};

export const userLogin = (data) => {
  // const { phoneNumber, password } = data;
  const user = {
    username: data.phoneNumber,
    password: data.password,
  };
  console.log(Cookies.get('csrftoken'));
  return http.post(`${config.baseUrl}/api/login/`, JSON.stringify(user), {
    headers: {
      'X-CSRFTOKEN': Cookies.get('csrftoken'),
    },
  });
};

export const resendCode = () => {
  // console.log(phoneNumber);
  const phoneNumber = localStorage.getItem('phoneNumber');
  return http.post(`${config.baseUrl}/api/user/code/again/${phoneNumber}/`);
};

export const forgotPassword = (phoneNumber) => {
  return http.post(
    `${config.baseUrl}/api/user/change/password/${phoneNumber}/`
  );
};

export const getAllUserData = (phoneNumber) => {
  return http.get(`${config.baseUrl}/api/user/info/${phoneNumber}/`);
};

export const changePassword = (phoneNumber, password) => {
  const danial = 'fdgfdhj67867sdfsf2343nh';

  return http.post(
    `${config.baseUrl}/api/user/change/password/${phoneNumber}/`,
    JSON.stringify({ password, danial })
  );
};

export const logout = () => {
  return http.post(`${config.baseUrl}/api/logout/`, null, {
    headers: Cookies.get('csrftoken'),
  });
};

export const changePasswordFromPanel = (value) => {
  const { password, danial } = value;
  return http.post(
    `${config.baseUrl}/user/change/password/${value.phoneNumber}`,
    JSON.stringify({ password, danial })
  );
};
