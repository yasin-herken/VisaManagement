import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';

function ComponenToPrintWrapper({ rowData }) {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });
    return (
        <>
            <Link to="#" onClick={handlePrint}><span className={`customer-badge status-${rowData.barcodeValue}`} >{rowData.barcodeValue}</span></Link>
            <div style={{ display: "none" }}><ComponentToPrint ref={componentRef} barcode={rowData?.barcodeValue ? rowData.barcodeValue : "Barcode is not found"} /> </div>
        </>
    )
}

export default ComponenToPrintWrapper