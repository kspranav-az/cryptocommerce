const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IntegratedContract", function () {
    let integratedContract;
    let owner;
    let addr1;

    before(async function () {
        // Get the contract factory and deploy it
        const IntegratedContract = await ethers.getContractFactory("IntegratedContract");
        integratedContract = await IntegratedContract.deploy();
        await integratedContract.waitForDeployment();

        [owner, addr1] = await ethers.getSigners();
    });

    describe("Product Management", function () {
        it("should create a product", async function () {
            await integratedContract.createProduct("Product A", "Category A", "image_url", ethers.utils.parseEther("1.0"), 5);
            const product = await integratedContract.products(1);

            expect(product.name).to.equal("Product A");
            expect(product.cost).to.equal(ethers.utils.parseEther("1.0"));
            expect(product.stock).to.equal(0);
        });

        it("should add stock to a product", async function () {
            await integratedContract.addStock(1, 10);
            const product = await integratedContract.products(1);

            expect(product.stock).to.equal(10);
        });
    });

    describe("Order Management", function () {
        it("should place an order", async function () {
            // First, add stock to the product
            await integratedContract.addStock(1, 1);
            await integratedContract.placeOrder(1, { value: ethers.utils.parseEther("1.0") });

            const order = await integratedContract.orders(1);
            expect(order.buyer).to.equal(owner.address);
            expect(order.itemId).to.equal(1);
        });

        it("should retrieve user orders", async function () {
            const userOrders = await integratedContract.getUserOrders(owner.address);
            expect(userOrders.length).to.equal(1);
        });
    });

    describe("Crate Management", function () {
        it("should create a crate", async function () {
            await integratedContract.createCrate([1, 2, 3]);
            const crate = await integratedContract.crates(1);

            // Ensure the crate is properly created and itemIds are set
            expect(crate.currentOwner).to.equal(owner.address);
            expect(crate.itemIds.length).to.equal(3); // Check that 3 itemIds are set
        });

        it("should deliver a crate", async function () {
            await integratedContract.deliverCrate(1);
            const crate = await integratedContract.crates(1);

            expect(crate.delivered).to.equal(true);
        });
    });

    describe("Location Management", function () {
        it("should update crate location", async function () {
            // Create a crate before delivering to ensure it's still open
            await integratedContract.createCrate([1, 2, 3]); // Ensure crate is open
            await integratedContract.updateLocation(2, "12.3456", "78.9101"); // Update location
            const locations = await integratedContract.getCrateLocationHistory(2);

            expect(locations.length).to.be.greaterThan(0);
            expect(locations[0].latitude).to.equal("12.3456");
            expect(locations[0].longitude).to.equal("78.9101");
        });
    });

    describe("Financial Management", function () {
        it("should allow the owner to withdraw funds", async function () {
            // Assuming there are funds to withdraw
            const initialBalance = await ethers.provider.getBalance(owner.address);
            await integratedContract.withdraw();
            const finalBalance = await ethers.provider.getBalance(owner.address);

            expect(finalBalance).to.be.greaterThan(initialBalance);
        });
    });
});
