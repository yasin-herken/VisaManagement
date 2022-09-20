import React, { useEffect, useState, useRef } from 'react';
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import "flatpickr/dist/themes/material_green.css";
import { userRequest } from "../../requests/requestMethod.js";
import { useSelector } from 'react-redux';
import { selectUser } from '../Features/userSlice';
import PrimeTable from './primeTable.js';

function ApplicationList() {
    const [identification, setIdentification] = useState("");
    const [username, setUsername] = useState("");
    const [lastname, setLastname] = useState("");
    const [place, setPlace] = useState("");
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const [errIdentification, setErrIdentification] = useState(false);
    const [data, setData] = useState("");
    const qrRef = useRef(null);
    const [posts, setPosts] = useState([]);


    const user = useSelector(selectUser);
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: "",
            lastname: "",
            dateofBirthday: "",
            validUpTo: "",
            gender: "",
            place: ""
        }
    });
    const onGenerateFile = async () => {
        try {
            const res = await userRequest(user.token.split(" ")[1]).post("/barcode", {
                identification: identification,
                username: username,
                lastname: lastname,
                dateOfBirthday: date,
                status: "pending",
                placeOfBirthday: place,
                gender: gender,
                barcodeValue: "1",
            });
            if (res?.data.success) {
                //reset();
                setErrIdentification(false);

            } else if (res?.data.error.code === 11000) {
                setErrIdentification(true);
            }
        } catch (err) {
            console.log(err);
        }
        // reset();
    };

    const onScanFile = () => {
        qrRef.current?.openImageDialog();
    }
    const onSearchFile = (event) => {
        console.log(event.target.value)
    }
    useEffect(() => {
        const loadPosts = async () => {
            const response = await userRequest(user.token.split(" ")[1]).get("/barcode");
            setPosts(response.data);
        }
        loadPosts();
    }, [user.token, posts])
    useEffect(() => {
    }, [])
    return (
        <div className='container-fluid p-0'>
            <div className='row'>
                <div className='col-12 col-lg-12'>
                    <PrimeTable sum={0} />
                </div>
            </div>
        </div>
    )
}

export default ApplicationList