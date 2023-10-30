# Blockchain & Solidity Lab1 – Voting dApp Development

### S2BC

### Lab 1 - Developing Ethereum Smart Contracts
- **BUILD** / TEST / INTEGRATE / RUN

---

## To Set Up the Development Environment
### SETUP DEVELOPMENT ENVIRONMENT ON MORPHEUSLABS BPAAS SEED

#### This Hands on Module will build up of 4 Labs:

<!--  add setup -->

1. Developing Ethereum Smart Contracts

2. Test Ethereum Smart Contracts

3. Integrate Smart Contracts with Web3 and establish and run your 1st dApp

4. Run a dApp and considering next steps to create a possible contribution
...

## DEVELOPING ETHEREUM SMART CONTRACTS

We will start this hands-on development course with a smart contract that aims to solve a
problem of traditional centralized voting platforms.

### What is the problem?

Traditional centralized voting systems pose significant security risks and lack transparency. It's challenging to provide concrete evidence of their security measures. Moreover, a central authority can potentially manipulate results, eroding trust in the electoral process.


### What is the solution?

Integrating cryptocurrencies and smart contracts offers a robust solution to address these challenges. This approach empowers supporters by involving them directly in the development and decision-making processes of the projects they choose to back, ensuring transparency and security in the voting system.

### How will it work?

### How will it work?

- **Administrator Role:** An administrator has the authority to initiate an election by specifying candidates, setting a defined time duration, and registering eligible voters. 

- **Voter Registration:** Registered voters are allowed to cast a single vote within the election period.

- **Dynamic Updates:** The administrator retains the flexibility to add candidates and adjust the voting duration as necessary, even after the election has started.

- **Timer Expiry:** Once the timer reaches zero, voting is automatically closed, preventing further participation.

- **End Election:** The administrator can formally conclude the election process, signaling that no more votes can be cast.

- **Result Minting:** After concluding the election, the administrator can initiate the "minting" process, creating unique NFTs for each voter. These NFTs will serve as proof of the winner of the election.

- **Election Reset:** The administrator can choose to reinitialize the election, starting a fresh cycle for a new round of voting.

- **Result Verification:** The NFT collection acts as an immutable record, providing a time-stamped, verifiable history of all transactions within the voting system.

This comprehensive system ensures transparency, security, and integrity throughout the entire voting process, bolstered by the use of NFTs to memorialize the results and actions taken.

### ELEMENTS OF THE APP

#### Variables:

- `electionNFTContract`: Address of the ElectionNFT contract.
- `electionID`: Unique identifier for each election.
- `candidates`: Array holding candidate details, including their ID, name, and the number of votes received.
- `owner`: Address of the contract owner.
- `voters`: Mapping of voter addresses to their voting status.
- `eligibleVoters`: Mapping of addresses eligible to vote.
- `ListOfVoters`: Internal list of addresses who have participated in the election.
- `ListOfVotersEligible`: Internal list of addresses eligible to vote.
- `votingStartTimeStamp`: Timestamp when the voting period starts.
- `votingEndTimeStamp`: Timestamp when the voting period ends.
- `electionStarted`: Status indicating if an election is in progress.

#### Functions:

- `onlyOwner`: Modifier restricting certain functions to be executed only by the contract owner.
- `electionOnGoing`: Modifier ensuring that an election is currently in progress.

- `startElection(_candidates, _votingDuration)`: Function to initiate an election, specifying candidates and duration.
- `voterStatus(_voter)`: Function to check if a voter has already cast their vote.
- `voteTo(_id)`: Function for voters to cast their votes.
- `retrieveVotes()`: Function to get the number of votes received by each candidate.
- `electionTimer()`: Function to monitor the remaining time for the ongoing election.
- `checkElectionPeriod()`: Function to verify if the election period is still ongoing.
- `resetAllVoterStatus()`: Function to reset the status of all voters.
- `resetElection()`: Function to completely reset the entire election process.
- `endElection()`: Function to conclude an ongoing election.
- `removeCandidate(_candidateId)`: Function to remove a candidate from the list.
- `removeAllCandidates()`: Function to remove all candidates.
- `transferOwnership(newOwner)`: Function to transfer ownership of the contract.
- `changeElectionDuration(_newDuration)`: Function to change the duration of the ongoing election.
- `addCandidate(_name)`: Function to add a new candidate.
- `registerVoter(_eligible_voter)`: Function to register a voter.
- `registerVoters(_eligible_voters)`: Function to register multiple voters.
- `mintResultNFTs(_tokenURI)`: Function to mint NFTs for election results.
- `mintResult(_participant, _tokenURI)`: Function to mint an NFT for a participant.
- `setElectionNFTContract(_electionNFTContract)`: Function to set the address of the ElectionNFT contract.

- `getWinnerInfo()`: Function to get information about the winner of the election.
- `generateMetadata()`: Function to generate metadata for the election results.

### A BRIEF INTRODUCTION TO SOME PROGRAMMING BASICS (SKIP, IF YOU HAVE SOME CODING EXPERIENCE)

#### Introduction to Command Line

Chances are, you're working on a computer powered by a Linux, Mac, or Windows Operating System. Mastering the command line is pivotal for the tasks ahead. While you may write your code in editors like Microsoft Visual Studio Code or use Remix for Solidity smart contracts, the command line is indispensable for executing and testing your programs, even on the Morpheus Labs Platform. It's a versatile tool, with one of its primary roles being to leverage the npm package manager for installing necessary packages.

If you're using Windows, you might want to consider using Ubuntu Linux on Windows Subsystem for Linux (WSL) for a smoother experience. WSL provides a Linux environment within your Windows system, greatly benefiting blockchain development.

- **For Linux**: Open the terminal. (Shortcut: CTRL+ALT+T)

- **For Windows (with Ubuntu on WSL)**: Launch the WSL terminal.

- **For Mac**: Utilize the terminal.

- **On Morpheus Labs SEED BPaaS**: Access the terminal. (Ubuntu docker)

When navigating your file system, keep these commands in mind:

- `cd ..` to move up one level.
- `cd <folder name>` to enter a specific folder.

Once you're in the desired folder, you can run your program by typing `<program name>` in the command line. NPM, a potent package manager, will be your go-to tool for installing, updating, and removing packages like Hardhat.


#### Navigating your file system

...

#### Introduction to Basic Programming Concepts

...

### CREATING THE Voting.SOL FILE

...

### CREATING THE ElectionNFT.SOL FILE

...

### DEPLOY COMPILED CONTRACT TO POA NETWORK

...

### Contact

S2BC

---

Now, let's fill in the missing details for each section:

## To Set Up the Development Environment

Provide detailed instructions on how to set up the development environment. This should include steps like:

- Installing necessary software (e.g., Node.js, Solidity compiler)
- Setting up a project directory structure
- Initializing a new Solidity project using Hardhat or any other preferred framework.

## DEVELOPING ETHEREUM SMART CONTRACTS

### What is the problem?

Explain the problem you're addressing with this smart contract. For example, in this case, the problem might be the need for a secure and transparent voting system.

### What is the solution?

Describe how the Ethereum smart contract will solve the identified problem. In this case, it's about creating a smart contract that facilitates a voting system.

### How will it work?

Give a high-level overview of how the smart contract will function. Explain the main components and interactions involved.

### ELEMENTS OF THE APP

#### Variables:

List and briefly explain the key variables used in the smart contract. For example:

- `electionNFTContract`: Address of the ElectionNFT smart contract.
- `candidates`: Array storing information about candidates.

#### Function:

List and briefly explain the main functions in the smart contract. For example:

- `startElection()`: Function to start a new election.
- `voteTo(uint256 _id)`: Function to allow a voter to cast their vote.

### A BRIEF INTRODUCTION TO SOME PROGRAMMING BASICS (SKIP, IF YOU HAVE SOME CODING EXPERIENCE)

#### Introduction to Command Line

Explain basic command line operations relevant to the development process. Include commands for navigating directories, creating files, and running scripts.

#### Navigating your file system

Explain how to navigate the project file system. Provide examples of common file operations.

#### Introduction to Basic Programming Concepts

Give a brief overview of basic programming concepts like variables, loops, and conditional statements. Explain how they will be used in the smart contract.

### CREATING THE Voting.SOL FILE

Explain the purpose of the `Voting.sol` file. Provide a high-level overview of its structure.

### CREATING THE ElectionNFT.SOL FILE

Explain the purpose of the `ElectionNFT.sol` file. Provide a high-level overview of its structure.

### DEPLOY COMPILED CONTRACT TO POA NETWORK

Explain how to deploy the compiled smart contract to a Proof of Authority (POA) network. Include steps for configuring deployment parameters.

### Contact

Provide contact information for any questions or assistance related to this lab.

S2BC

---

Remember to provide detailed and clear instructions for each section. This will help your audience follow along effectively. If you have specific details or code snippets for any section, feel free to insert them accordingly.

## notes
error handling, events handling