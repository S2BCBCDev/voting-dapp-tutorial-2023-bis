const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
  it("Non-owner should not be allowed to start an election", async function () {
    // Deploy the Voting contract
    const Voting = await ethers.getContractFactory("Voting");
    const votingInstance = await Voting.deploy();
    await votingInstance.deployed();

    // Connect to a wallet to simulate a non-owner address
    const [nonOwner] = await ethers.getSigners();

    // Try to start the election
    try {
      await votingInstance.connect(nonOwner).startElection(["Candidate 1", "Candidate 2"], 60);
      // If the above line doesn't throw an error, the test should fail
      expect(true).to.equal(false); // This line should not be reached
    } catch (error) {
      // Check if the error message contains the expected error message
      expect(error.message).to.contain("not authorized to start election");
    }
  });
});
