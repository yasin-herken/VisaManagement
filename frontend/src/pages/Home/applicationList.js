import React, { useEffect, useState } from 'react';
import "flatpickr/dist/themes/material_green.css";
import { userRequest } from "../../requests/requestMethod.js";
import { useSelector } from 'react-redux';
import { selectUser } from '../Features/userSlice';
import PrimeTable from './primeTable.js';

function ApplicationList() {
    const [posts, setPosts] = useState([]);


    const user = useSelector(selectUser);
    useEffect(() => {
        const loadPosts = async () => {
            try{
                const response = await userRequest(user.token.split(" ")[1]).get("/barcode");
                setPosts(response.data);
            }catch(err){
                console.log(err)
            }
            
        }
        loadPosts();
    }, [user.token])
    useEffect(() => {
    }, [posts])
    return (
        <div className='container-fluid p-0'>
            <div className='row'>
                <div className='col-12 col-lg-12'>
                    <PrimeTable/>
                </div>
            </div>
        </div>
    )
}

export default ApplicationList