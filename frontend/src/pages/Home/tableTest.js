import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { userRequest } from '../../requests/requestMethod.js';
import { selectUser } from '../Features/userSlice.js';
import { useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
function TableTest() {
    const user = useSelector(selectUser);
    const [posts, setPosts] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filterText, setFilterText] = useState("");
    const columns = [
        {
            name: '#',
            sortable: true,
            selector: row => row.status,

        },
        {
            name: 'File Code',
            sortable: true,
            selector: row => row.barcodeValue,
        },
        {
            name: 'Date',
            cell: (row) => {
                let date = Date.parse(row.createdAt);
                date = new Date(date);
                return <>
                    <div>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}</div>
                </>
            }
        },
        {
            name: 'Pass.No',
            sortable: true,
            selector: row => row.passportNo,
        },
        {
            name: 'Name',
            sortable: true,
            selector: row => row.name,
        },
        {
            name: 'SurName',
            sortable: true,
            selector: row => row.surname,
        },
        {
            name: 'Visa Type',
            sortable: true,
            selector: row => row.visaType,
        },
        {
            name: 'Gsm Tel',
            sortable: true,
            selector: row => row.telNo,
        },
        {
            name: 'Visa Status',
            sortable: true,
            selector: row => row.visaStatus,
        },
        {
            name: 'Result',
            sortable: true,
            selector: row => row.result,
        },
        {
            name: 'Commands',
            cell: (row) => {
                return <>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic-button" variant="secondary">
                            Action
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item href="#/action-1" active>
                                Action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </>

            },
        },
    ];
    useEffect(() => {
        const loadPosts = async () => {
            const response = await userRequest(user.token.split(" ")[1]).get("/barcode");
            setPosts(response.data);
        }
        loadPosts();
    }, [user.token]);
    useEffect(() => {
        const data = posts.filter(item => {
            return item?.barcodeValue.toLowerCase().includes(filterText.toLowerCase())
        });
        if (data.length) {
            setFilteredItems(data);
        }
    }, [posts, filterText]);
    const searchHandler = (event) => {
        setFilterText(event.target.value)
    }
    return (
        <>
            <div className='row'>
                <div className='col-10 col-md-10'></div>
                <div className='col-2 col-md-2 d-flex flex-row'>
                    <input id="inputAddress" type="text" className="form-control" placeholder="" onChange={searchHandler} />
                </div>
            </div>
            <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                responsive
                subHeader
                persistTableHead
                striped
                highlightOnHover
                noHeader
            />
        </>

    )
}

export default TableTest