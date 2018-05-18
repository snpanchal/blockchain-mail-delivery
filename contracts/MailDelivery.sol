pragma solidity ^0.4.20;

contract MailDelivery {

    enum MailType { MAIL, PACKAGE }
    enum DeliveryStatus { INCOMPLETE, COMPLETE, ERROR }

    struct Mail {
        uint mailId;
        MailType mailType;
        bytes32 sender; // address of sender
        bytes32 recipient; // address of recipient
        DeliveryStatus deliveryStatus; // state of delivery (complete, incomplete, or error)
    }

    // Delivery report to know when mail reached a certain location
    struct LocationReport {
        uint mailId;
        bytes32 currentAddress;
        uint timestamp;
    }

    mapping (uint => Mail) private allMail; // maps mail ID to related Mail object
    mapping (uint => LocationReport[]) private locationReports; // maps mail ID to record of locations mail has gone through
    uint private mailIdCount = 0;

    // Creates new mail and adds it to allMail mapping
    function newMail(MailType mailType, bytes32 sender, bytes32 recipient) public {
        Mail memory mail = Mail(mailIdCount, mailType, sender, recipient, DeliveryStatus.INCOMPLETE);
        allMail[mailIdCount] = mail;
        mailIdCount++;
    }

    // Creates new locations report and adds it to locationReports mapping
    function newLocationReport(uint mailId, bytes32 currentAddress) public {
        LocationReport memory locationReport = LocationReport(mailId, currentAddress, now);
        locationReports[mailId].push(locationReport);
    }

    // Mark delivery as complete
    function completeDelivery(uint mailId) public {
        allMail[mailId].deliveryStatus = DeliveryStatus.COMPLETE;
        bytes32 recipientAddress = allMail[mailId].recipient;
        newLocationReport(mailId, recipientAddress);
    }

    // Mark mistake in delivery
    function markDeliveryError(uint mailId, bytes32 currentAddress) public {
        allMail[mailId].deliveryStatus = DeliveryStatus.ERROR;
        newLocationReport(mailId, currentAddress);
    }
}
