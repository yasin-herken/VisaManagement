import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { HOST, PORT } from '../../Variables/host.js';
// import { useDispatch } from 'react-redux';
// import { login } from '../Features/userSlice.js';
function Register() {
    // const [registerUsername, setRegisterUsername] = useState("")
    // const [registerPassword, setRegisterPassword] = useState("")
    // const [registerEmail, setRegisterEmail] = useState("")
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const registerPage = async (event) => {
    //     event.preventDefault()
    //     await axios({
    //         method: "POST",
    //         data: {
    //             username: registerUsername,
    //             password: registerPassword,
    //             email: registerEmail,
    //             role: "Admin"
    //         },
    //         withCredentials: false,
    //         url: HOST.url + ":" + PORT.port + "/register"
    //     }).then((res) => {
    //         if (res.data.success) {
    //             dispatch(login({
    //                 username: res.data.user.username,
    //                 role: res.data.user.role,
    //                 token: res.data.user.token,
    //                 country: res.data.user.country,
    //                 loggedIn: true
    //             }));
    //             navigate("/");
    //         }
    //     })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }
    return (
        <main className="d-flex w-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">

                            <div className="text-center mt-4">
                                <h1 className="h2">Get started</h1>
                                <p className="lead">
                                    Start creating the best possible user experience for you customers.
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
                                                placeholder="Enter your name"
                                                // onChange={(e) => { setRegisterUsername(e.target.value) }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input
                                                className="form-control form-control-lg"
                                                type="password"
                                                placeholder="Enter your password"
                                                // onChange={(e) => { setRegisterPassword(e.target.value) }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input
                                                className="form-control form-control-lg"
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                // onChange={(e) => { setRegisterEmail(e.target.value) }}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <span>Already have an account?</span>
                                            <a href="/login"> Log in {">"}</a>
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

export default Register;