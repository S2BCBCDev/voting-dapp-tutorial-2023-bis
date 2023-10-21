const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying ElectionNFT contract with the account:", deployer.address);

  const electionNFTContract = await hre.ethers.getContractFactory("ElectionNFT");
  const deployedElectionNFTContract = await electionNFTContract.deploy("0xa8E7220367bF8487371e6e02D651439B74E00720");

  console.log(`ElectionNFT Contract Address deployed: ${deployedElectionNFTContract.address}`);

  const deploymentInfo = `Deployer Address: ${deployer.address}\nContract Address: ${deployedElectionNFTContract.address}`;


  console.log(`ElectionNFT Contract Address deployed: ${deployedElectionNFTContract.address}`);
  fs.writeFileSync('deploymentInfoNFT.txt', deploymentInfo);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
