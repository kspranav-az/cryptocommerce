const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("E-commerce Smart Contracts with RFID", function () {
    let ProductManagement, productManagement;
    let OrderManagement, orderManagement;
    let CrateManagement, crateManagement;
    let RfidManagement, rfidManagement;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy ProductManagement contract
        ProductManagement = await ethers.getContractFactory("ProductManagement");
        productManagement = await ProductManagement.deploy();
        await productManagement.deployed();

        // Deploy OrderManagement contract
        OrderManagement = await ethers.getContractFactory("OrderManagement");
        orderManagement = await OrderManagement.deploy();
        await orderManagement.deployed();

        // Deploy CrateManagement contract
        CrateManagement = await ethers.getContractFactory("CrateManagement");
        crateManagement = await CrateManagement.deploy();
        await crateManagement.deployed();

        // Deploy RfidManagement contract
        RfidManagement = await ethers.getContractFactory("RfidManagement");
        rfidManagement = await RfidManagement.deploy();
        await rfidManagement.deployed();
    });

    describe("Product Management", function () {
        it("should allow the owner to list items", async function () {
            await productManagement.listItem(1, "Laptop", "Electronics", "image.png", 1000, 5, 50, "RFID123");
            const item = await productManagement.getItem(1);

            expect(item.name).to.equal("Laptop");
            expect(item.stock).to.equal(50);
        });

        it("should allow the owner to update stock", async function () {
            await productManagement.listItem(1, "Laptop", "Electronics", "image.png", 1000, 5, 50, "RFID123");
            await productManagement.updateItemStock(1, 30);
            const item = await productManagement.getItem(1);

            expect(item.stock).to.equal(30);
        });

        it("should revert if non-owner tries to list items", async function () {
            await expect(
                productManagement.connect(addr1).listItem(2, "Phone", "Electronics", "phone.png", 500, 4, 100, "RFID456")
            ).to.be.revertedWith("Not authorized");
        });
    });

    describe("Order Management", function () {
        it("should allow users to buy items", async function () {
            await productManagement.listItem(1, "Laptop", "Electronics", "image.png", 1000, 5, 50, "RFID123");

            // Buy the item (ensure sufficient ETH is sent)
            await orderManagement.connect(addr1).buyItem(1, { value: ethers.utils.parseEther("1.0") });

            const order = await orderManagement.orders(addr1.address, 1);
            expect(order.item.id).to.equal(1);
        });

        it("should reduce stock after an item is bought", async function () {
            await productManagement.listItem(1, "Laptop", "Electronics", "image.png", 1000, 5, 50, "RFID123");
            await orderManagement.connect(addr1).buyItem(1, { value: ethers.utils.parseEther("1.0") });

            const item = await productManagement.getItem(1);
            expect(item.stock).to.equal(49);
        });

        it("should revert if insufficient funds are sent", async function () {
            await productManagement.listItem(1, "Laptop", "Electronics", "image.png", 1000, 5, 50, "RFID123");

            // Attempt to buy the item with insufficient funds
            await expect(
                orderManagement.connect(addr1).buyItem(1, { value: ethers.utils.parseEther("0.5") })
            ).to.be.revertedWith("Insufficient funds");
        });
    });

    describe("Crate Management", function () {
        it("should allow owner to create a crate", async function () {
            await crateManagement.createCrate([1, 2, 3], "CrateRFID123");

            const crate = await crateManagement.crates(1);
            expect(crate.productIds.length).to.equal(3);
        });

        it("should allow owner to ship a crate", async function () {
            await crateManagement.createCrate([1, 2, 3], "CrateRFID123");
            await crateManagement.shipCrate(1);

            const crate = await crateManagement.crates(1);
            expect(crate.shipped).to.be.true;
        });

        it("should revert if trying to ship an already shipped crate", async function () {
            await crateManagement.createCrate([1, 2, 3], "CrateRFID123");
            await crateManagement.shipCrate(1);

            await expect(crateManagement.shipCrate(1)).to.be.revertedWith("Crate already shipped");
        });
    });

    describe("RFID Management", function () {
        it("should allow owner to update RFID location", async function () {
            await rfidManagement.updateRfidLocation("RFID123", "Warehouse", 1);

            const rfidData = await rfidManagement.getRfidData("RFID123");
            expect(rfidData.location).to.equal("Warehouse");
        });

        it("should revert if non-owner tries to update RFID location", async function () {
            await expect(
                rfidManagement.connect(addr1).updateRfidLocation("RFID123", "Warehouse", 1)
            ).to.be.revertedWith("Not authorized");
        });
    });
});
