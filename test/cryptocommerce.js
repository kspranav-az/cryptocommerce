const { expect } = require("chai")

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

// Global constants for listing an item...
const ID = 1
const NAME = "Shoes"
const CATEGORY = "Clothing"
const IMAGE = "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg"
const COST = tokens(1)
const RATING = 4
const STOCK = 5

describe("Cryptocommerce", () => {
    let cryptocommerce
    let deployer, buyer

    beforeEach(async () => {
        // Setup accounts
        [deployer, buyer] = await ethers.getSigners()

        // Deploy contract
        const Cryptocommerce = await ethers.getContractFactory("Cryptocommerce")
        cryptocommerce = await Cryptocommerce.deploy()
    })

    describe("updateRfidLocation", () => {
        it("Allows owner to update RFID location", async () => {
            const transaction = await cryptocommerce
                .connect(deployer)
                .updateRfidLocation(RFID_TAG, LOCATION);
            await transaction.wait();

            const rfidData = await cryptocommerce.getRfidData(RFID_TAG);
            expect(rfidData.location).to.equal(LOCATION);
        });

        it("Emits RfidLocationUpdated event", async () => {
            await expect(
                cryptocommerce.connect(deployer).updateRfidLocation(RFID_TAG, LOCATION)
            )
                .to.emit(cryptocommerce, "RfidLocationUpdated")
                .withArgs(deployer.address, RFID_TAG, LOCATION, anyValue); // anyValue is used to match the timestamp
        });

        it("Reverts if RFID tag or location is invalid", async () => {
            await expect(
                cryptocommerce.connect(deployer).updateRfidLocation("", LOCATION)
            ).to.be.revertedWith("Invalid RFID tag");

            await expect(
                cryptocommerce.connect(deployer).updateRfidLocation(RFID_TAG, "")
            ).to.be.revertedWith("Invalid location");
        });
    });

    describe("getRfidData", () => {
        beforeEach(async () => {
            // Update RFID location
            const transaction = await cryptocommerce
                .connect(deployer)
                .updateRfidLocation(RFID_TAG, LOCATION);
            await transaction.wait();
        });

        it("Returns correct RFID data", async () => {
            const rfidData = await cryptocommerce.getRfidData(RFID_TAG);
            expect(rfidData.location).to.equal(LOCATION);
            expect(rfidData.timestamp).to.be.greaterThan(0); // Timestamp should be a valid number
        });
    });


    describe("Deployment", () => {
        it("Sets the owner", async () => {
            expect(await cryptocommerce.owner()).to.equal(deployer.address)
        })
    })

    describe("Listing", () => {
        let transaction

        beforeEach(async () => {
            // List a item
            transaction = await cryptocommerce.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
            await transaction.wait()
        })

        it("Returns item attributes", async () => {
            const item = await cryptocommerce.items(ID)

            expect(item.id).to.equal(ID)
            expect(item.name).to.equal(NAME)
            expect(item.category).to.equal(CATEGORY)
            expect(item.image).to.equal(IMAGE)
            expect(item.cost).to.equal(COST)
            expect(item.rating).to.equal(RATING)
            expect(item.stock).to.equal(STOCK)
        })

        it("Emits List event", () => {
            expect(transaction).to.emit(cryptocommerce, "List")
        })
    })

    describe("Buying", () => {
        let transaction

        beforeEach(async () => {
            // List a item
            transaction = await cryptocommerce.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
            await transaction.wait()

            // Buy a item
            transaction = await cryptocommerce.connect(buyer).buy(ID, { value: COST })
            await transaction.wait()
        })


        it("Updates buyer's order count", async () => {
            const result = await cryptocommerce.orderCount(buyer.address)
            expect(result).to.equal(1)
        })

        it("Adds the order", async () => {
            const order = await cryptocommerce.orders(buyer.address, 1)

            expect(order.time).to.be.greaterThan(0)
            expect(order.item.name).to.equal(NAME)
        })

        it("Updates the contract balance", async () => {
            const result = await ethers.provider.getBalance(cryptocommerce.address)
            expect(result).to.equal(COST)
        })

        it("Emits Buy event", () => {
            expect(transaction).to.emit(cryptocommerce, "Buy")
        })
    })

    describe("Withdrawing", () => {
        let balanceBefore

        beforeEach(async () => {
            // List a item
            let transaction = await cryptocommerce.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
            await transaction.wait()

            // Buy a item
            transaction = await cryptocommerce.connect(buyer).buy(ID, { value: COST })
            await transaction.wait()

            // Get Deployer balance before
            balanceBefore = await ethers.provider.getBalance(deployer.address)

            // Withdraw
            transaction = await cryptocommerce.connect(deployer).withdraw()
            await transaction.wait()
        })

        it('Updates the owner balance', async () => {
            const balanceAfter = await ethers.provider.getBalance(deployer.address)
            expect(balanceAfter).to.be.greaterThan(balanceBefore)
        })

        it('Updates the contract balance', async () => {
            const result = await ethers.provider.getBalance(cryptocommerce.address)
            expect(result).to.equal(0)
        })
    })
})