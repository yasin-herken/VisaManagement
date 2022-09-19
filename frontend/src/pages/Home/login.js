import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { PORT, HOST } from '../../Variables/host.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login } from '../Features/userSlice.js';
import userSchema from '../../Validations/userValidation.js';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {Form} from 'react-bootstrap';
function Login() {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userSchema),
    });
    const loginPage = async (event) => {
        if (event && event.preventDefault) {
            event.preventDefault()
            event.stopPropagation()
        }
        await axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: false,
            url: HOST.url + ":" + PORT.port + "/login"
        }).then(user => {
            if (user.data.success && user.data.role === "Admin") {
                dispatch(login({
                    username: user.data.username,
                    role: user.data.role,
                    token: user.data.token,
                    loggedIn: true
                }));
            } else if (user.data.success && user.data.role === "Client") {
                dispatch(login({
                    username: user.data.username,
                    role: user.data.role,
                    token: user.data.token,
                    loggedIn: true
                }));
            }
        })
            .catch((err) => { console.log("error in login page", err) })

    }
    const redirect = useCallback(
        (props) => {
            navigate(props, { replace: true })
        },
        [navigate]
    );
    useEffect(() => {
        const getUserPage = async () => {
            redirect("/")
        }
        if (user?.role === "Admin") {
            getUserPage();
        }
    }, [user, redirect])
    useEffect(()=>{
        console.log(errors)
    },[errors])
    return (
        <main className="d-flex w-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">

                            <div className="text-center mt-4">
                                <h1 className="h2">Welcome!</h1>
                                <p className="lead">
                                    Sign in to your account to continue
                                </p>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <input
                                                className="form-control form-control-lg"
                                                type="text"
                                                placeholder="Enter your username" 
                                                name="username"
                                                value={loginUsername}
                                                {...register("username")}
                                                onChange={(e) => { setLoginUsername(e.target.value) }}
                                            />
                                            {errors.username && (
                                                <Form.Text className="text-danger" style={{fontSize: "1rem"}}>
                                                    {errors.username.message}
                                                </Form.Text>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input
                                                className="form-control form-control-lg"
                                                type="password"
                                                placeholder="Enter your password"
                                                value={loginPassword}
                                                onKeyPress={event => {
                                                    if (event.key === 'Enter') {
                                                        loginPage();
                                                    }
                                                }}
                                                name="password"
                                                {...register("password")}
                                                onChange={(e) => { setLoginPassword(e.target.value); }}
                                            />
                                            {errors.password && (
                                                <Form.Text className="text-danger" style={{fontSize: "1rem"}}>
                                                    {errors.password.message}
                                                </Form.Text>
                                            )}
                                            <small style={{display:"block"}}>
                                                <a href="index.html">Forgot password?</a>
                                            </small>
                                        </div>
                                        <div>
                                            <label className="form-check">
                                                <input className="form-check-input" type="checkbox" />
                                                <span className="form-check-label">
                                                    Remember me next time
                                                </span>
                                            </label>
                                        </div>
                                        <div className="text-center mt-3">
                                            <button type="submit" className="btn btn-lg btn-primary" onClick={handleSubmit(loginPage)}>Sign in</button>
                                        </div>
                                        <div className="text-center">
                                            <span>Don't you have an account </span>
                                            <a href='/register'>Register {">"}</a>
                                        </div>
                                        <div className='text-center'>
                                            {
                                                <p style={{ backgroundColor: 'red' }}></p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login;