import React from "react";
import Barcode from "react-barcode/lib/react-barcode";
import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";

class ApplicationReceiptPrint extends React.Component {
    render() {
        return (
            <>
                <Container>
                    <Table>
                        <thead>
                            <tr></tr>
                            <tr className='text-end'></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    MALI
                                    <br />
                                    {new Date().getDay() + "/" + (parseInt(new Date().getMonth()) + 1).toString() + "/" + new Date().getFullYear()}
                                </td>
                                <td className='text-end'>Qrcode</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td className='text-end'>{this.props?.currentObject.personal?.name}</td>
                            </tr>
                            <tr>
                                <td>Reference No</td>
                                <td className='text-end'>{this.props?.currentObject.barcodeValue}</td>
                            </tr>
                            <tr>
                                <td>Passport No</td>
                                <td className='text-end'>{this.props?.currentObject.passport?.passportNo}</td>
                            </tr>
                            <tr>
                                <td>Travel Type</td>
                                <td className='text-end'>{this.props?.currentObject.passport?.travelType} </td>
                            </tr>
                            <tr>
                                <td>Visa Type</td>
                                <td className='text-end'>{this.props?.currentObject.passport?.visaType} </td>
                            </tr>
                            <tr>
                                <td>Document Type</td>
                                <td className='text-end'>{this.props?.currentObject.passport?.documentType} </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th className='text-end'>Currency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props?.currentObject?.services?.service.map((service, index) => {
                                    return <tr key={index}>
                                        <td>{service.service}</td>
                                        <td>{service.sum}</td>
                                        <td className='text-end'> CFA</td>
                                    </tr>
                                })
                            }
                            {
                                this.props?.entryType ?
                                    <tr>
                                        <td>VISA {this.props?.currentObject?.passport?.documentType}</td>
                                        <td>{this.props?.entryType}</td>
                                        <td className='text-end'>CFA</td>
                                    </tr> : null

                            }
                            <tr>
                                <td>SAIR TAHSILAT</td>
                                <td>{calculateSum(this.props?.currentObject)+this.props?.entryType}</td>
                                <td className='text-end'>CFA</td>
                            </tr>
                        </tbody>
                    </Table>
                    <br />
                    <hr />
                    <Table>
                        <thead>
                            <tr>
                                <th></th>
                                <th className='text-end'></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>CFA Total</td>
                                <td className='text-end'>{calculateSum(this.props?.currentObject)} CFA</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="text-center">
                        {this.props?.currentObject?.barcodeValue ? <Barcode value={this.props?.currentObject?.barcodeValue}></Barcode> : null}
                    </div>
                </Container>
            </>
        )
    }
}


export default ApplicationReceiptPrint;

const calculateSum = (currentObject) => {
    const sum = <>{
        currentObject?.services?.service.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.sum;
        }, 0)}</>
    return sum;
}