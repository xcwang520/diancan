import axios from 'axios';
import qs from 'qs';

let base = '/bd';

export const regist = params => { return axios.post(`${base}/users/regist`, qs.stringify(params)).then(res => res.data); };

export const getDepartments = params => { return axios.get(`${base}/users/departments`, qs.stringify(params)).then(res => res.data); };

export const login = params => { return axios.post(`${base}/users/login`, qs.stringify(params)).then(res => res.data); };

export const getDishes = params => { return axios.get(`${base}/dishes/queryList`, qs.stringify(params)).then(res => res.data); };





export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
