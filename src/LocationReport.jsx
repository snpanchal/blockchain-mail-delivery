import React from "react";

class LocationReport extends React.Component {
    render() {
        let address = this.props.address;
        let timestamp = this.props.timestamp;

        return(
            <div>
                <p>Address: {address}</p>
                <p>Timestamp: {timestamp}</p>
                <hr />
            </div>
        )
    }
}

export default LocationReport;
