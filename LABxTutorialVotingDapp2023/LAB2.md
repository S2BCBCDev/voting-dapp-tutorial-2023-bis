# Blockchain & Solidity Lab2 – Voting dApp Development

### S2BC

<div style="text-align: center;">
  <img src="s2bc-logo.svg" alt="Alt text" width="96" height="96">
</div>

---

### Lab 2: Testing Ethereum Smart Contracts with Hardhat

- BUILD / **TEST** / INTEGRATE / RUN

---

**Objective:** In this lab, we will focus on testing Ethereum Smart Contracts using Hardhat. Testing is a crucial step in the development process to ensure the reliability and security of your smart contracts.

### Table of Contents

1. [Introduction to Testing Ethereum Smart Contracts](#introduction-to-testing-ethereum-smart-contracts)
2. [Writing Tests for the "Voting" Smart Contract](#writing-tests-for-the-voting-smart-contract)
3. [Voting.test.js (complete code)](#voting-test-js)
4. [Running the Tests](#running-the-tests)

---

## Introduction to Testing Ethereum Smart Contracts

<a name="introduction-to-testing-ethereum-smart-contracts"></a>

In this section, we'll explore the importance of testing smart contracts and how it ensures the integrity of the blockchain application. Testing helps identify and fix potential vulnerabilities in your code before deployment.

### The Contract Testing Object

The testing object in Solidity is a critical component for writing comprehensive test cases. It allows you to simulate various scenarios and interactions with your smart contracts to ensure they function as intended.

### Running the Tests

To run tests using Hardhat, follow these steps:

1. Ensure you have Hardhat installed in your development environment.
2. Create a new directory for your tests and write test files using the testing object discussed earlier.
3. Use the Hardhat command-line interface (CLI) to execute the tests.
4. Review the output for any failed tests and debug accordingly.

### Best Practices for Smart Contract Testing

Writing effective test cases is crucial for contract security. Here are some best practices to consider:

- Use descriptive test case names to clearly indicate the purpose of each test.
- Write assertions to validate contract behavior. This ensures that contracts function as expected.
- Test edge cases and potential failure scenarios to cover all possible outcomes.

### Integration with Hardhat

Integrating Hardhat into your development workflow is straightforward and highly beneficial for efficient testing. Follow these steps:

1. Add Hardhat as a development dependency in your project.
2. Configure your Hardhat environment to suit your specific needs, including network configurations and plugins.
3. Write tests using the testing object and run them using the Hardhat CLI.

---

### Writing Tests for the "Voting" Smart Contract

<a name="writing-tests-for-the-voting-smart-contract"></a>

#### 1. **Create a Test File:**

- Create a new file named `Voting.test.js` in your hardhat/test folder.

#### 2. **Import Dependencies:**

- Import the necessary dependencies, including the testing library (chai) and ethers.

```javascript
const { expect } = require("chai");
```

#### 3. **Setup Test Environment:**

- Create a describe block for the "Voting Contract" test suite. Inside, declare variables for the Voting contract, deployed instance, owner, and two additional addresses.

```javascript
describe("Voting Contract", function () {
    let Voting;  // Declare variable for the Voting contract
    let voting;  // Declare variable for the deployed instance of the Voting contract
    let owner;   // Declare variable for the owner of the contract
    let addr1;   // Declare variable for address 1
    let addr2;   // Declare variable for address 2
```

#### 4. **Deploy a Fresh Instance Before Each Test:**

- Use the `beforeEach` hook to deploy a fresh instance of the Voting contract before each test.

```javascript
beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const VotingFactory = await ethers.getContractFactory("Voting");
    voting = await VotingFactory.deploy();
    Voting = await VotingFactory.connect(owner);
});
```

#### 5. **Write Test Cases:**

- Write test cases to check the correct owner after deployment, starting an election with the correct parameters, and handling voter registration and voting check.

```javascript
it("should have the correct owner after deployment", async function () {
    expect(await voting.owner()).to.equal(owner.address);
});

it("should start an election with the correct parameters", async function () {
    // Test logic for starting an election
    // Assertions related to election start
});

it("should handle voter registration and voting", async function () {
    // Test logic for voter registration and voting
    // Assertions related to the voting process
});
```

#### 6. **Example Test Logic for "Start an Election":**

- Within the second test case, write logic to start an election with specific parameters and make assertions related to the election start.

```javascript
it("should start an election with the correct parameters", async function () {
    const electionTitle = "Test Election";
    const candidates = ["Candidate1", "Candidate2"];
    const votingDuration = 10; // in minutes

    await voting.startElection(electionTitle, candidates, votingDuration);

    expect(await voting.electionStarted()).to.be.true;
    // Additional assertions related to the election start
    // ...
});
```

#### 7. **Closing the Describe Block:**

- Close the describe block.

```javascript
});
```

## Voting.test.js

<a name="voting-test-js"></a>

```
const { expect } = require("chai");

// Describe block for the Voting Contract test suite
describe("Voting Contract", function () {
    let Voting;  // Declare variable for the Voting contract
    let voting;  // Declare variable for the deployed instance of the Voting contract
    let owner;   // Declare variable for the owner of the contract
    let addr1;   // Declare variable for address 1
    let addr2;   // Declare variable for address 2

    // Before each test case, deploy a fresh instance of the Voting contract
    beforeEach(async function () {
        // Get signers (addresses) from ethers
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy the Voting contract using the factory
        const VotingFactory = await ethers.getContractFactory("Voting");
        voting = await VotingFactory.deploy();

        // Connect the contract factory to the owner
        Voting = await VotingFactory.connect(owner);
    });

    // Test case 1: Should check if the correct owner is set after deployment
    it("should have the correct owner after deployment", async function () {
        // Assert that the owner of the contract is equal to the expected owner's address
        expect(await voting.owner()).to.equal(owner.address);
    });

    // Test case 2: Should start an election with the correct parameters
    it("should start an election with the correct parameters", async function () {
        const electionTitle = "Test Election";
        const candidates = ["Candidate1", "Candidate2"];
        const votingDuration = 10; // in minutes

        // Start an election with the specified parameters
        await voting.startElection(electionTitle, candidates, votingDuration);

        // Additional assertions related to the election start
        expect(await voting.electionStarted()).to.be.true;
        expect(await voting.votingStartTimeStamp()).to.not.equal(0);
        expect(await voting.votingEndTimeStamp()).to.not.equal(0);
        expect(await voting.electionTitle()).to.equal(electionTitle);
    });

    // Test case 3: Should handle voter registration and voting
    it("should handle voter registration and voting", async function () {

       // Start an election before registering voters and casting votes
        const electionTitle = "Test Election";
        const candidates = ["Candidate1", "Candidate2"];
        const votingDuration = 10; // in minutes
        await voting.startElection(electionTitle, candidates, votingDuration);

        // Register voters for this specific test scenario
        await voting.registerVoter(addr1.address);
        await voting.registerVoter(addr2.address);
        await voting.registerVoter(owner.address);

        // Cast votes for Candidate with ID 0
        await voting.connect(addr1).voteTo(0);
        await voting.connect(addr2).voteTo(0);
        await voting.connect(owner).voteTo(0);

        // Additional assertions related to the voting process
        const voteCountCandidate0 = (await voting.retrieveVotes())[0].numberOfVotes;

        // Assert various conditions for the voting process, here all voters voted for candidate ID 0, so he should get 3 votes.
        expect(voteCountCandidate0).to.equal(3); // Assuming three voters
    });

    // Add more focused test cases as needed
});

```

## Running the test

<a name="running-the-tests"></a>

1. Make sure you are located into "voting-dapp-2023/hardhat", directory where your `hardhat.config.js` file is located.

2. Run the following command to execute the tests:

```bash
npx hardhat test
```

Hardhat will automatically detect and run all the test files in your `test` directory. It will then display the test results, indicating whether each test case passed or failed.

The output should look like this:

```
$ npx hardhat test


  Voting Contract
    ✔ should have the correct owner after deployment
    ✔ should start an election with the correct parameters (63ms)
    ✔ should handle voter registration and voting (111ms)


  3 passing (2s)
```

## Contact

S2BC
