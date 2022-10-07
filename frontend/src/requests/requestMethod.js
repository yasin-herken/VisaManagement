import axios from "axios";

const BASE_URL = "http://localhost:8001/";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user)
const TOKEN = currentUser?.token
export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { authorization: TOKEN }
})