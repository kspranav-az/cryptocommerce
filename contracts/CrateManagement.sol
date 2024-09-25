// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./OrderManagement.sol";

contract CrateManagement is OrderManagement {
    struct Crate {
        uint256 crateId;
        uint256[] productIds; // Product IDs in the crate
        bool shipped;
    }

    mapping(uint256 => Crate) public crates; // Crates to group products
    mapping(uint256 => string) public crateRfid; // Tracks crates using RFID tags

    event CrateCreated(uint256 crateId, uint256[] productIds, string crateRfidTag);
    event CrateShipped(uint256 crateId);

    // Create a crate for shipping multiple items
    function createCrate(uint256[] memory productIds, string memory crateRfidTag) public onlyOwner {
        uint256 crateId = block.timestamp; // Simple crate ID based on timestamp
        Crate memory newCrate = Crate(crateId, productIds, false);
        crateRfid[crateId] = crateRfidTag;
        crates[crateId] = newCrate;

        emit CrateCreated(crateId, productIds, crateRfidTag);
    }

    // Ship a crate
    function shipCrate(uint256 crateId) public onlyOwner {
        Crate storage crate = crates[crateId];
        require(!crate.shipped, "Crate already shipped");

        crate.shipped = true;
        emit CrateShipped(crateId);
    }

    // Get products in a crate
    function getProductsInCrate(uint256 crateId) public view returns (uint256[] memory) {
        return crates[crateId].productIds;
    }
}
