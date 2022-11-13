require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const MUMBAI_TESTNET_RPC_URL = process.env.MUMBAI_TESTNET_RPC_URL;
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const account = PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [];

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
    mumbai: {
      url: MUMBAI_TESTNET_RPC_URL,
      accounts: account,
      chainId: 80001,
    },
    polygon: {
      url: MAINNET_RPC_URL,
      accounts: account,
      chainId: 137,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
    spender: {
      default: 1,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.1",
      },
    ],
  },
};
