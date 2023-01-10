import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { PORT, HOST } from '../../Variables/host.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login } from '../Features/userSlice.js';
function Login() {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
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
            if (user.data.success && user.data.role === "All") {
                dispatch(login({
                    id: user.data.id,
                    username: user.data.username,
                    role: user.data.role,
                    token: user.data.token,
                    country: user.data.country,
                    admin: user.data.admin,
                    loggedIn: true
                }));
            } else if (user.data.success && user.data.role === "Admin") {
                dispatch(login({
                    id: user.data.id,
                    username: user.data.username,
                    role: user.data.role,
                    token: user.data.token,
                    country: user.data.country,
                    loggedIn: true,
                    admin: user.data.admin,
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
        if (user?.role === "Admin" || user?.role === "All") {
            getUserPage();
        }
    }, [user,redirect])
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
                                                onChange={(e) => { setLoginUsername(e.target.value) }}
                                            />
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
                                                onChange={(e) => { setLoginPassword(e.target.value); }}
                                            />
                                        </div>
                                        <div className="text-center mt-3">
                                            <button type="submit" className="btn btn-lg btn-primary" onClick={loginPage}>Sign in</button>
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