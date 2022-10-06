import React, { useEffect, useState, useMemo } from 'react'
import DataTable from 'react-data-table-component';
import FilterComponent from "react-data-table-component-with-filter";
import { userRequest } from '../../requests/requestMethod.js';
import { selectUser } from '../Features/userSlice.js';
import { useSelector } from 'react-redux';
import "./css/tables.css";
function Table() {
    const user = useSelector(selectUser);
    const [posts, setPosts] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [filterText, setFilterText] = useState("");
    const [pending, setPending] = useState(true);
    const handleDelete = async (event, row) => {
        event.preventDefault();
        try {
            const res = await userRequest(user.token.split(" ")[1]).delete("/barcode", {
                data: {

                }
            });
            if (res?.data.success) {
                //reset();
                setPosts(posts.filter((item) => {
                    return item.identification !== row.identification;
                }))
            }
        } catch (err) {
            console.log(err);
        }
    }
    const columns = useMemo([
        {
            name: 'Id',
            sortable: true,
            selector: row => row._id,

        },
        {
            name: 'Identification',
            sortable: true,
            selector: row => row.identification,
        },
        {
            name: 'Name',
            sortable: true,
            selector: row => row.username,
        },
        {
            name: 'Surname',
            sortable: true,
            selector: row => row.lastname,
        },
        {
            name: 'Gender',
            sortable: true,
            selector: row => row.gender,
        },
        {
            name: 'Status',
            sortable: true,
            selector: row => row.status,
        },
        {
            name: 'Barcode',
            sortable: true,
            selector: row => row.barcodeValue,
        },
        {
            name: "Edit",
            cell: (row) => (
                <>
                    <button className="btn btn-primary" onClick={() => { console.log(row) }}>Show</button>
                    <button className="btn btn-danger" onClick={(event) => { handleDelete(event, row) }}>Delete</button>
                </>
            )
        }
    ], []);

    const customStyles = useMemo({
        row: {
            style: {
                fontWeight: 400,
                minHeight: "48px"
            }
        },
        headCells: {
            style: {

                fontWeight: "bold",
                fontSize: "24px"
            },
        },
        cells: {
            style: {
                color: "#2C3333",
                minHeight: "72px",
                fontSize: "22px"
            }
        }

    }, [])
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);
    const searchHandler = (event) => {
        setFilterText(event.target.value)
    }
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
            setShowTable(true);
        }
    }, [posts, filterText]);
    useEffect(() => {
        const timeout = setTimeout(() => {
            const data = posts.filter(item => {
                return item?.barcodeValue.toLowerCase().includes(filterText.toLowerCase())
            })
            setFilteredItems(data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [filterText, posts]);
    return (
        <div className="col-12">
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Application List</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-10 col-md-10'></div>
                        <div className='col-2 col-md-2 d-flex flex-row'>
                            <input id="inputAddress" type="text" className="form-control" placeholder="" onChange={searchHandler} />
                            <button className='btn btn-info' >Search</button>
                        </div>
                    </div>
                    {
                        showTable ?
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
                                customStyles={customStyles}
                            /> : <DataTable
                                subHeader
                                subHeaderComponent={subHeaderComponentMemo}
                            />
                    }
                </div>
            </div>
        </div>
    )
}

export default Table