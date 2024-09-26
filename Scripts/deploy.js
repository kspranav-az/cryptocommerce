const { ethers } = require("hardhat");
//const {items} = require("../src/items.json")

const token = (n) => {
    return ether.utils.parseUnit(n.toString(),'ether')
}

async function main(){
    const [deployer] = await hre.ethers.getSigners()
    const integratedContract = await ethers.getContractFactory("IntegratedContract");
    const IntegratedContract = await integratedContract.deploy();
    await IntegratedContract.waitForDeployment();
    //
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

    console.log('Deployed All the contracts')

}

main().catch((err) => {
    console.error(err);
    process.exit(1);
})