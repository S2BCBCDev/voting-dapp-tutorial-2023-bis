const connectWalletMsg = document.querySelector("#connectWalletMessage");
const connectWalletBtn = document.querySelector("#connectWalletbutton");
const votingStation = document.querySelector("#votingStation");
const timerTime = document.querySelector("#time");
const timerMessage = document.querySelector("#timerMessage");
const mainBoard = document.querySelector("#mainBoard");
const voteForm = document.querySelector("#voteForm");
const vote = document.querySelector("#vote");
const voteBtn = document.querySelector("#sendVote");
const showResultContainer = document.querySelector("#showResultContainer");
const showResult = document.querySelector("#showResult");
const result = document.querySelector("#result");
const admin = document.querySelector("#admin");
const addCandidateInput = document.querySelector("#addCandidateInput");
const specifyDuration = document.querySelector("#specifyDuration");
const startElectionButton = document.querySelector("#startElectionButton");
const addCandidateInputBonus = document.querySelector("#addCandidateInputBonus");
const addCandidateButton = document.querySelector("#addCandidateButton");
const resetBtn = document.querySelector("#resetElectionButton");
const changeElectionDurationInput = document.querySelector("#changeElectionDurationInput");
const changeElectionDurationButton = document.querySelector("#changeElectionDurationButton");
const saveResultsNFTInput = document.querySelector("#saveResultsNFTInput");
const saveResultsNFTButton = document.querySelector("#saveResultsNFTButton");
const addVoterInput = document.querySelector("#addVoterInput");
const addVoterButton = document.querySelector("#addVoterButton");

// configure ethers
const contractAddress = '0x9A6bf9fa22Db3e709DE6bE8d830c52cd18433d21';

// Load the contract ABI
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "CandidateAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newDuration",
        "type": "uint256"
      }
    ],
    "name": "ElectionDurationChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ElectionFinished",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ElectionReset",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "startTimestamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "endTimestamp",
        "type": "uint256"
      }
    ],
    "name": "ElectionStarted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "candidateId",
        "type": "uint256"
      }
    ],
    "name": "VoteCast",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "numberOfVotes",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newDuration",
        "type": "uint256"
      }
    ],
    "name": "changeElectionDuration",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "checkElectionPeriod",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "electionNFTContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "electionStarted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "electionTimer",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "eligibleVoters",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_participant",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_tokenURI",
        "type": "string"
      }
    ],
    "name": "mintResult",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_tokenURI",
        "type": "string"
      }
    ],
    "name": "mintResultNFTs",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_eligible_voter",
        "type": "address"
      }
    ],
    "name": "registerVoter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_eligible_voters",
        "type": "address[]"
      }
    ],
    "name": "registerVoters",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "removeAllCandidates",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "removeCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "resetAllVoterStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "resetElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveVotes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "numberOfVotes",
            "type": "uint256"
          }
        ],
        "internalType": "struct Voting.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_electionNFTContract",
        "type": "address"
      }
    ],
    "name": "setElectionNFTContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "_candidates",
        "type": "string[]"
      },
      {
        "internalType": "uint256",
        "name": "_votingDuration",
        "type": "uint256"
      }
    ],
    "name": "startElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "voteTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voter",
        "type": "address"
      }
    ],
    "name": "voterStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "votingEndTimeStamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "votingStartTimeStamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const electionNFTAddress = '0xD230dBB05eBB2D4ff3c233A30079d254099f3BA8'; // Address of the deployed ElectionNFT contract
const electionNFTABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_electionContractAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721IncorrectOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721InsufficientApproval",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOperator",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721NonexistentToken",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "electionContractAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "electionId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "getTokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_tokenURI",
        "type": "string"
      }
    ],
    "name": "mintNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_newBaseTokenURI",
        "type": "string"
      }
    ],
    "name": "setBaseTokenURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]; // ABI of the ElectionNFT contract

let contract;
let signer;
let electionNFTContract;

// const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

// Function to connect Metamask
connectWalletBtn.addEventListener("click", async () => {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    // connectWalletBtn.style.display = "none";
    connectWalletBtn.textContent = "Connected";
    connectWalletBtn.style.backgroundColor = "#2ec27eff"; // Change the background color to light green

    const provider = new ethers.providers.Web3Provider(window.ethereum, 11155111);

    provider.send("eth_requestAccounts", []).then(() => {
      console.log("Accounts requested");

      provider.listAccounts().then((accounts) => {
        console.log("List of accounts:", accounts);

        signer = provider.getSigner(accounts[0]);
        contract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Signer and Contract set up");
      });
    });

    votingStation.style.display = "block";
  } catch (error) {
    console.error(error);
    console.log("Error connecting to Metamask. Please make sure it's installed and unlocked.");
  }
});

// Function to start the election
startElectionButton.addEventListener("click", async () => {
  try {
    const candidates = addCandidateInput.value.split(",");
    const votingDuration = specifyDuration.value;

    const provider = new ethers.providers.Web3Provider(window.ethereum, 11155111);


    provider.send("eth_requestAccounts", []).then(() => {
      console.log("Accounts requested");

      provider.listAccounts().then((accounts) => {
        console.log("List of accounts:", accounts);

        signer = provider.getSigner(accounts[0]);
        contract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Signer and Contract set up");
      });
    });

    await contract.startElection(candidates, votingDuration);
    console.log("Election started successfully!");
  } catch (error) {
    console.error(error);
    console.log("Error starting the election: " + error.message);
  }
});



// Function to vote
voteBtn.addEventListener("click", async () => {
  try {
    const candidateId = vote.value;
    await contract.voteTo(candidateId);
    console.log("Vote cast successfully!");
  } catch (error) {
    console.error(error);
    console.log("Error casting vote: " + error.message);
  }
});

// Function to end the election
changeElectionDurationButton.addEventListener("click", async () => {
  try {
    const duration = changeElectionDurationInput.value;
    await contract.changeElectionDuration(duration);
    console.log("Duration changed successfully!");
  } catch (error) {
    console.error(error);
    console.log("Error add duration: " + error.message);
  }
});

// Function to reset Election
resetBtn.addEventListener("click", async () => {
  try {
    await contract.resetElection();
    console.log("Reset successfully!");
  } catch (error) {
    console.error(error);
    console.log("Error reseting: " + error.message);
  }
});

// Function to add candidate
addCandidateButton.addEventListener("click", async () => {
  try {
    const candidateName = addCandidateInputBonus.value;
    await contract.addCandidate(candidateName);
    console.log("Candidate added successfully!");
  } catch (error) {
    console.error(error);
    console.log("Error adding candidate: " + error.message);
  }
});

// Function change election duration
endElectionButton.addEventListener("click", async () => {
  try {
    await contract.endElection();
    console.log("Election ended successfully!");
  } catch (error) {
    console.error(error);
    console.log("Error ending the election: " + error.message);
  }
});


async function displayCandidates() {
  if (contract) {
    const candidates = await contract.retrieveVotes();
    const candidateBoard = document.querySelector("#candidateBoard");
    const rows = candidateBoard.querySelectorAll("tr");

    for (let i = 1; i < rows.length; i++) {
      candidateBoard.removeChild(rows[i]);
    }

    if (candidates.length === 0) {
      const noCandidatesRow = document.createElement("tr");
      noCandidatesRow.innerHTML = `
        <td colspan="3">No candidates yet</td>
      `;
      candidateBoard.appendChild(noCandidatesRow);
    } else {
      candidates.forEach(candidate => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th>${candidate.id || "No ID yet"}</th>
            <th>${candidate.name || "No name yet"}</th>
            <th>${candidate.numberOfVotes || "No vote yet"}</th>
        `;
        candidateBoard.appendChild(row);
      });
    }
  }
}

const provider = new ethers.providers.Web3Provider(window.ethereum, 11155111);

provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  });
});

// Function to Display Candidate
showCandidateList.addEventListener("click", async () => {
  try {

    displayCandidates();
    console.log("display successfully!");

  } catch (error) {
    console.error(error);
    console.log("Error display: " + error.message);
  }
});




// Call displayCandidates() to display candidates when the page loads
displayCandidates();

// Function to check if account is already connected
async function checkAccountConnection() {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      connectWalletBtn.textContent = "Connected";
      connectWalletBtn.style.backgroundColor = "#2ec27eff";
      votingStation.style.display = "block";
    } else {
      // Account is not connected
      // Wait for the user to connect the wallet
    }
  } catch (error) {
    console.error(error);
    alert("Error checking account connection. Please make sure Metamask is installed and unlocked.");
  }
}

// Call checkAccountConnection() at the startup of the page
window.addEventListener('DOMContentLoaded', checkAccountConnection);

// Function to update the timer message
function updateTimerMessage(seconds) {
  const timerMessage = document.getElementById("time");
  timerMessage.textContent = seconds;
  timerMessage.innerHTML = `<span id="time">${seconds}</span> seconds left`;
}

// calling contract.electionTimer() inside an async function
async function showTimer() {
  try {
    let secondsLeft = await contract.electionTimer();
    console.log("Seconds left:", secondsLeft); // Added console.log
    updateTimerMessage(secondsLeft);

    // ...
  } catch (error) {
    console.error("Error:", error); // Added console.error
    // Handle errors
  }
}

console.log("Event listener set up");
document.getElementById("showTimerButton").addEventListener("click", async () => {
  await showTimer();
  console.log("Timer displayed successfully!");
  // Automatically refresh the timer every 5 seconds (5000 milliseconds)
  setInterval(async () => {
    await showTimer();
  }, 24000); // Adjust the interval as needed
});

// Function to connect to the ElectionNFT contract
async function connectToElectionNFTContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 11155111);

  provider.send("eth_requestAccounts", []).then(() => {
    console.log("Accounts requested");

    provider.listAccounts().then((accounts) => {
      console.log("List of accounts:", accounts);

      signer = provider.getSigner(accounts[0]);
      electionNFTContract = new ethers.Contract(electionNFTAddress, electionNFTABI, signer);

      console.log("ElectionNFT Contract set up");
    });
  });
}

async function mintResultNFTs(tokenURI) {
  try {
    // Assuming you've already set up the connection to the Election contract and the ElectionNFT contract

    const ListOfVoters = await contract.ListOfVoters(); // Assuming ListOfVoters is a public state variable
    for (let i = 0; i < ListOfVoters.length; i++) {
      const voterAddress = ListOfVoters[i];
      const isEligible = await contract.eligibleVoters(voterAddress);

      if (isEligible) {
        await electionNFTContract.mintNFT(voterAddress, tokenURI);
        console.log(`NFT minted for voter at address ${voterAddress}`);
      }
    }
  } catch (error) {
    console.error(error);
    console.log("Error minting NFTs: " + error.message);
  }
}

// Function to Mint NFT Results
saveResultsNFTButton.addEventListener("click", async () => {
  try {
    const tokenURI = saveResultsNFTInput.value;
    await contract.mintResultNFTs(tokenURI);
    console.log("Mint Results in progress!");
  } catch (error) {
    console.error(error);
    console.log("Error casting Mint Results: " + error.message);
  }
});

addVoterButton.addEventListener("click", async () => {
  try {
      const voterAddress = addVoterInput.value;
      await contract.registerVoter(voterAddress);
      console.log(`Voter ${voterAddress} registered successfully!`);
  } catch (error) {
      console.error(error);
      console.log(`Error registering voter: ${error.message}`);
  }
});


// Listen for the ElectionStarted event
// List all accounts connected to the provider
provider.listAccounts().then(accounts => {

  // Assuming you want to use the first account
  const signer = provider.getSigner(accounts[0]);

  // Assuming you have the contractAddress and contractABI defined
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // Define a filter for the ElectionStarted event
  const filter = contract.filters.ElectionStarted();

  // Set up an event listener for the ElectionStarted event
  contract.on(filter, (fromBlock, data, event) => {
    console.log("StartElection event!"); // Access event arguments here
  });

  // Listen for the VoteCast event
  const voteCastFilter = contract.filters.VoteCast();

  contract.on(voteCastFilter, (fromBlock, data, event) => {
    console.log("VoteCast event!");
  });

  // Listen for the ElectionFinished event
  const electionFinishedFilter = contract.filters.ElectionFinished();

contract.on(electionFinishedFilter, (fromBlock, data, event) => {
  console.log("ElectionFinished event!");
});

  // Listen for the ElectionReset event
  const electionResetFilter = contract.filters.ElectionReset();

  contract.on(electionResetFilter, (fromBlock, data, event) => {
    console.log("ElectionReset event!"); // Access event arguments here
  });


});


