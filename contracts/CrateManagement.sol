// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./OrderManagement.sol";

contract CrateManagement is OrderManagement {
    struct Crate {
        uint256 crateId; // Unique ID for the crate
        string crateRFID; // RFID tag for the crate
        address warehouse; // Warehouse responsible for this crate
        bool closed; // Status indicating if the crate is sealed
        bool delivered; // Delivery status
        uint256[] itemIds; // List of item IDs in this crate
    }

    uint256 public nextCrateId = 1; // Counter for crate IDs
    mapping(uint256 => Crate) public crates; // Maps crate IDs to Crate structs
    mapping(string => uint256) public rfidToCrateId; // Maps RFID tags to crate IDs

    event CrateCreated(uint256 crateId, address warehouse, string crateRFID);
    event CrateSealed(uint256 crateId);
    event CrateDelivered(uint256 crateId);
    event ItemAddedToCrate(uint256 crateId, uint256 itemId);

    modifier onlyWarehouse() {
        require(msg.sender != owner, "Not authorized"); // In a real-world scenario, you would check for a list of warehouses
        _;
    }

    // Create a new crate
    function createCrate(string memory _crateRFID , uint256[] memory items ) public onlyWarehouse {
        require(rfidToCrateId[_crateRFID] == 0, "RFID already in use");

        uint256 crateId = uint256(keccak256(abi.encodePacked(block.timestamp, _crateRFID, nextCrateId)));
        Crate memory newCrate = Crate(crateId, _crateRFID, msg.sender, false, false , items );
        crates[crateId] = newCrate;
        rfidToCrateId[_crateRFID] = crateId;

        nextCrateId++;

        emit CrateCreated(crateId, msg.sender, _crateRFID);
    }

    // Add an item to a crate
    function addItemToCrate(uint256 _crateId, uint256 _itemId) public onlyWarehouse {
        Crate storage crate = crates[_crateId];
        require(crate.crateId == _crateId, "Crate does not exist");
        require(!crate.closed, "Crate is already sealed");

        Item storage item = items[_itemId];
        require(item.itemId == _itemId, "Item does not exist");
        require(!item.delivered, "Item already delivered");
        require(item.currentOwner == msg.sender, "Item not owned by this warehouse");

        crate.itemIds.push(_itemId);

        emit ItemAddedToCrate(_crateId, _itemId);
    }

    // Seal a crate for delivery
    function sealCrate(uint256 _crateId) public onlyWarehouse {
        Crate storage crate = crates[_crateId];
        require(crate.crateId == _crateId, "Crate does not exist");
        require(!crate.closed, "Crate is already sealed");
        require(crate.itemIds.length > 0, "Crate must contain at least one item");

        crate.closed = true;

        emit CrateSealed(_crateId);
    }

    // Mark crate as delivered
    function deliverCrate(uint256 _crateId) public onlyOwner {
        Crate storage crate = crates[_crateId];
        require(crate.crateId == _crateId, "Crate does not exist");
        require(crate.closed, "Crate is not sealed");
        require(!crate.delivered, "Crate already delivered");

        // Mark all items in the crate as delivered
        for (uint256 i = 0; i < crate.itemIds.length; i++) {
            uint256 itemId = crate.itemIds[i];
            Item storage item = items[itemId];
            item.delivered = true;

            emit ProductDelivered(itemId, item.productId);
        }

        crate.delivered = true;

        emit CrateDelivered(_crateId);
    }

    // Retrieve crate details by RFID
    function getCrateByRFID(string memory _crateRFID) public view returns (Crate memory) {
        uint256 crateId = rfidToCrateId[_crateRFID];
        require(crateId != 0, "Crate not found for the given RFID");

        return crates[crateId];
    }

    // Retrieve items in a crate
    function getItemsInCrate(uint256 _crateId) public view returns (uint256[] memory) {
        Crate storage crate = crates[_crateId];
        require(crate.crateId == _crateId, "Crate does not exist");

        return crate.itemIds;
    }
}
