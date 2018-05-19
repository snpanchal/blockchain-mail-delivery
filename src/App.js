import React, { Component } from 'react';
import {ABI} from './contractInfo.js';
import {contractAddress} from './contractInfo.js';
import LocationReport from './LocationReport.jsx';
import logo from './logo.svg';
import './App.css';

var transactionDetails = {gas: 3000000, from: window.web3.eth.accounts[0]};
var reportKey = 0;

var MailTypeEnum = {
    MAIL: 1,
    PACKAGE: 2
}

var DeliveryStatusEnum = {
    INCOMPLETE: 1,
    COMPLETE: 2,
    ERROR: 3
}

function Mail(mailId, mailType, sender, recipient, deliveryStatus) {
    this.mailId = mailId;
    this.mailType = mailType;
    this.sender = sender;
    this.recipient = recipient;
    this.deliveryStatus = deliveryStatus;
}

// function LocationReport(mailId, currentAddress, timestamp) {
//     this.mailId = mailId;
//     this.currentAddress = currentAddress;
//     this.timestamp = timestamp;
// }

var locationReports = [];

class App extends Component {
    constructor(props) {
        super(props);

        const mailContract = window.web3.eth.contract(ABI);

        this.state = {
            mailDelivery: mailContract.at(contractAddress),
            mailId: "",
            locationReportsFilled: false
        }

        this.submitClicked = this.submitClicked.bind(this);
        this.populateLocationReports = this.populateLocationReports.bind(this);
        this.createOneReport = this.createOneReport.bind(this);
        this.createReports = this.createReports.bind(this);
    }

    submitClicked() {
        this.state.mailDelivery.getNumLocationReports(this.state.mailId, this.populateLocationReports);
    }

    populateLocationReports(error, result) {
        // const {getLocationReport} = this.state.mailDelivery;
        if (!error) {
            var numReports = result;
            for (let i = 0; i < numReports; i++) {
                var self = this;
                this.state.mailDelivery.getLocationReport(this.state.mailId, i, function (error, locationReport) {
                    if (!error) {
                        // locationReports[numReports - 1 - i] = new LocationReport(self.state.mailId, window.web3.toAscii(locationReport[0]), new Date(locationReport[1] * 1000).toString());
                        locationReports[numReports - 1 - i] = {
                            mailId: self.state.mailId,
                            currentAddress: window.web3.toAscii(locationReport[0]).trim(),
                            timestamp: new Date(locationReport[1] * 1000).toString()
                        }
                        self.setState({locationReportsFilled: true});
                    }
                    else {
                        throw new Error(error);
                    }
                });
            }
        }
    }

    createOneReport(locationReport) {
        reportKey++;
        return <LocationReport address={locationReport.currentAddress} timestamp={locationReport.timestamp} key={reportKey} />;
    }

    createReports() {
        return locationReports.map(this.createOneReport);
    }

    render() {
        return(
            <div>
                <header>
                    <h1>Blockchain Mail Delivery</h1>
                </header>
                <form>
                    <label>Enter Mail ID:</label>
                    <input type="text" id="mailId"value={this.state.mailId} onChange={e => this.setState({mailId: e.currentTarget.value})} /><br />
                    <button onClick={this.submitClicked} type="button" id="submit">Submit</button>
                </form>
                <hr />
                {this.createReports()}
            </div>
        );
    }
}

export default App;
