const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying ElectionNFT contract with the account:", deployer.address);

  const electionNFTContract = await hre.ethers.getContractFactory("ElectionNFT");
  const deployedElectionNFTContract = await electionNFTContract.deploy("0x559e33d6091c4c06f20419d0Ed36b25275F64f59");

  console.log(`ElectionNFT Contract Address deployed: ${deployedElectionNFTContract.address}`);

  const deploymentInfo = `Deployer Address: ${deployer.address}\nContract Address: ${deployedElectionNFTContract.address}`;


  console.log(`ElectionNFT Contract Address deployed: ${deployedElectionNFTContract.address}`);
  fs.writeFileSync('deploymentInfoNFT.txt', deploymentInfo);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
