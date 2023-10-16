const { ethers } = require('ethers');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from .env file

 

async function main() {
  // Load the contract ABI
  const filePath = './Voting.json';
  const fileContent = fs.readFileSync(filePath);
  const contractData = JSON.parse(fileContent);
  const contractABI = contractData.abi;

 // Connect to Ganache
  // const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
//   const provider = new ethers.providers.JsonRpcProvider('http://bops.morpheuslabs.io:25295');
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

// Define your private key
const privateKey = process.env.PRIVATE_KEY;

//   const signer = provider.getSigner();
const signer = new ethers.Wallet(privateKey, provider);

  // Load the contract
  const contractAddress = process.env.CONTRACT_ADDRESS; // Replace with your actual contract address
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // Start an election (assuming the contract has a startElection function)
  const startTx = await contract.startElection(['Candidate 1', 'Candidate 2', 'Candidate-test3', 'Candidate-test4', 'Candidate-test5', 'Candidate-test6'], 10);
  await startTx.wait();
}

main().catch((error) => {
  console.error('Error:', error);
});