import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login() {
    const [loginUsername,setLoginUsername] = useState("")
    const [loginPassword,setLoginPassword] = useState("")
    const [role,setRole] = useState("")
    const navigate = useNavigate()
    const loginPage = async (event) => {
        event.preventDefault()
        await axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:8000/login"
        }).then((res)=>{
            navigate(res.data.direct)
            setRole(res.data.role)
        })
        .catch((err)=>{console.log("login Page")})
    }
    const getUserPage =  async(event) => {
        if(event && event.preventDefault)
            event.preventDefault()
        await axios({
            method: "GET",
            withCredentials: true,
            url : "http://localhost:8000/getUser"
        }).then(res=>{
            if(res.data.role==="Admin")
                navigate("/admin")
            else if(res.data.role==="Client")
                navigate("/")
    }
    ).catch(err=>console.log("Error in index js"));
    }
    useEffect(()=>{
        getUserPage()
    })
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