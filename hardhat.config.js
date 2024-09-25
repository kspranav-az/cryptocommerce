/** @type import('hardhat/config').HardhatUserConfig */

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("@nomicfoundation/hardhat-ethers");
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("@nomicfoundation/hardhat-chai-matchers");

module.exports = {
  solidity: "0.8.27",
};

module.exports = {
  solidity: "0.8.27",
  paths: {
    sources: "./contracts",  // Update this with the correct path to your contracts
    tests: "./test",  // Path to your tests (if they're in the default directory, no need to change)
    cache: "./cache",
    artifacts: "./artifacts"
  }
};

