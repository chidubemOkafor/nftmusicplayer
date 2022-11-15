const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("MarketPlace", async () => {
  let Marketplace;
  let buyer, seller;
  let toWEI, toWei;
  beforeEach(async () => {
    [buyer, seller] = await ethers.getSigners();

    const marketplace = await ethers.getContractFactory("Marketplace");
    Marketplace = await marketplace.deploy();

    toWei = (val) => (val * 1000000000000000000).toString();
    toWEI = (val) => ethers.utils.parseEther(val.toString());
  });

  describe("createToken", async () => {
    beforeEach(async () => {
      const tokenUri =
        "https://gateway.pinata.cloud/ipfs/QmZNRnT17a8TjsWPRtQjeCGhkMECkTSWRijKnmpq8tduC1";
      Marketplace.connect(seller).createToken(tokenUri, toWEI(5), {
        value: toWEI(0.02),
      });
    });

    it("transfers ownership", async () => {
      assert.equal(await Marketplace.ownerOf(1), Marketplace.address);
    });

    it("confirm if token is listed ", async () => {
      assert.equal(await Marketplace.isListed(1), true);
    });

    it("confirms the price of nft listed", async () => {
      assert.equal(await Marketplace.price(1), toWei(5));
    });

    it("asserts if createtokenfee has been sent", async () => {
      const balance = await Marketplace.getBalance();
      assert.equal(balance, toWei(0.02));
    });

    describe("updatesListPrice", async () => {
      it("updates listed nft price", async () => {
        const newPrice = toWei(20);
        const update = await Marketplace.updateListPrice(1, newPrice);
        await update.wait();
        assert.equal(await Marketplace.price(1), newPrice);
      });
    });

    describe("buy", async () => {
      it("buys the nft", async () => {
        let transaction = await Marketplace.connect(seller).approve(
          buyer.address,
          1
        );
        transaction = await Marketplace.connect(buyer).buy(1, {
          value: toWEI(5),
        });
        await Marketplace.wait();
      });
    });
  });
});
