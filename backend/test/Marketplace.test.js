const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MarketPlace", async () => {
  let Marketplace, Nfts;
  let buyer, seller;
  beforeEach(async () => {
    [buyer, seller] = await ethers.getSigners();

    const nfts = await ethers.getContractFactory("Nfts");
    Nfts = nfts.deploy();
    const marketplace = await ethers.getContractFactory("Marketplace");
    Marketplace = marketplace.deploy(seller.address, Nfts.address);
  });
});
