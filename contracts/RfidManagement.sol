// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./CrateManagement.sol";

contract RfidManagement is CrateManagement {
    struct Location {
        string latitude;
        string longitude;
        uint256 timestamp;
    }

    mapping(uint256 => Location[]) public crateLocations; // Mapping of crate IDs to their location history

    event LocationUpdated(uint256 crateId, string latitude, string longitude, uint256 timestamp);
    event CrateOpened(uint256 crateId, string sensorId, uint256 timestamp);
    event CrateDetected(uint256 crateId, string sensorId, uint256 timestamp);

    // Function to update the location of a crate
    function updateLocation(
        uint256 _crateId,
        string memory _latitude,
        string memory _longitude
    ) public {
        require(crates[_crateId].crateId == _crateId, "Crate does not exist");
        require(crates[_crateId].delivered == false, "Crate already delivered");

        Location memory newLocation = Location(_latitude, _longitude, block.timestamp);
        crateLocations[_crateId].push(newLocation);

        emit LocationUpdated(_crateId, _latitude, _longitude, block.timestamp);
    }

    // Function to log crate being detected by a sensor
    function detectCrate(uint256 _crateId, string memory _sensorId) public {
        require(crates[_crateId].crateId == _crateId, "Crate does not exist");
        require(crates[_crateId].delivered == false, "Crate already delivered");

        emit CrateDetected(_crateId, _sensorId, block.timestamp);
    }

    // Function to log crate opening event
    function openCrate(uint256 _crateId, string memory _sensorId) public {
        require(crates[_crateId].crateId == _crateId, "Crate does not exist");
        require(crates[_crateId].closed == true, "Crate is not sealed yet");

        crates[_crateId].closed = false; // Unseal the crate

        emit CrateOpened(_crateId, _sensorId, block.timestamp);
    }

    // Get location history of a crate
    function getCrateLocationHistory(uint256 _crateId) public view returns (Location[] memory) {
        require(crates[_crateId].crateId == _crateId, "Crate does not exist");
        return crateLocations[_crateId];
    }

    // Get the latest location of a crate
    function getLatestLocation(uint256 _crateId) public view returns (Location memory) {
        require(crates[_crateId].crateId == _crateId, "Crate does not exist");
        require(crateLocations[_crateId].length > 0, "No location data available");

        return crateLocations[_crateId][crateLocations[_crateId].length - 1];
    }
}
