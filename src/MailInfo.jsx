import React from "react";

class MailInfo extends React.Component {
    render() {
        let mailType = this.props.mailType;
        let sender = this.props.sender;
        let recipient = this.props.recipient;
        let deliveryStatus;
        switch (this.props.deliveryStatus) {
            case 1:
                deliveryStatus = "Incomplete";
                break;
            case 2:
                deliveryStatus = "Complete";
                break;
            case 3:
                deliveryStatus = "Mistake";
                break;
        }

        return(
            <div>
                <p>Mail type: {mailType}</p>
                <p>Sender: {sender}</p>
                <p>Recipient: {recipient}</p>
                <p>Delivery Status: {deliveryStatus}</p>
                <hr />
            </div>
        )
    }
}

export default MailInfo;