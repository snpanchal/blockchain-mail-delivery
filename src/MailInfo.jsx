import React from "react";

class MailInfo extends React.Component {
    render() {
        let mailId = this.props.mailId;
        let mailType = this.props.mailType;
        let sender = this.props.sender;
        let recipient = this.props.recipient;
        let deliveryStatus = this.props.deliveryStatus;

        return(
            <div>
                <p>Mail ID: {mailId}</p>
                <p>Mail type: {mailType}</p>
                <p>Sender: {sender}</p>
                <p>Recipient: {recipient}</p>
                <p>Delivery Status: {deliveryStatus}</p>
            </div>
        )
    }
}

export default MailInfo;
