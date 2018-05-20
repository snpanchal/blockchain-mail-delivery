import React, { Component } from 'react';
import {ABI} from './contractInfo.js';
import {contractAddress} from './contractInfo.js';
import LocationReport from './LocationReport.jsx';
import MailInfo from './MailInfo.jsx';
import './App.css';

var transactionDetails = {gas: 3000000, from: window.web3.eth.accounts[0]};
var reportKey = 0;
var locationReports = [];
var currentMail = new Mail("", "", "", "", "");

function Mail(mailId, mailType, sender, recipient, deliveryStatus) {
    this.mailId = mailId;
    this.mailType = mailType;
    this.sender = sender;
    this.recipient = recipient;
    this.deliveryStatus = deliveryStatus;
}

function Report(mailId, currentAddress, timestamp) {
    this.mailId = mailId;
    this.currentAddress = currentAddress;
    this.timestamp = timestamp;
}

function convertToAscii(str) {
    return window.web3.toAscii(str).replace(/^\W+|\W+$/g, "");
}


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
        this.populateCurrentMail = this.populateCurrentMail.bind(this);
        this.populateLocationReports = this.populateLocationReports.bind(this);
        this.createOneReport = this.createOneReport.bind(this);
        this.createReports = this.createReports.bind(this);
    }

    submitClicked() {
        this.state.mailDelivery.getMailInfo(this.state.mailId, this.populateCurrentMail);
        this.state.mailDelivery.getNumLocationReports(this.state.mailId, this.populateLocationReports);
    }

    populateCurrentMail(error, result) {
        if (!error) {
            var mailInfo = result;

            var mailType = "";
            switch (mailInfo[0].c[0]) {
                case 0:
                    mailType = "Mail";
                    break;
                case 1:
                    mailType = "Package";
                    break;
            }

            var deliveryStatus = "";
            switch (mailInfo[3].c[0]) {
                case 0:
                    deliveryStatus = "Incomplete";
                    break;
                case 1:
                    deliveryStatus = "Complete";
                    break;
                case 2:
                    deliveryStatus = "Mistake";
                    break;
            }

            currentMail = new Mail(this.state.mailId, mailType, convertToAscii(mailInfo[1]), convertToAscii(mailInfo[2]), deliveryStatus);
            this.setState({});
        }
    }

    populateLocationReports(error, result) {
        if (!error) {
            var numReports = result;
            for (let i = 0; i < numReports; i++) {
                var self = this;
                this.state.mailDelivery.getLocationReport(this.state.mailId, i, function (error, locationReport) {
                    if (!error) {
                        locationReports[numReports - 1 - i] = new Report(self.state.mailId, convertToAscii(locationReport[0]), new Date(locationReport[1] * 1000).toString());
                        self.setState({locationReportsFilled: true});
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
            <div className="App">
                <header>
                    <h1>Blockchain Mail Delivery</h1>
                </header>
                <form>
                    <label htmlFor="mailId">Enter Mail ID:</label>&nbsp;
                    <input type="text" id="mailId"value={this.state.mailId} onChange={e => this.setState({mailId: e.currentTarget.value})} /><br />
                    <button onClick={this.submitClicked} type="button" id="submit">Submit</button>
                </form>
                <h2>Mail Information</h2>
                <MailInfo mailId={currentMail.mailId} mailType={currentMail.mailType} sender={currentMail.sender} recipient={currentMail.recipient} deliveryStatus={currentMail.deliveryStatus} />
                <hr />
                <h2>Location Reports</h2>
                {this.createReports()}
            </div>
        );
    }
}

export default App;
