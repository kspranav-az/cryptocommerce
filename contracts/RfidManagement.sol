// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./CrateManagement.sol";

contract RfidManagement is CrateManagement {
    struct RfidData {
        string location;
        uint timestamp;
        uint256 crateId; // Track associated crate ID
    }

    mapping(string => RfidData) public rfidRecords; // RFID records tracking locations

    event RfidLocationUpdated(string rfidTag, string location, uint256 crateId);

    // Update RFID location for an item or crate
    function updateRfidLocation(string memory rfidTag, string memory location, uint256 crateId) public onlyOwner {
        require(bytes(rfidTag).length > 0, "Invalid RFID tag");
        require(bytes(location).length > 0, "Invalid location");

        rfidRecords[rfidTag] = RfidData(location, block.timestamp, crateId);
        emit RfidLocationUpdated(rfidTag, location, crateId);
    }

    // Retrieve RFID data (location, timestamp, crateId)
    function getRfidData(string memory rfidTag) public view returns (string memory location, uint timestamp, uint256 crateId) {
        RfidData memory data = rfidRecords[rfidTag];
        return (data.location, data.timestamp, data.crateId);
    }
}