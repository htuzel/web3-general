const {
    expect
} = require("chai");
const {
    ethers
} = require("hardhat");
const {
    set,
    reset
} = require("mockdate")

describe("Crypto Devs", function () {
    const contracts = {
        whitelist: null,
        cryptoDevs: null
      }
    beforeEach(async () => {
        const Whitelist = await ethers.getContractFactory("Whitelist");
        const whitelist = await Whitelist.deploy("10");
        await whitelist.deployed();
        const CryptoDevs = await ethers.getContractFactory("CryptoDevs");
        contracts.cryptoDevs = await CryptoDevs.deploy("10", whitelist.address);
        await whitelist.addAddressToWhitelist();
    })

    it("Presale is started", async function () {
        result = contracts.cryptoDevs.startPresale();
        expect(await contracts.cryptoDevs.presaleStarted()).to.equal(true);
    });

    it("Presale is paused", async function () {

        result = contracts.cryptoDevs.setPaused(true);
        expect(await contracts.cryptoDevs._paused()).to.equal(true);
        result = contracts.cryptoDevs.setPaused(false);
        expect(await contracts.cryptoDevs._paused()).to.equal(false);
    });
});