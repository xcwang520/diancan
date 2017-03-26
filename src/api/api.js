import axios from 'axios';
import qs from 'qs';

let base = '';

export const regist = params => { return axios.post(`${base}/users/regist`, qs.stringify(params)).then(res => res.data); };

export const getDepartments = params => { return axios.get(`${base}/users/departments`, qs.stringify(params)).then(res => res.data); };

export const login = params => { return axios.post(`${base}/users/login`, qs.stringify(params)).then(res => res.data); };

export const updatePassword = params => { return axios.post(`${base}/users/updatePassword`, qs.stringify(params)).then(res => res.data); };

export const getDishes = params => { return axios.post(`${base}/dishes/queryList`, qs.stringify(params)).then(res => res.data); };

export const addDish = params => { return axios.post(`${base}/dishes/add`, qs.stringify(params)).then(res => res.data); };

export const updateDish = params => { return axios.post(`${base}/dishes/updateStatus`, qs.stringify(params)).then(res => res.data); };

export const addOrder = params => { return axios.post(`${base}/order/add`, qs.stringify(params)).then(res => res.data); };

export const deleteOrder = params => { return axios.post(`${base}/order/deleteByUser`, qs.stringify(params)).then(res => res.data); };

export const findOrder = params => { return axios.post(`${base}/order/find`, qs.stringify(params)).then(res => res.data); };

export const findToday = params => { return axios.post(`${base}/order/findToday`, qs.stringify(params)).then(res => res.data); };

export const findDishesCount = params => { return axios.post(`${base}/order/findDishesCount`, qs.stringify(params)).then(res => res.data); };

export const addTop = params => { return axios.post(`${base}/dishes/addTop`, qs.stringify(params)).then(res => res.data); };

export const addStep = params => { return axios.post(`${base}/dishes/addStep`, qs.stringify(params)).then(res => res.data); };
