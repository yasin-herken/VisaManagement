import React from "react";
import Barcode from "react-barcode/lib/react-barcode";
class ComponentToPrint extends React.Component{
    render(){
        return (
            <Barcode value={this.props?.barcode}></Barcode>
        )
    }
}


export default ComponentToPrint;