// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./ProductManagement.sol";

contract OrderManagement is ProductManagement {
    struct Order {
        uint256 orderId; // Unique ID for the order
        uint256 itemId; // The item being ordered
        uint256 timestamp; // Time of order
        address buyer; // Address of the buyer
        bool fulfilled; // Whether the order has been fulfilled
    }

    uint256 public nextOrderId = 1; // Counter for order IDs

    mapping(uint256 => Order) public orders; // Maps order IDs to orders
    mapping(address => uint256[]) public buyerOrders; // Maps buyers to their order IDs

    event OrderPlaced(uint256 orderId, uint256 itemId, address buyer);
    event OrderFulfilled(uint256 orderId, uint256 itemId);

    // Place an order for an item
    function placeOrder(uint256 _itemId, string memory _rfidTag) public payable {
        Item storage item = items[_itemId];
        require(item.itemId == _itemId, "Item does not exist");
        require(!item.delivered, "Item already delivered");
        require(msg.value >= products[item.productId].cost, "Insufficient funds");

        // Check if the RFID is already assigned to another undelivered item
        uint256 existingItemId = rfidToItemId[_rfidTag];
        if (existingItemId != 0) {
            Item storage existingItem = items[existingItemId];
            require(existingItem.delivered, "RFID already in use for another undelivered item");
        }

        // Assign the RFID tag to the item
        item.rfidTag = _rfidTag;
        rfidToItemId[_rfidTag] = _itemId;

        // Create the order
        uint256 orderId = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, _itemId, nextOrderId)));
        Order memory newOrder = Order(orderId, _itemId, block.timestamp, msg.sender, false);
        orders[orderId] = newOrder;
        buyerOrders[msg.sender].push(orderId);

        // Transfer ownership to buyer
        item.currentOwner = msg.sender;

        // Increment order counter
        nextOrderId++;

        emit RFIDAssigned(_itemId, _rfidTag);
        emit OrderPlaced(orderId, _itemId, msg.sender);
    }

    // Fulfill an order and mark the item as delivered
    function fulfillOrder(uint256 _orderId) public onlyOwner {
        Order storage order = orders[_orderId];
        require(order.orderId == _orderId, "Order does not exist");
        require(!order.fulfilled, "Order already fulfilled");

        // Get the associated item
        Item storage item = items[order.itemId];
        require(!item.delivered, "Item already delivered");

        // Mark the item as delivered
        item.delivered = true;
        order.fulfilled = true;

        emit OrderFulfilled(_orderId, order.itemId);
        emit ProductDelivered(order.itemId, item.productId);
    }

    // Retrieve all orders placed by a specific buyer
    function getOrdersByBuyer(address _buyer) public view returns (Order[] memory) {
        uint256[] memory orderIds = buyerOrders[_buyer];
        Order[] memory buyerOrderList = new Order[](orderIds.length);

        for (uint256 i = 0; i < orderIds.length; i++) {
            buyerOrderList[i] = orders[orderIds[i]];
        }

        return buyerOrderList;
    }

    // Retrieve a specific order by ID
    function getOrder(uint256 _orderId) public view returns (Order memory) {
        return orders[_orderId];
    }

    // Retrieve the undelivered item ID associated with a given RFID
    function getUndeliveredItemIdByRFID(string memory _rfidTag) public view returns (uint256) {
        uint256 itemId = rfidToItemId[_rfidTag];
        require(itemId != 0, "RFID not associated with any item");

        Item storage item = items[itemId];
        require(!item.delivered, "Item already delivered");

        return itemId;
    }

    // Withdraw contract balance (only owner)
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}
