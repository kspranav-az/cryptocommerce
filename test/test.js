const { expect } = require("chai");
const { ethers } = require("hardhat");

// Global constants for listing an item...
const ID = 1;
const NAME = "Shoes";
const CATEGORY = "Clothing";
const IMAGE = "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg";
const COST = ethers.utils.parseEther("1"); // Assuming tokens(1) means 1 ether
const RATING = 4;
const STOCK = 5;

describe("Supply Chain Contracts", function () {
    let productManagement;
    let orderManagement;
    let crateManagement;
    let rfidManagement;
    let accessControl;

    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        const ProductManagement = await ethers.getContractFactory("ProductManagement");
        productManagement = await ProductManagement.deploy();

        const OrderManagement = await ethers.getContractFactory("OrderManagement");
        orderManagement = await OrderManagement.deploy();

        const CrateManagement = await ethers.getContractFactory("CrateManagement");
        crateManagement = await CrateManagement.deploy();

        const RfidManagement = await ethers.getContractFactory("RfidManagement");
        rfidManagement = await RfidManagement.deploy();

        const AccessControl = await ethers.getContractFactory("AccessControl");
        accessControl = await AccessControl.deploy();
    });

    describe("Product Management", function () {
        it("Should list a new product", async function () {
            await productManagement.listItem(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK, "RFID_001");

            const item = await productManagement.getItem(ID);
            expect(item.name).to.equal(NAME);
            expect(item.cost).to.equal(COST);
            expect(item.stock).to.equal(STOCK);
        });

        it("Should update product stock", async function () {
            await productManagement.listItem(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK, "RFID_002");
            await productManagement.updateItemStock(ID, 60);

            const item = await productManagement.getItem(ID);
            expect(item.stock).to.equal(60);
        });
    });

    describe("Order Management", function () {
        it("Should allow a user to buy a product", async function () {
            await productManagement.listItem(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK, "RFID_003");
            await orderManagement.connect(addr1).buyItem(ID, { value: COST });

            const order = await orderManagement.orders(addr1.address, 1);
            expect(order.item.name).to.equal(NAME);
            expect(await productManagement.getItem(ID)).to.have.property('stock').that.equals(STOCK - 1);
        });

        it("Should not allow buying out of stock product", async function () {
            await productManagement.listItem(ID, NAME, CATEGORY, IMAGE, COST, RATING, 0, "RFID_004");
            await expect(orderManagement.connect(addr1).buyItem(ID, { value: COST })).to.be.revertedWith("Out of stock");
        });
    });

    describe("Crate Management", function () {
        it("Should create a crate with products", async function () {
            await productManagement.listItem(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK, "RFID_005");
            await productManagement.listItem(2, "Product F", CATEGORY, IMAGE, COST, RATING, STOCK, "RFID_006");

            await crateManagement.createCrate([ID, 2], "RFID_Crate_001");

            const productsInCrate = await crateManagement.getProductsInCrate(1); // Assuming crate ID is 1
            expect(productsInCrate).to.include.members([ID, 2]);
        });

        it("Should ship a crate", async function () {
            await crateManagement.createCrate([ID, 2], "RFID_Crate_002");
            await crateManagement.shipCrate(1);

            const crate = await crateManagement.crates(1);
            expect(crate.shipped).to.equal(true);
        });
    });

    describe("RFID Management", function () {
        it("Should update RFID location", async function () {
            await rfidManagement.updateRfidLocation("RFID_001", "Warehouse A", 1);
            const rfidData = await rfidManagement.getRfidData("RFID_001");

            expect(rfidData.location).to.equal("Warehouse A");
            expect(rfidData.crateId).to.equal(1);
        });
    });

    describe("Access Control", function () {
        it("Should allow admin to authorize a user", async function () {
            await accessControl.authorizeUser(addr1.address);
            expect(await accessControl.isUserAuthorized(addr1.address)).to.equal(true);
        });

        it("Should allow admin to deauthorize a user", async function () {
            await accessControl.authorizeUser(addr1.address);
            await accessControl.deauthorizeUser(addr1.address);
            expect(await accessControl.isUserAuthorized(addr1.address)).to.equal(false);
        });
    });
});
