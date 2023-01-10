import React, { useState } from 'react'
import get from "lodash.get"
import useSortableTable from '../../Hooks/useSortableTable';
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { IconContext } from 'react-icons/lib';
import "./datatable.css";
const Datatable = (props) => {
    const { data, rowsPerPage, columns, style, className } = props;
    const [pages] = useState(Math.ceil(data.length / rowsPerPage));
    const { items, requestSort, sortConfig } = useSortableTable(data);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    const [currentPage, setCurrentPage] = useState(1);
    const goToNextPage = () => {
        setCurrentPage((page) => page + 1);
    }
    const goToPreviousPage = () => {
        setCurrentPage((page) => page - 1);
    }
    const changePage = (event) => {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }
    const getPaginatedData = () => {
        const startIndex = currentPage * rowsPerPage - rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return items.slice(startIndex, endIndex);
    };
    const getPaginationGroup = () => {
        const nPages = Math.ceil(items.length / rowsPerPage);
        return [...Array(nPages + 1).keys()].slice(1);

    };
    return (
        <React.Fragment>
            <table style={style} className={className}>
                <thead>
                    <tr>
                        {columns.map((column, index) => {
                            return (<th key={index} style={column?.style}>
                                <button style={{ backgroundColor: "none", border: "none", background: "none", width: "100%" }}
                                    onClick={() => requestSort(column.accessor)}
                                >
                                    <div className="d-flex">
                                        <div className="me-auto">{column.label}</div>
                                        <div className="d-flex flex-column">
                                            {column?.sortable === true ? <IconContext.Provider
                                                value={{ size: "10px" }}
                                            >
                                                <HiOutlineChevronUp className={getClassNamesFor(column.accessor) === "ascending" ? "ascending" : "button-opacity"} />
                                                <HiOutlineChevronDown className={getClassNamesFor(column.accessor) === "descending" ? "descending" : "button-opacity"} />
                                            </IconContext.Provider> : null
                                            }

                                        </div>
                                    </div>

                                </button>
                            </th>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    <TableRow data={getPaginatedData()} columns={columns} />
                </tbody>
            </table>

            <div className='row'>
                <div className='col-sm-12 col-md-6'>
                    <div className='dataTables_info' id="DataTables_Table_1_info">
                        {`Showing ${currentPage * rowsPerPage - rowsPerPage + 1} to  ${currentPage * rowsPerPage - rowsPerPage + getPaginatedData().length} of ${data.length} entries `}
                    </div>
                </div>
                <div className='col-sm-12 col-md-6'>
                    <div className='dataTables_paginate paging_simple_numbers' id="DataTables_Table_1_paginate">
                        <ul className='pagination'>
                            <li className='paginate-button page-item previous' id="DataTables_Table_1_previous" key={0}>
                                <button
                                    onClick={goToPreviousPage}
                                    className={`page-link prev ${currentPage === 1 ? 'disabled' : ''}`}
                                    disabled={currentPage === 1 ? true : null}
                                >
                                    prev
                                </button>
                            </li>
                            {
                                getPaginationGroup().map((item, index) => (
                                    <li className={`paginate_button page-item ${currentPage === item ? 'active' : null}`} key={index}>
                                        <button
                                            key={index}
                                            onClick={changePage}
                                            className={`page-link ${currentPage === item ? 'active' : null}`}
                                        >
                                            <span>{item}</span>
                                        </button>
                                    </li>
                                ))
                            }
                            <li className="paginate_button page-item next" id="DataTables_Table_1_next" key={12}>
                                <button
                                    onClick={goToNextPage}
                                    className={`page-link ${currentPage === pages ? 'disabled' : ''}`}
                                    disabled={currentPage === pages ? true : null}
                                >
                                    next
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export const TableRow = ({ data, columns }) => {
    return (
        <React.Fragment>
            {data.map((item, itemIndex) => (
                <tr key={`${item._id}`} >
                    {
                        columns.map((column, columnIndex) => (
                            <TableRowCell
                                key={columnIndex}
                                item={item}
                                column={column}
                            >
                            </TableRowCell>
                        ))
                    }
                </tr>
            ))}
        </React.Fragment>
    );
}
export const TableRowCell = ({ item, column }) => {
    const value = get(item, column.accessor)
    return (
        <td style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
            key={item.id}>{column.render ? column.render(column, item) : value}</td>
    )
}
export default Datatable