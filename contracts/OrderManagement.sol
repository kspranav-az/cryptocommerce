// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./ProductManagement.sol";

contract OrderManagement is ProductManagement {
    struct Order {
        uint256 time;
        Item item;
    }

    mapping(address => mapping(uint256 => Order)) public orders; // Orders placed by users
    mapping(address => uint256) public orderCount; // Keeps count of orders per user

    event OrderPlaced(address indexed buyer, uint256 orderId, uint256 itemId);

    // Buy an item
    function buyItem(uint256 _id) public payable {
        Item memory item = items[_id];

        require(msg.value >= item.cost, "Insufficient funds");
        require(item.stock > 0, "Out of stock");

        Order memory order = Order(block.timestamp, item);
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        items[_id].stock--; // Decrease stock

        emit OrderPlaced(msg.sender, orderCount[msg.sender], item.id);
    }

    // Function to withdraw contract balance (for owner)
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }
}
