// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ProductManagement {
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
        string rfidTag; // RFID for tracking
    }

    mapping(uint256 => Item) public items; // Tracks individual items by item ID

    event ItemListed(uint256 id, string name, uint256 cost, uint256 stock);
    event ItemUpdated(uint256 id, uint256 stock);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // List a new item
    function listItem(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock,
        string memory _rfidTag
    ) public onlyOwner {
        Item memory item = Item(_id, _name, _category, _image, _cost, _rating, _stock, _rfidTag);
        items[_id] = item;

        emit ItemListed(_id, _name, _cost, _stock);
    }

    // Update item stock
    function updateItemStock(uint256 _id, uint256 _stock) public onlyOwner {
        items[_id].stock = _stock;
        emit ItemUpdated(_id, _stock);
    }

    // Retrieve item details
    function getItem(uint256 _id) public view returns (Item memory) {
        return items[_id];
    }


}
