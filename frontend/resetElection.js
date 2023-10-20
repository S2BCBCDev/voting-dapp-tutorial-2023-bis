const { ethers } = require('ethers');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from .env file
 

async function main() {
  // Load the contract ABI
  const filePath = './Voting.json';
  const fileContent = fs.readFileSync(filePath);
  const contractData = JSON.parse(fileContent);
  const contractABI = contractData.abi;

 // Connect to RPC
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

// Define your private key
const privateKey = process.env.PRIVATE_KEY;

//   const signer = provider.getSigner();
const signer = new ethers.Wallet(privateKey, provider);

 // Load the contract
 const contractAddress = process.env.CONTRACT_ADDRESS; // Replace with your actual contract address
 const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // resetElection
  const resetElection = await contract.resetElection();
  await resetElection.wait();
  console.log('Reset Election done');
}

main().catch((error) => {
  console.error('Error:', error);
});