// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract IntegratedContract {
    address public owner;

    // Struct for Product Information
    struct Product {
        uint256 productId;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    // Struct for Item Information
    struct Item {
        uint256 itemId;
        uint256 productId;
        address currentOwner;
        bool delivered;
    }

    // Struct for Order Information
    struct Order {
        uint256 orderId;
        uint256 itemId;
        address buyer;
        uint256 time;
    }

    // Struct for Crate Information
    struct Crate {
        uint256 crateId;
        uint256[] itemIds;
        address currentOwner;
        bool closed;
        bool delivered;
    }

    // Struct for Location Information
    struct Location {
        string latitude;
        string longitude;
        uint256 timestamp;
    }

    // Mappings
    mapping(uint256 => Product) public products; // productId to Product struct
    mapping(uint256 => Item) public items; // itemId to Item struct
    mapping(uint256 => Order) public orders; // orderId to Order struct
    mapping(uint256 => Crate) public crates; // crateId to Crate struct
    mapping(uint256 => Location[]) public crateLocations; // crateId to list of Locations
    mapping(address => uint256[]) public userOrders; // user to list of orderIds
    mapping(string => uint256) public rfidToItemId; // rfid to itemId

    // Counters for IDs
    uint256 public nextProductId = 1;
    uint256 public nextItemId = 1;
    uint256 public nextOrderId = 1;
    uint256 public nextCrateId = 1;

    // Events
    event ProductCreated(uint256 productId, string name, uint256 cost, uint256 stock);
    event StockUpdated(uint256 productId, uint256 stockAdded);
    event ProductDelivered(uint256 itemId, uint256 productId);
    event OrderPlaced(uint256 orderId, uint256 itemId, address buyer);
    event CrateCreated(uint256 crateId, uint256[] itemIds);
    event CrateDelivered(uint256 crateId);
    event LocationUpdated(uint256 crateId, string latitude, string longitude, uint256 timestamp);
    event CrateOpened(uint256 crateId, string sensorId);
    event CrateDetected(uint256 crateId, string sensorId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Product Management Functions
    function createProduct(
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating
    ) public onlyOwner {
        products[nextProductId] = Product(nextProductId, _name, _category, _image, _cost, _rating, 0);
        emit ProductCreated(nextProductId, _name, _cost, 0);
        nextProductId++;
    }

    function addStock(uint256 _productId, uint256 _stockToAdd) public onlyOwner {
        require(products[_productId].productId == _productId, "Product does not exist");

        for (uint256 i = 0; i < _stockToAdd; i++) {
            items[nextItemId] = Item(nextItemId, _productId, owner, false);
            products[_productId].stock++;
            nextItemId++;
        }

        emit StockUpdated(_productId, _stockToAdd);
    }

    // Order Management Functions
    function placeOrder(uint256 _itemId) public payable {
        require(items[_itemId].itemId == _itemId, "Item does not exist");
        require(!items[_itemId].delivered, "Item already delivered");
        require(products[items[_itemId].productId].cost <= msg.value, "Insufficient funds");

        items[_itemId].currentOwner = msg.sender;
        orders[nextOrderId] = Order(nextOrderId, _itemId, msg.sender, block.timestamp);
        userOrders[msg.sender].push(nextOrderId);

        emit OrderPlaced(nextOrderId, _itemId, msg.sender);
        nextOrderId++;
    }

    function getUserOrders(address _user) public view returns (uint256[] memory) {
        return userOrders[_user];
    }

    // Crate Management Functions
    function createCrate(uint256[] memory _itemIds) public onlyOwner {
        crates[nextCrateId] = Crate(nextCrateId, _itemIds, owner, true, false);
        emit CrateCreated(nextCrateId, _itemIds);
        nextCrateId++;
    }

    function getItemIdsnum(uint256 _crateId) public view returns (uint256) {
        require(crates[_crateId].crateId !=0 , "Crate does not exist");
        return (crates[_crateId]).itemIds.length;
    }


    function getItemId(uint256 _crateId , uint256 idx) public view returns (uint256){
    //require(crates[_crateId] , "Crate does not exist");
    return crates[_crateId].itemIds[idx];
    }


    function deliverCrate(uint256 _crateId) public onlyOwner {
        require(crates[_crateId].crateId == _crateId, "Crate does not exist");
        require(!crates[_crateId].delivered, "Crate already delivered");

        crates[_crateId].delivered = true;
        for (uint256 i = 0; i < crates[_crateId].itemIds.length; i++) {
            uint256 itemId = crates[_crateId].itemIds[i];
            items[itemId].delivered = true;
            emit ProductDelivered(itemId, items[itemId].productId);
        }

        emit CrateDelivered(_crateId);
    }

    // RFID Management Functions
    function updateLocation(
        uint256 _crateId,
        string memory _latitude,
        string memory _longitude
    ) public {
        require(crates[_crateId].crateId == _crateId, "Crate does not exist");
        require(!crates[_crateId].delivered, "Crate already delivered");

        crateLocations[_crateId].push(Location(_latitude, _longitude, block.timestamp));
        emit LocationUpdated(_crateId, _latitude, _longitude, block.timestamp);
    }

    function detectCrate(uint256 _crateId, string memory _sensorId) public {
        require(crates[_crateId].crateId == _crateId, "Crate does not exist");
        require(!crates[_crateId].delivered, "Crate already delivered");

        emit CrateDetected(_crateId, _sensorId);
    }

    function openCrate(uint256 _crateId, string memory _sensorId) public {
        require(crates[_crateId].crateId == _crateId, "Crate does not exist");
        require(crates[_crateId].closed, "Crate is not sealed");

        crates[_crateId].closed = false;
        emit CrateOpened(_crateId, _sensorId);
    }

    function getCrateLocationHistory(uint256 _crateId) public view returns (Location[] memory) {
        require(crates[_crateId].crateId == _crateId, "Crate does not exist");
        return crateLocations[_crateId];
    }

    function getLatestLocation(uint256 _crateId) public view returns (Location memory) {
        require(crates[_crateId].crateId == _crateId, "Crate does not exist");
        require(crateLocations[_crateId].length > 0, "No location data available");

        return crateLocations[_crateId][crateLocations[_crateId].length - 1];
    }

    // Function to withdraw contract balance (for owner)
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }
}