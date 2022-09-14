import axios from "axios";

const BASE_URL = "http://www.stvisaglobal.com:8001/";

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = (TOKEN)=> 
    axios.create({
        baseURL: BASE_URL,
        headers: {authorization: `Bearer ${TOKEN}`}
    })
;