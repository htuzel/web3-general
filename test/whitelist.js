const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Whitelist", function () {
  it("Should return the if it is whitelisted", async function () {
    const [owner] = await ethers.getSigners();
    const Whitelist = await ethers.getContractFactory("Whitelist");
    const whitelist = await Whitelist.deploy("10");
    await whitelist.deployed();
    expect(await whitelist.maxWhitelistedAddresses()).to.equal(10);
    var result = await whitelist.addAddressToWhitelist();
    expect(await whitelist.numAddressesWhitelisted()).to.equal(1);
    expect(await whitelist.whitelistedAddresses(owner.address)).to.equal(true);
  });
});
