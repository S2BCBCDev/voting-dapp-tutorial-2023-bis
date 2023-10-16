const ethers = require('ethers');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from .env file


async function main() {
    try {
        console.time('totalTimeToExectScript'); // Start total timer
        console.log('Starting...check timer');

        // Load the contract ABI
        const filePath = './Voting.json';
        const fileContent = fs.readFileSync(filePath);
        const contractData = JSON.parse(fileContent);
        const contractABI = contractData.abi;
        console.log('Contract ABI loaded!');

        // Connect to Ganache
        const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/ySi48L5bQDYJDO8T5n3zl6XVgEPb8zHT');
        console.log('Connected to provider:');

        // const signer = provider.getSigner();
        console.log('Signer:');

        // Define your private key
        const privateKey = process.env.PRIVATE_KEY;

        // Create a wallet from the private key
        const signer = new ethers.Wallet(privateKey, provider);
        console.log('Signer:');

        // Load the contract
        const contractAddress = '0xe9f62BF7e763A950A796B98fFFE567C436f7ea89'; // Replace with your actual contract address
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log('Contract loaded:', contract.address);

        const owner = await contract.owner();
        const remainingTime = await contract.electionTimer();
        console.log('Remaining time (seconds):', remainingTime.toNumber());
        console.log('Owner is: ', owner);

        const votingEndTimeStamp = await contract.votingEndTimeStamp();
        const votingStartTimeStamp = await contract.votingStartTimeStamp();
        console.log('votingStartTimeStamp is: ', votingStartTimeStamp.toNumber());
        console.log('votingEndTimeStamp is: ', votingEndTimeStamp.toNumber());

        // Call the retrieveVotes function
        const candidates = await contract.retrieveVotes();
        console.log('Candidates:');
        candidates.forEach(Candidate => {
            console.log(`id: ${Candidate.id}, Name: ${Candidate.name}, Votes: ${Candidate.numberOfVotes}`);
        });





    } catch (error) {
        console.error('Error:', error);
    }
    console.timeEnd('totalTimeToExectScript'); // End total timer
    console.log('Done! fullInfo.js script');
}

main();






