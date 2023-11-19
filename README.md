# Blockchain & Solidity Voting dApp Tutorial 101 Documentation

## Introduction

Welcome to the Blockchain & Solidity Tutorial! This comprehensive tutorial is designed to provide you with a hands-on learning experience in blockchain development using Solidity, JavaScript, and other essential tools. This tutorial will equip you with the knowledge and skills needed to start developing your own decentralized applications (dApps).

## About the Tutorial

This tutorial is divided into four labs, each focusing on a specific aspect of blockchain and Solidity development. From setting up your development environment to integrating web applications with smart contracts, you'll embark on a step-by-step journey to become proficient in blockchain technology.

### **Lab 1 - Developing Ethereum Smart Contracts**

In this lab, you'll learn the fundamentals of Ethereum smart contract development. We'll cover everything from problem-solving with smart contracts to understanding key programming concepts. By the end of this lab, you'll have developed essential smart contracts for your dApp.

### **Lab 2 - Testing Ethereum Smart Contracts with Hardhat**

Testing is a critical aspect of blockchain development. In this lab, you'll dive into testing your Ethereum smart contracts using the powerful Hardhat framework. You'll learn how to write effective test cases to ensure the reliability and security of your contracts.

### **Lab 3 - Integrate Web App with Smart Contracts**

Now that you've mastered smart contract development and testing, it's time to bring your dApp to life! In this lab, we'll guide you through integrating your smart contracts with a user-friendly web application. You'll learn how to create an interactive interface for users to interact with your dApp.

### **Lab 4 - Run a dApp and Consider Next Steps**

Congratulations on reaching the final lab! Here, we'll discuss crucial considerations for running a dApp and planning for its future contributions. You'll learn about data storage, data migration, gas limits, and more. Plus, we'll guide you on how to share your dApp with a wider audience.

## Prerequisites

Before you begin, make sure you have a basic understanding of JavaScript, Node.js, CSS, and HTML. Familiarity with blockchain concepts is a plus but not required.

Now, let's dive into Lab 1 and start building your first Ethereum smart contracts!


## Specifications

### Stack

- Solidity
- HardHat
- Node
- Javascript
- Metamask
- Morpheus
- Oppen Zeppelin
- IPFS
- EVM testnet (private network)


---

## User Stories

### Administrator Perspective

1. **Start Election**
   - *Objective*: Enable the administrator to commence the election for voter participation.
   - *Functional Specification*: Provide an interface allowing the administrator to add candidates, define the voting duration, and initiate the election.

2. **Add Candidates**
   - *Objective*: Allow the administrator to include new candidates in the list.
   - *Functional Specification*: Provide an interface for the administrator to input candidate names.

3. **End Election**
   - *Objective*: Permit the administrator to conclude the election, preventing further votes.
   - *Functional Specification*: Offer an interface for the administrator to officially conclude the election.

4. **View Election Results**
   - *Objective*: Enable the administrator to review the results for the purpose of announcing the winner.
   - *Functional Specification*: Display the candidates along with the respective number of votes they have received.

5. **New Election**
   - *Objective*: Provide the administrator with the ability to delete and start a new election.
   - *Functional Specification*: Furnish an interface allowing the administrator to reset all variables in order to start a new election.

### User Perspective

6. **Check Election Status**
   - *Objective*: Allow the voter to determine if the election has commenced.
   - *Functional Specification*: Display a message indicating whether the election has begun or not. If started, provide the start and end timestamps of the election period.

7. **View Candidates**
   - *Objective*: Enable the voter to see the list of candidates for an informed decision.
   - *Functional Specification*: Display the names of all candidates along with their respective IDs.

8. **Cast Vote**
   - *Objective*: Enable the voter to submit their vote for a specific candidate.
   - *Functional Specification*: Provide a button or interface for the voter to select a candidate. Upon selection, process the vote.

9. **View Election Period**
   - *Objective*: Allow the voter to see the start and end timestamps of the election.
   - *Functional Specification*: Display the timestamp range for the election period.

10. **Receive NFT of Final Result**
    - *Objective*: Provide the voter with an NFT containing the final election results for verification.
    - *Functional Specification*: Upon concluding the election session through the 'End Election' action, the administrator will generate an NFT containing the election results. This NFT will then be minted and sent to the respective voter’s wallet address.


## Link of interest
### Hardhat

Link to official Hardhat installation documentation:
- https://hardhat.org/hardhat-runner/docs/getting-started#installation