const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const marketplace = await ethers.getContractFactory("Marketplace");
  const Marketplace = await marketplace.deploy();
  console.log(`contract deployed at ${Marketplace.address}`);

  const data = {
    address: Marketplace.address,
    abi: JSON.parse(Marketplace.interface.format("json")),
  };

  fs.writeFileSync(
    ".././src/components/Marketplace.json",
    JSON.stringify(data),
    {
      encoding: "utf8",
      mode: 666,
      flag: "w",
    }
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
