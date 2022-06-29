import React,{ useState , useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Badge } from '@mui/material';
import axios from 'axios';
import Sidebar from './sidebar';
import Footer from './footer';
import useNavigate from 'react-router-dom';

function NewApplication() {
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [role,setRole] = useState("")
    const [login,setLogin] = useState(false)
    const navigate =useNavigate()
    const getUserPage = async (event) => {
        await axios({
            method: "GET",
            withCredentials: true,
            url : "http://localhost:8000/getUser"
        }).then(res=>{
            if(res.data===null || res.data==="")
            {
                setLogin(false)
                navigate("/restrictedPage")
            }
            else{
                setLogin(true)
                setUsername(res.data.username)
                setEmail(res.data.email)
                setRole(res.data.role)
            }
    }
    ).catch(err=>console.log(err));
    }
    useEffect(()=>{
        getUserPage()
    },[username,email,role])
  return (
    <div className="wrapper">
    <Sidebar />

    <div className="main">
        <nav className="navbar navbar-expand navbar-light navbar-bg">
            <a href="/" className="sidebar-toggle js-sidebar-toggle">
             <i className="hamburger align-self-center"></i>
            </a>

            <div className="navbar-collapse collapse">
                <ul className="navbar-nav navbar-align">
                    <li className="nav-item dropdown">
                     <a className="nav-icon dropdown-toggle" href="/" id="alertsDropdown" data-bs-toggle="dropdown">
								<div class="position-relative">
									<Badge>
                                        <NotificationsNoneIcon style={{transform:"scale(1.3)"}} fontSize='large' className='align-middle' />
                                    </Badge>
                                    <span className="indicator">4</span>
								</div>
							</a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="alertsDropdown">
                            <div className="list-group">
                                <a href="/" className="list-group-item">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-2">
                                            <i className="text-danger" data-feather="alert-circle"></i>
                                        </div>
                                        <div className="col-10">
                                            <div className="text-dark">Update completed</div>
                                            <div className="text-muted small mt-1">Restart server 12 to complete the update.</div>
                                            <div className="text-muted small mt-1">30m ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="/" className="list-group-item">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-2">
                                            <i className="text-warning" data-feather="bell"></i>
                                        </div>
                                        <div className="col-10">
                                            <div className="text-dark">Lorem ipsum</div>
                                            <div className="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate hendrerit et.</div>
                                            <div className="text-muted small mt-1">2h ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="/" className="list-group-item">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-2">
                                            <i className="text-primary" data-feather="home"></i>
                                        </div>
                                        <div className="col-10">
                                            <div className="text-dark">Login from 192.186.1.8</div>
                                            <div className="text-muted small mt-1">5h ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="/" className="list-group-item">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-2">
                                            <i className="text-success" data-feather="user-plus"></i>
                                        </div>
                                        <div className="col-10">
                                            <div className="text-dark">New connection</div>
                                            <div className="text-muted small mt-1">Christina accepted your request.</div>
                                            <div className="text-muted small mt-1">14h ago</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="dropdown-menu-footer">
                                <a href="/" className="text-muted">Show all notifications</a>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="/" data-bs-toggle="dropdown">
                            <i className="align-middle" data-feather="settings"></i>
                        </a>

                        <a className="nav-link dropdown-toggle d-sm-inline-block" href="/profile" data-bs-toggle="dropdown" >
                            <Avatar className="align-bottom" alt="" />
                                <span className="text-dark">{username.toUpperCase()}</span>
                         {/* <Avatar className="avatar me-1 " ><span>{username.charAt(0).toUpperCase()}</span></Avatar> */}
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="pages-profile.html"><i className="align-middle me-1" data-feather="user"></i> Profile</a>
                            <a className="dropdown-item" href="/"><i className="align-middle me-1" data-feather="pie-chart"></i> Analytics</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="index.html"><i className="align-middle me-1" data-feather="settings"></i> Settings & Privacy</a>
                            <a className="dropdown-item" href="/"><i className="align-middle me-1" data-feather="help-circle"></i> Help Center</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/">Log out</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>

        <main className="content">
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-xl-6 col-xxl-5 d-flex">
                        <div className="w-100">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Sales</h5>
                                                </div>

                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <i className="align-middle" data-feather="truck"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">2.382</h1>
                                            <div className="mb-0">
                                                <span className="text-danger"> <i className="mdi mdi-arrow-bottom-right"></i> -3.65% </span>
                                                <span className="text-muted">Since last week</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Visitors</h5>
                                                </div>

                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <i className="align-middle" data-feather="users"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">14.212</h1>
                                            <div className="mb-0">
                                                <span className="text-success"> <i className="mdi mdi-arrow-bottom-right"></i> 5.25% </span>
                                                <span className="text-muted">Since last week</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Earnings</h5>
                                                </div>

                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <i className="align-middle" data-feather="dollar-sign"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">$21.300</h1>
                                            <div className="mb-0">
                                                <span className="text-success"> <i className="mdi mdi-arrow-bottom-right"></i> 6.65% </span>
                                                <span className="text-muted">Since last week</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Orders</h5>
                                                </div>

                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <i className="align-middle" data-feather="shopping-cart"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">64</h1>
                                            <div className="mb-0">
                                                <span className="text-danger"> <i className="mdi mdi-arrow-bottom-right"></i> -2.25% </span>
                                                <span className="text-muted">Since last week</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-xxl-7">
                        <div className="card flex-fill w-100">
                            <div className="card-header">

                                <h5 className="card-title mb-0">Recent Movement</h5>
                            </div>
                            <div className="card-body py-3">
                                <div className="chart chart-sm">
                                    <canvas id="chartjs-dashboard-line"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
                        <div className="card flex-fill w-100">
                            <div className="card-header">

                                <h5 className="card-title mb-0">Browser Usage</h5>
                            </div>
                            <div className="card-body d-flex">
                                <div className="align-self-center w-100">
                                    <div className="py-3">
                                        <div className="chart chart-xs">
                                            <canvas id="chartjs-dashboard-pie"></canvas>
                                        </div>
                                    </div>

                                    <table className="table mb-0">
                                        <tbody>
                                            <tr>
                                                <td>Chrome</td>
                                                <td className="text-end">4306</td>
                                            </tr>
                                            <tr>
                                                <td>Firefox</td>
                                                <td className="text-end">3801</td>
                                            </tr>
                                            <tr>
                                                <td>IE</td>
                                                <td className="text-end">1689</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
                        <div className="card flex-fill w-100">
                            <div className="card-header">

                                <h5 className="card-title mb-0">Real-Time</h5>
                            </div>
                            <div className="card-body px-4">
                                <div id="world_map" style={{height:350}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
                        <div className="card flex-fill">
                            <div className="card-header">

                                <h5 className="card-title mb-0">Calendar</h5>
                            </div>
                            <div className="card-body d-flex">
                                <div className="align-self-center w-100">
                                    <div className="chart">
                                        <div id="datetimepicker-dashboard"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-lg-8 col-xxl-9 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header">

                                <h5 className="card-title mb-0">Latest Projects</h5>
                            </div>
                            <table className="table table-hover my-0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th className="d-none d-xl-table-cell">Start Date</th>
                                        <th className="d-none d-xl-table-cell">End Date</th>
                                        <th>Status</th>
                                        <th className="d-none d-md-table-cell">Assignee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Project Apollo</td>
                                        <td className="d-none d-xl-table-cell">01/01/2021</td>
                                        <td className="d-none d-xl-table-cell">31/06/2021</td>
                                        <td><span className="badge bg-success">Done</span></td>
                                        <td className="d-none d-md-table-cell">Vanessa Tucker</td>
                                    </tr>
                                    <tr>
                                        <td>Project Fireball</td>
                                        <td className="d-none d-xl-table-cell">01/01/2021</td>
                                        <td className="d-none d-xl-table-cell">31/06/2021</td>
                                        <td><span className="badge bg-danger">Cancelled</span></td>
                                        <td className="d-none d-md-table-cell">William Harris</td>
                                    </tr>
                                    <tr>
                                        <td>Project Hades</td>
                                        <td className="d-none d-xl-table-cell">01/01/2021</td>
                                        <td className="d-none d-xl-table-cell">31/06/2021</td>
                                        <td><span className="badge bg-success">Done</span></td>
                                        <td className="d-none d-md-table-cell">Sharon Lessman</td>
                                    </tr>
                                    <tr>
                                        <td>Project Nitro</td>
                                        <td className="d-none d-xl-table-cell">01/01/2021</td>
                                        <td className="d-none d-xl-table-cell">31/06/2021</td>
                                        <td><span className="badge bg-warning">In progress</span></td>
                                        <td className="d-none d-md-table-cell">Vanessa Tucker</td>
                                    </tr>
                                    <tr>
                                        <td>Project Phoenix</td>
                                        <td className="d-none d-xl-table-cell">01/01/2021</td>
                                        <td className="d-none d-xl-table-cell">31/06/2021</td>
                                        <td><span className="badge bg-success">Done</span></td>
                                        <td className="d-none d-md-table-cell">William Harris</td>
                                    </tr>
                                    <tr>
                                        <td>Project X</td>
                                        <td className="d-none d-xl-table-cell">01/01/2021</td>
                                        <td className="d-none d-xl-table-cell">31/06/2021</td>
                                        <td><span className="badge bg-success">Done</span></td>
                                        <td className="d-none d-md-table-cell">Sharon Lessman</td>
                                    </tr>
                                    <tr>
                                        <td>Project Romeo</td>
                                        <td className="d-none d-xl-table-cell">01/01/2021</td>
                                        <td className="d-none d-xl-table-cell">31/06/2021</td>
                                        <td><span className="badge bg-success">Done</span></td>
                                        <td className="d-none d-md-table-cell">Christina Mason</td>
                                    </tr>
                                    <tr>
                                        <td>Project Wombat</td>
                                        <td className="d-none d-xl-table-cell">01/01/2021</td>
                                        <td className="d-none d-xl-table-cell">31/06/2021</td>
                                        <td><span className="badge bg-warning">In progress</span></td>
                                        <td className="d-none d-md-table-cell">William Harris</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 col-xxl-3 d-flex">
                        <div className="card flex-fill w-100">
                            <div className="card-header">

                                <h5 className="card-title mb-0">Monthly Sales</h5>
                            </div>
                            <div className="card-body d-flex w-100">
                                <div className="align-self-center chart chart-lg">
                                    <canvas id="chartjs-dashboard-bar"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>

        <Footer />
    </div>
</div>
  )
}

export default NewApplication