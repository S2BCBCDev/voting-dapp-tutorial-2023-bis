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
const addCandidateInput4 = document.querySelector("#addCandidateInput4");
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
const addVoterInputArray = document.querySelector("#addVoterInputArray");
const addVoterButtonArray = document.querySelector("#addVoterButtonArray");
const connectWalletMessageSpan = document.querySelector("#connectWalletMessageSpan");


// Address and ABI of the Voting.sol contract
const contractAddress = '0x9A6bf9fa22Db3e709DE6bE8d830c52cd18433d21';
const contractABI = []

// Address and ABI of the ElectionNFT contract
const electionNFTAddress = '0x26E860c449A7e0430a5C7b694cC75659d462b12C'; // Address of the deployed ElectionNFT contract
const electionNFTABI = []; 

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
    connectWalletBtn.style.backgroundColor = "#019B83ff"; // Change the background color to light green

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
    const candidates = [
      addCandidateInput.value,
      addCandidateInput2.value,
      addCandidateInput3.value,
      ...addCandidateInput4.value.split(",")
  ].filter(Boolean);
    console.log(candidates);
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
            <th><button class="voteBtnRow">Vote</button></th>
        `;
        candidateBoard.appendChild(row);

        const voteRowButton = row.querySelector('.voteBtnRow');
        voteRowButton.addEventListener('click', async () => {
            try {
                const candidateId = candidate.id;
                await contract.voteTo(candidateId);
                console.log("Vote cast successfully!");
            } catch (error) {
                console.error(error);
                console.log("Error casting vote: " + error.message);
            }
        });
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
      connectWalletMessageSpan.innerHTML = `Account connected:<br>${accounts[0]}`;


    } else {
      connectWalletMessageSpan.textContent = "Click connect button please";

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

addVoterButtonArray.addEventListener("click", async () => {
  try {
    const voterAddresses = addVoterInputArray.value.split(',').map(address => address.trim());
    await contract.registerVoters(voterAddresses);
    console.log(`Voters registered successfully!`);
  } catch (error) {
    console.error(error);
    console.log(`Error registering voters: ${error.message}`);
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

// Add this function after your existing code
async function generateAndUploadMetadata() {
  try {
    // Call generateMetadata function in your contract
    const metadata = await contract.generateMetadata();

    // Create JavaScript object
    const electionMetadata = {
        electionID: 1,
        candidateIDs: metadata[0],
        candidateVotes: metadata[2],
        candidateNames: metadata[1],
        winner: await contract.getWinner(),
        startTime: votingStartTimeStamp,
        endTime: votingEndTimeStamp
    };

    // Convert to JSON
    const electionMetadataJSON = JSON.stringify(electionMetadata);

    // Upload to IPFS
    const ipfsResponse = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
        method: 'POST',
        body: new FormData().append('file', new Blob([electionMetadataJSON]))
    });
    const ipfsData = await ipfsResponse.json();

    console.log('IPFS URL:', `https://ipfs.io/ipfs/${ipfsData.Hash}`);
  } catch (error) {
    console.error(error);
    console.log("Error generating and uploading metadata: " + error.message);
  }


const generateAndUploadMetadataButton = document.querySelector("#generateAndUploadMetadataButton");

generateAndUploadMetadataButton.addEventListener("click", async () => {
  await generateAndUploadMetadata();
});


}




