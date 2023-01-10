import axios from "axios";
const BASE_URL = "https://stvisaglobal.com:8001";
// const BASE_URL = "http://localhost:8001";
export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = (TOKEN) =>
    axios.create({
        baseURL: BASE_URL,
        headers: {
            authorization: TOKEN
        }
    });