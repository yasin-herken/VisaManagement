import React from "react";
import Barcode from "react-barcode/lib/react-barcode";
import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import CurrencyForCountry, { NameofCountry } from "../Variables/currency";

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
                                    {NameofCountry[this.props?.country]}
                                    <br />
                                    {new Date().getDay() + "/" + (parseInt(new Date().getMonth()) + 1).toString() + "/" + new Date().getFullYear()}
                                </td>
                                <td className='text-end'></td>
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
                                        <td className='text-end'> {CurrencyForCountry[this.props?.country]}</td>
                                    </tr>
                                })
                            }
                            {
                                this.props?.entryType ?
                                    <tr>
                                        <td>VISA {this.props?.currentObject?.passport?.documentType}</td>
                                        <td>{this.props?.entryType}</td>
                                        <td className='text-end'>{CurrencyForCountry[this.props?.country]}</td>
                                    </tr> : null

                            }
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
                                <td> {CurrencyForCountry[this.props?.country]} Total</td>
                                <td className='text-end'>{calculateSum(this.props?.currentObject, this.props?.entryType)}  {CurrencyForCountry[this.props?.country]}</td>
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

const calculateSum = (currentObject, entryType) => {
    const sum = <>{
        currentObject?.services?.service.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.sum;
        }, entryType)}</>
    return sum;
}