import React from 'react'
import { Link } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    elements: {
        line: {
            tension: 0,
        }
    },
    scales: {
        y: {
            suggestedMin: 1000,
            suggestedMax: 4000,
        }
    },
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Annual Sales',
        },
    },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [2115, 1562, 1584, 1892, 1587, 1923, 2556, 2448, 2805, 3438, 2917, 3327],
            borderColor: 'rgb(30,144,255)',
            backgroundColor: 'rgb(30,144,255)',
            lineTension: 0.3,
            fill: true,
            options: {
                scales: {
                    y: {
                        labels: [1000, 2000, 3000, 4000]
                    }
                }
            }
        },
    ],
};
function Dashboard() {
    return (
        <div className='container-fluid p-0'>
            <div class="row mb-2 mb-xl-3">
                <div class="col-auto d-none d-sm-block">
                    <h3><strong>Analytics</strong> Dashboard</h3>
                </div>

                <div class="col-auto ms-auto text-end mt-n1">
                    <Link to="#" class="btn btn-light bg-white me-2">Invite Link Friend</Link>
                    <Link to="#" class="btn btn-primary">New Project</Link>
                </div>
            </div>
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-truck align-middle"><rect x={1} y={3} width={15} height={13} /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <h1 className="mt-1 mb-3">2.382</h1>
                                        <div className="mb-0">
                                            <span className="badge badge-primary-light"> <i className="mdi mdi-arrow-bottom-right" /> -3.65% </span>
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-users align-middle"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx={9} cy={7} r={4} /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <h1 className="mt-1 mb-3">14.212</h1>
                                        <div className="mb-0">
                                            <span className="badge badge-success-light"> <i className="mdi mdi-arrow-bottom-right" /> 5.25% </span>
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-dollar-sign align-middle"><line x1={12} y1={1} x2={12} y2={23} /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <h1 className="mt-1 mb-3">$21.300</h1>
                                        <div className="mb-0">
                                            <span className="badge badge-success-light"> <i className="mdi mdi-arrow-bottom-right" /> 6.65% </span>
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart align-middle"><circle cx={9} cy={21} r={1} /><circle cx={20} cy={21} r={1} /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <h1 className="mt-1 mb-3">64</h1>
                                        <div className="mb-0">
                                            <span className="badge badge-danger-light"> <i className="mdi mdi-arrow-bottom-right" /> -2.25% </span>
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
                            <div className="float-end">
                                <form className="row g-2">
                                    <div className="col-auto">
                                        <select className="form-select form-select-sm bg-light border-0">
                                            <option>Jan</option>
                                            <option value={1}>Feb</option>
                                            <option value={2}>Mar</option>
                                            <option value={3}>Apr</option>
                                        </select>
                                    </div>
                                    <div className="col-auto">
                                        <input type="text" className="form-control form-control-sm bg-light rounded-2 border-0" style={{ width: '100px' }} placeholder="Search.." />
                                    </div>
                                </form>
                            </div>
                            <h5 className="card-title mb-0">Recent Movement</h5>
                        </div>
                        <div className="card-body pt-2 pb-3">
                            <Line options={options} data={data} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard