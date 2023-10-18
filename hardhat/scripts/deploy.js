
const hre = require("hardhat");
const fs = require('fs');



async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const votingContract = await hre.ethers.getContractFactory("Voting");
  const deployedVotingContract = await votingContract.deploy();

  const deploymentInfo = `Deployer Address: ${deployer.address}\nContract Address: ${deployedVotingContract.address}`;


  console.log(`Voting Contract Address deployed: ${deployedVotingContract.address}`);
  fs.writeFileSync('deploymentInfo.txt', deploymentInfo);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});