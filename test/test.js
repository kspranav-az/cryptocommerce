const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require('bignumber.js');

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
        await productManagement.waitForDeployment();

        // Deploy OrderManagement contract
        OrderManagement = await ethers.getContractFactory("OrderManagement");
        orderManagement = await OrderManagement.deploy();
        await orderManagement.waitForDeployment();

        // Deploy CrateManagement contract
        CrateManagement = await ethers.getContractFactory("CrateManagement");
        crateManagement = await CrateManagement.deploy();
        await crateManagement.waitForDeployment();

        // Deploy RfidManagement contract
        RfidManagement = await ethers.getContractFactory("RfidManagement");
        rfidManagement = await RfidManagement.deploy();
        await rfidManagement.waitForDeployment();
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

        // Check the item exists and stock is available
        const item = await productManagement.getItem(1);
        console.log("Item stock before purchase:", item.stock.toString());

        // Buy the item (ensure sufficient ETH is sent)
        await orderManagement.connect(addr1).buyItem(1, { value: ethers.parseEther("1.0") });

        const order = await orderManagement.orders(addr1.address, 1);
        expect(order.item.id).to.equal(1);
    });

    it("should reduce stock after an item is bought", async function () {
        await productManagement.listItem(1, "Laptop", "Electronics", "image.png", 1000, 5, 50, "RFID123");
        await orderManagement.connect(addr1).buyItem(1, { value: ethers.parseEther("1.0") });

        const item = await productManagement.getItem(1);
        console.log("Item stock after purchase:", item.stock.toString());
        expect(item.stock).to.equal(49);
    });
});


    describe("Crate Management", function () {
        it("should allow owner to create a crate", async function () {
            await productManagement.listItem(1, "Laptop", "Electronics", "image.png", 1000, 5, 50, "RFID123");
            await productManagement.listItem(2, "Laptop", "Electronics", "image.png", 1000, 5, 50, "RFID123");
            await productManagement.listItem(3, "Laptop", "Electronics", "image.png", 1000, 5, 50, "RFID123");
            const tx = await crateManagement.createCrate([1, 2, 3], "CrateRFID123");
            const receipt = await tx.wait(); // Wait for the transaction to be mined

            // Extract the event from the receipt
            // const event = receipt.events.find(event => event.event === 'CrateCreated');
            const crateId = ethers.parseEther( receipt.logsBloom ); // Get the crateId from the event arguments
            console.log(`Crate created with ID: ${crateId}`);
            // const  crateId  = (await crateManagement.createCrate([1, 2, 3], "CrateRFID123"));
            //const crate = await crateManagement.crates(crateId)//.value;
            console.log("CrateId ", crateId);
            expect(crateId).to.equal(3);
        });

        it("should allow owner to ship a crate", async function () {
            await crateManagement.createCrate([1, 2, 3], "CrateRFID123");
            await crateManagement.shipCrate(1);

            const crate = await crateManagement.crates(1);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
