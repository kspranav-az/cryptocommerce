// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract cryptocommerce {
    address payable public owner;
    address public pastOwner;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }
    struct RfidData {
        string location;
        uint timestamp;
    }

    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => mapping(uint256 => Order)) public orders;
    mapping(address => uint256) public orderCount;
    mapping(string => RfidData) public rfidRecords;

    event Buy(address buyer, uint256 orderId, uint256 itemId);
    event List(string name, uint256 cost, uint256 quantity);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event RfidLocationUpdated(address indexed updater, string rfidTag, string location, uint timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    constructor() {
        owner = payable(msg.sender);
        pastOwner = address(0);
    }


    function transferOwnership(
        address payable newOwner
    ) public onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        pastOwner = owner;
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function updateRfidLocation(string memory rfidTag, string memory location) public onlyOwner {
        require(bytes(rfidTag).length > 0, "Invalid RFID tag");
        require(bytes(location).length > 0, "Invalid location");

        rfidRecords[rfidTag] = RfidData(location, block.timestamp);

        emit RfidLocationUpdated(msg.sender, rfidTag, location, block.timestamp);
    }


    function getRfidData(string memory rfidTag) public view returns (string memory location, uint timestamp) {
        RfidData memory data = rfidRecords[rfidTag];
        return (data.location, data.timestamp);
    }




    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        // Create Item
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

        // Add Item to mapping
        items[_id] = item;

        // Emit event
        emit List(_name, _cost, _stock);
    }

    function buy(uint256 _id) public payable {
        // Fetch item
        Item memory item = items[_id];

        // Require enough ether to buy item
        require(msg.value >= item.cost);

        // Require item is in stock
        require(item.stock > 0);

        // Create order
        Order memory order = Order(block.timestamp, item);

        // Add order for user
        orderCount[msg.sender]++; // <-- Order ID
        orders[msg.sender][orderCount[msg.sender]] = order;

        // Subtract stock
        items[_id].stock = item.stock - 1;

        // Emit event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}