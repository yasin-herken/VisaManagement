import React ,{useEffect, useState ,useCallback} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {selectUser,login} from '../Features/userSlice.js';
function Login() {
    const [loginUsername,setLoginUsername] = useState("")
    const [loginPassword,setLoginPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    
    const loginPage = async (event) => {
        if(event && event.preventDefault)
        {
            event.preventDefault()
            event.stopPropagation()
        }
        await axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://194.195.241.214:8000/login"
        }).then((res)=>{
            if(res.data.role==="Admin" || res.data.role==="Client")
            {
                dispatch(login({
                    username:  res.data.username,
                    password: res.data.password,
                    role: res.data.role,
                    loggedIn: true
                }))
            }
            navigate(res.data.direct)
        })
        .catch((err)=>{console.log(err)})
        
    }
    const redirect = useCallback(
        () => navigate("/admin", { replace: true }),
        [navigate]
      );
    useEffect(()=>{
        if(user&& user.role){
            if(user.role==="Admin" || user.role==="Client"){
                redirect()
            }
        }
    },[user,redirect])
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
                                            onChange={(e) => {setLoginUsername(e.target.value)}}
                                             />
										</div>
										<div className="mb-3">
											<label className="form-label">Password</label>
											<input 
                                            className="form-control form-control-lg" 
                                            type="password" 
                                            placeholder="Enter your password" 
                                            onChange={(e) => {setLoginPassword(e.target.value)}}
                                            />
											<small>
                                                <a href="index.html">Forgot password?</a>
                                            </small>
										</div>
										<div>
											<label className="form-check">
                                                <input className="form-check-input" type="checkbox"  />
                                                <span className="form-check-label">
                                                Remember me next time
                                                </span>
                                            </label>
										</div>
										<div className="text-center mt-3">
                                            <button type="submit" className="btn btn-lg btn-primary" onClick={loginPage}>Sign in</button>
										</div>
                                        <div className="text-center">
                                            <span>Don't you have an account </span>
                                            <a href='/register'>Register {">"}</a>
                                        </div>
                                        <div className='text-center'>
                                            {
                                                <p style={{backgroundColor: 'red'}}></p>
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