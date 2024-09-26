const { ethers } = require("hardhat");
//const {items} = require("../src/items.json")

const token = (n) => {
    return ether.utils.parseUnit(n.toString(),'ether')
}

async function main(){
    const [deployer] = await hre.ethers.getSigners()

    // const accessControl = await ethers.getContractFactory("AccessControl");
    // const rfidManagement = await ethers.getContractFactory("RfidManagement");
    // const orderManagement = await ethers.getContractFactory("OrderManagement");
    // const crateManagement = await ethers.getContractFactory("CrateManagement");
    // const AccessControl = await accessControl.deploy();
    // const RfidManagement = await rfidManagement.deploy();
    // const OrderManagement = await orderManagement.deploy();
    // const CrateManagement= await crateManagement.deploy();
    // await AccessControl.waitForDeployment();
    // await RfidManagement.waitForDeployment();
    // await OrderManagement.waitForDeployment();
    // await CrateManagement.waitForDeployment();

    const integratedContract = await ethers.getContractFactory("IntegratedContract");
    await integratedContract.deploy();

    console.log('Deployed All the contracts')

    await integratedContract.createProduct("Product A", "Category A", "../static/img/headset2.jpg", ethers.parseEther("1.0"), 5);
    await integratedContract.createProduct("Product B", "Category B", "../static/img/hoodie1.jpg", ethers.parseEther("1.0"), 5);
    await integratedContract.createProduct("Product C", "Category C", "../static/img/samsung buds.jpg", ethers.parseEther("1.0"), 5);
    await integratedContract.createProduct("Product D", "Category D", "../static/img/shirt1.jpg", ethers.parseEther("1.0"), 5);
    await integratedContract.createProduct("Product E", "Category E", "..static/img/perfume1.jpg", ethers.parseEther("1.0"), 5);
    await integratedContract.createProduct("Product F", "Category F", "../static/img/saree.jpg", ethers.parseEther("1.0"), 5);

}

main().catch((err) => {
    console.error(err);
    process.exit(1);
})