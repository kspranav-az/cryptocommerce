// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract RfidLocation {

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event RfidLocationUpdated(address indexed updater, string rfidTag, string location, uint timestamp);
    event PaymentMade(address indexed buyer, uint amount);

    address payable public owner;
    address public pastOwner;

    struct RfidData {
        string location;
        uint timestamp;
    }

    mapping(string => RfidData) public rfidRecords;

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    modifier costs(uint _amount) {
        require(msg.value >= _amount, "Insufficient Ether provided");
        _;
    }

    constructor() {
        owner = payable(msg.sender);
        pastOwner = address(0);
    }

    function transferOwnership(address payable newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        pastOwner = owner;
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function buy() public payable costs(2 ether) {
        require(owner != address(0), "Invalid owner address");

        (bool sent, ) = owner.call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        emit PaymentMade(msg.sender, msg.value);
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

    receive() external payable {
        revert("Direct payments not allowed, use the buy function");
    }
}