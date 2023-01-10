import React from 'react';
import "flatpickr/dist/themes/material_green.css";
import PrimeTable from './primeTable.js';

function ApplicationList() {
    return (
        <div className='container-fluid p-0'>
            <div className='row'>
                <div className='col-12 col-lg-12'>
                    <PrimeTable />
                </div>
            </div>
        </div>
    )
}

export default ApplicationList