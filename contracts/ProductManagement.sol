// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ProductManagement {
    address public owner;

    struct Product {
        uint256 productId; // ID of the product template
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock; // Total stock available for this product
    }

    struct Item {
        uint256 itemId; // Unique ID for each individual item
        uint256 productId; // Reference to the product template
        string rfidTag; // RFID for tracking
        address currentOwner; // Owner of the item
        bool delivered; // Delivery status
    }

    mapping(uint256 => Product) public products; // Maps product IDs to product templates
    mapping(uint256 => Item) public items; // Maps item IDs to individual items
    mapping(string => uint256) public rfidToItemId; // Maps RFID tags to item IDs

    event ProductCreated(uint256 productId, string name, uint256 cost, uint256 stock);
    event StockUpdated(uint256 productId, uint256 stockAdded);
    event ProductDelivered(uint256 itemId, uint256 productId);
    event ItemBought(uint256 itemId, address buyer, uint256 cost);
    event RFIDAssigned(uint256 itemId, string rfidTag);
    event RFIDReleased(string rfidTag);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Create a new product template
    function createProduct(
        uint256 _productId,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating
    ) public onlyOwner {
        require(products[_productId].productId != _productId, "Product ID already exists");

        Product memory newProduct = Product(_productId, _name, _category, _image, _cost, _rating, 0);
        products[_productId] = newProduct;

        emit ProductCreated(_productId, _name, _cost, 0);
    }

    // Add stock to an existing product
    function addStock(uint256 _productId, uint256 _stockToAdd) public onlyOwner {
        require(products[_productId].productId == _productId, "Product does not exist");

        Product storage product = products[_productId];
        uint256 startStock = product.stock;

        // Create new items for the product
        for (uint256 i = 0; i < _stockToAdd; i++) {
            uint256 newItemId = uint256(keccak256(abi.encodePacked(block.timestamp, _productId, startStock + i)));
            items[newItemId] = Item(newItemId, _productId, "", owner, false);
            product.stock++;
        }

        emit StockUpdated(_productId, _stockToAdd);
    }

    // Assign an RFID tag to an item
    function assignRFID(uint256 _itemId, string memory _rfidTag) public onlyOwner {
        require(items[_itemId].itemId == _itemId, "Item does not exist");
        require(bytes(_rfidTag).length > 0, "Invalid RFID tag");
        require(rfidToItemId[_rfidTag] == 0, "RFID tag already assigned to another item");

        Item storage item = items[_itemId];
        item.rfidTag = _rfidTag;
        rfidToItemId[_rfidTag] = _itemId;

        emit RFIDAssigned(_itemId, _rfidTag);
    }

    // Release an RFID tag from an item after it has been delivered
    function releaseRFID(string memory _rfidTag) public onlyOwner {
        uint256 itemId = rfidToItemId[_rfidTag];
        require(itemId != 0, "RFID tag not associated with any item");

        Item storage item = items[itemId];
        require(item.delivered, "Item not yet delivered");

        item.rfidTag = "";
        rfidToItemId[_rfidTag] = 0;

        emit RFIDReleased(_rfidTag);
    }

    // Mark an item as delivered
    function markDelivered(uint256 _itemId) public onlyOwner {
        require(items[_itemId].itemId == _itemId, "Item does not exist");
        require(!items[_itemId].delivered, "Item already delivered");

        Item storage item = items[_itemId];
        item.delivered = true;

        emit ProductDelivered(_itemId, item.productId);
    }

    // Buy an item
    function buyItem(uint256 _itemId) public payable {
        Item storage item = items[_itemId];
        Product storage product = products[item.productId];

        require(item.itemId == _itemId, "Item does not exist");
        require(!item.delivered, "Item already delivered");
        require(msg.value >= product.cost, "Insufficient funds");

        item.currentOwner = msg.sender;
        item.delivered = false; // Set to false since it's newly purchased

        emit ItemBought(_itemId, msg.sender, product.cost);
    }

    // Get details of a specific product
    function getProduct(uint256 _productId) public view returns (Product memory) {
        return products[_productId];
    }

    // Get details of a specific item
    function getItem(uint256 _itemId) public view returns (Item memory) {
        return items[_itemId];
    }
}
