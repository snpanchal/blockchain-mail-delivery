import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var transactionDetails = {gas: 3000000, from: window.web3.eth.accounts[0]};

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

function LocationReport(mailId, currentAddress, timestamp) {
    this.mailId = mailId;
    this.currentAddress = currentAddress;
    this.timestamp = timestamp;
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mailId: ""
        }
    }

    submitClicked() {
        // submit button clicked
    }
  
    render() {
        return (
            <div className="App">
                <header>
                    <h1>Blockchain Mail Delivery</h1>
                </header>
                <form>
                    <label>Enter Mail ID:</label>
                    <input type="text" id="mailId"value={this.state.mailId} onChange={e => this.setState({mailId: e.currentTarget.value})} /><br />
                    <button onClick={this.submitClicked} type="button" id="submit">Submit</button>
                </form>

            </div>
        );
    }
}

export default App;
