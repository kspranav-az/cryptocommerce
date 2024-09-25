// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract AccessControl {
    address public admin;

    mapping(address => bool) public authorizedUsers;

    event UserAuthorized(address user);
    event UserDeauthorized(address user);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function setAdmin(address newAdmin) public onlyAdmin {
        require(newAdmin != address(0), "Invalid address");
        admin = newAdmin;
    }

    // Authorize a user
    function authorizeUser(address user) public onlyAdmin {
        authorizedUsers[user] = true;
        emit UserAuthorized(user);
    }

    // Deauthorize a user
    function deauthorizeUser(address user) public onlyAdmin {
        authorizedUsers[user] = false;
        emit UserDeauthorized(user);
    }

    // Check if user is authorized
    function isUserAuthorized(address user) public view returns (bool) {
        return authorizedUsers[user];
    }
}