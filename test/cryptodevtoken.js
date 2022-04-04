const {
    expect
} = require("chai");
const {
    ethers,
    waffle
} = require("hardhat");

const {
    CRYPTO_DEVS_NFT_CONTRACT_ADDRESS
} = require("../constants");

describe("Crypto Devs Token", function () {
    var account;
    const contracts = {
        whitelist: null,
        cryptoDevs: null,
        cryptoDevToken: null
      }
    var provider;
    beforeEach(async () => {
        provider = waffle.provider;
        const [owner] = await ethers.getSigners();
        const Whitelist = await ethers.getContractFactory("Whitelist");
        const whitelist = await Whitelist.deploy("10");
        await whitelist.deployed();
        const CryptoDevs = await ethers.getContractFactory("CryptoDevs");
        contracts.cryptoDevs = await CryptoDevs.deploy("10", whitelist.address);
        await whitelist.addAddressToWhitelist();
    })

    it("mint", async function () {
        const CryptoDevToken = await ethers.getContractFactory("CryptoDevToken");
        contracts.cryptoDevToken = await CryptoDevToken.deploy(CRYPTO_DEVS_NFT_CONTRACT_ADDRESS);
        const [owner, addr1] = await ethers.getSigners();

        var addr1Contract = await contracts.cryptoDevToken.connect(addr1);
        var firstBalance = await provider.getBalance(addr1.address);
        var test = await addr1Contract.mint(1, { value: ethers.utils.parseEther("0.0001")});
        var secondBalance = await provider.getBalance(addr1.address);
        expect(firstBalance.gt(secondBalance));
    });

});