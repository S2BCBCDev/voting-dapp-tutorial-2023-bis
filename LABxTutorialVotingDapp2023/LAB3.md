# Blockchain & Solidity Lab3 – Voting dApp Development

### S2BC

<div style="text-align: center;">
  <img src="s2bc-logo.svg" alt="S2BC Logo" width="96" height="96">
</div>

---

### Lab 3: Integrate Web App with Smart Contracts
- BUILD / TEST / **INTEGRATE** / RUN

---

**Objective:** The aim of this Lab3 is to integrate the smart contracts you developed in Lab1 and Lab2 with a Voting dApp for users to access the dApp using the web browser.

---

### Deploy Compiled Smart Contract with Hardhat

To deploy the compiled contract to the Ethereum blockchain network, follow these steps:

#### Step 1: Configure a dotenv (.env) file

First, install the `dotenv` package using the following command:

```bash
npm install dotenv
```

Next, create a `.env` file in the root folder of your HardHat project. This file will contain sensitive information that should be kept secure. Add the following variables to the `.env` file:

```dotenv
# This is the URL of the Ethereum RPC provider
RPC_URL="https://example.com/rpc"

# This is a private key for signing transactions
PRIVATE_KEY="your_private_key_here"

# This is an API key for accessing a specific service
API_KEY="your_api_key_here"

# This is the chain ID for the Ethereum network
CHAIN_ID=12345

# This is the address of a smart contract (optional)
CONTRACT_ADDRESS='0x1234567890abcdef'
```

Make sure to replace the placeholder values with your actual credentials.

#### Step 2: Configure hardhat.config.js

Modify your `hardhat.config.js` file as follows:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
  paths: {
    artifacts: "./src/artifacts",
    contracts: './src/contracts',
  }
};
```


#### Step 3: Create a New Deployment Script

Create a new file named `deploy.js` inside the `hardhat/scripts` directory. Add the following content to the file:

```javascript
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
```

To deploy the contract, use the following command in your terminal:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

The result output from the terminal will provide the contract addresses.

A "deploymentInfo.txt" file will be created with the contract addresses.

---

#### Step 3-bis: Create a New Deployment Script for ElectionNFT contract

Next, deploy the ElectionNFT contract using the address of the previously deployed contract.

Create a new file named `deploy2.js` inside the `hardhat/scripts` directory. Add the following content to the file:

```javascript
const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying ElectionNFT contract with the account:", deployer.address);

  const electionNFTContract = await hre.ethers.getContractFactory("ElectionNFT");
  const deployedElectionNFTContract = await electionNFTContract.deploy("<FIRST CONTRACT ADDRESS>");

  console.log(`ElectionNFT Contract Address deployed: ${deployedElectionNFTContract.address}`);

  const deploymentInfo = `Deployer Address: ${deployer.address}\nContract Address: ${deployedElectionNFTContract.address}`;

  console.log(`ElectionNFT Contract Address deployed: ${deployedElectionNFTContract.address}`);
  fs.writeFileSync('deploymentInfoNFT.txt', deploymentInfo);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Remember to replace `<FIRST CONTRACT ADDRESS>` with the address of the first contract deployed (check `deploymentInfo.txt`).

#### Verify contracts

If you've added your Etherscan API key, you'll be able to verify the contracts using the following command:

```bash
npx hardhat verify <FIRST CONTRACT ADDRESS> --network sepolia
```


---

# Frontend integration
### Setting Up the Frontend

In this section, we will guide you through setting up the frontend of your Voting dApp. Follow these steps to create the necessary folders and files:

### 1. Create a Frontend Folder

Begin by creating a folder named `frontend` within your project directory. This folder will house all the files related to the frontend of your dApp.

Your tree folder should be like:
```
- voting-dapp-2023
   - hardhat
   - frontend
```
So if you were in hardhat folder, come back to your root folder:
```
cd ..
```
then create the frontend folder

```
mkdir frontend
cd frontend
```

### 2. Let's initiate Node.js

```
npm init -y
```
That will create a package.json file into your frontend folder.

### 2. Then install Express.js
```
npm install express
```

Now your package.json file should like like this:
```
{
  "name": "frontend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

That is where you can add more dependencies if needed in the futur.

You have two way to add dependencies:
- use of "npm install express"
or
- add a line "express": "^4.18.2" to the package.json file



### 2. Set Up a Server by creating a server.js file

If your dApp requires server-side functionality, create a file named `server.js` in the `frontend` folder. This file will handle any backend logic your application may need.

Create a server.js file and add thoses lines:

```
// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

```

To test out of the server works you can run:

```
npm start
```

You should get this terminal output:

```
npm start

> frontend@1.0.0 start
> node server.js

Server is running on http://localhost:3000
```

and then be abble to open your explorer and check http://localhost:3000
if the server is runing.

### 2. Create a Public Folder

Inside the `frontend` folder, create a subfolder named `public`. This folder will hold any publicly accessible files, such as HTML and images.

```
mkdir public
cd public
```

The `public folder` is where you store files that can be accessed by users, such as the main HTML file (`index.html`) and client-side JavaScript (`script.js`). As well that where you store the images of the app like the `logo.svg` and `favicon.ico`.



### 3. Create HTML and JavaScript Files

Within the `public` folder, create the following files:

- `index.html`: This is the main HTML file that will serve as the entry point of your web application. You can use this file to structure the layout of your dApp's user interface.

```html
<html>
Server is Up
</html>
```

- `script.js`: This JavaScript file will contain the client-side code that interacts with the smart contracts and updates the UI based on user actions.

```javascript
// JavaScript code will be here
console.log("Server is Up and Running");
```

### 3. Create styles.css Files

Within the `public` folder, create a styles.css file, it will contain the custom styles for your UI.

```css
:root {
    --prussian-blue: #102537ff; /* Main background color */
    --prussian-blue-2: #24344Cff; /* Table background color */
    --oxford-blue: #111A2Eff; /* Alternate background color */
    --oxford-blue-2: #1D283Cff; /* Panel background color */
    --oxford-blue-3: #172237ff; /* Header background color */
    --persian-green: #019B83ff; /* Button background color (e.g., Connect Wallet Button) */
    --blue-ncs: #0684C2ff; /* Border color and accent color */
    --paynes-gray: #5D7084ff; /* Text color and secondary elements */
    --rusty-red: #CA323Eff; /* Alert or error color (e.g., Reinitialise Election Button) */
}


body {
    font-family: 'Roboto Regular', Helvetica, Arial, Lucida, sans-serif;
    background-color: var(--oxford-blue);
    line-height: 1.7em;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0 20px;
    font-size: 1.2em;
    color: #ffffff;
}
```



---

### Frontend Folder Structure

A this point your folder structure should looks like that:
```
- voting-dapp-2023
  - hardhat
  - frontend
    - server.js
    - public
      - index.html
      - script.js
      - styles.css
```        

Test out if the server works again:

```
npm start
```
Then Check http://localhost:3000 in your browser. Open console with F12 and check the console logs after refreshing the page.

```
Server is Up and Running
```

## Building the index.html Page

Let's concentrate on the HTML page for now. We will reference the script.js file, include the ethers CDN link to load the ethers functions into our app, and make them accessible. Afterward, we will design the layout, integrate some buttons, and set up IDs and classes for some elements to make them interactable with the scripts.

### Including Ethers.js CDN link, reference to script.js and style.css

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Voting dApp</title>
    <!-- Include Ethers.js CDN link with crossorigin attribute -->
       <script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js" type="application/javascript"></script>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <div id="votingStation">
        <!-- all the following code into this div -->
    </div>
    <script src="script.js"></script>
</body>

</html>
```

### Create votingStation DIV into `<body></body>`
    
```
<body>
<div id="votingStation">
// all the folowing code into this div
</div>
<script src="script.js"></script>
</body>

```
The votingStation DIV encapsulates all components related to the voting process, making it modular and easy to manage. Each subcomponent, such as wallet connection, panel buttons, and voting forms, resides within this container for a clean and organized structure.

In the upcoming sections, we will continue building upon the votingStation DIV, adding interactive elements and functionalities to create a comprehensive and user-friendly decentralized voting experience. Let's proceed with the next steps to enrich the user interface and interaction capabilities of your voting dApp.

Structure expected:
```
<html>
    <head>
        <!-- Head content goes here -->
    </head>
    <body>
        <!-- Voting Station DIV -->
        <div id="votingStation">
        
            <!-- Logo -->
            <img src="s2bc-logo.svg" alt="S2BC Logo" id="logo">

            <!-- Title -->
            <h1>Voting dApp 2023</h1>
        
            <!-- Connect Wallet Section -->
            <div id="connectWallet">
                <button id="connectWalletbutton">Connect Wallet</button>
                <p id="connectWalletMessage"><span id="connectWalletMessageSpan"></span></p>
            </div>

            <!-- Panel Buttons Section -->
            <div id="buttonPanel">
                <hr class="custom-line">
                <button id="votePanelButton">Vote Panel</button>
                <button id="adminPanelButton">Admin Panel</button>
            </div>

            <!-- Vote Panel and Admin Panel Sections -->
            <div id="votePanel" class="panel">
                <!-- Vote Panel content -->
            </div>

            <div id="admin" class="panel">
                <!-- Admin Panel content -->
            </div>

            <!-- Other sections within the votingStation DIV -->
        </div>
    </body>
</html>
```
### Add a Logo and the app Title

```
<img src="s2bc-logo.svg" alt="S2BC Logo" id="logo">

<h1>Voting dApp 2023</h1>
```



### Add a Connect Button

```
<div id="connectWallet">
    <button id="connectWalletbutton">Connect Wallet</button>
    <p id="connectWalletMessage"><span id="connectWalletMessageSpan"></span></p>
</div>
```

We provide an ID to this button and span message to be abble to interact with it from the javascript code in script.js

### Add Panel Buttons

```html
<div id="buttonPanel">
    <hr class="custom-line">
    <button id="votePanelButton">Vote Panel</button>
    <button id="adminPanelButton">Admin Panel</button>
</div>
```

These buttons, with the IDs `votePanelButton` and `adminPanelButton`, are designed to serve as navigation elements for users interacting with your voting dApp. These IDs will be utilized in your script.js file to enable specific functionalities associated with the vote panel and admin panel.

### Add Voting panel


```html
<div id="votePanel" class="panel">

    <!-- Main board for displaying election information -->
    <div id="mainBoard">

        <!-- Section for displaying election ID and timer -->
        <div id="topBoard">
            <p style="margin-right: 20px;">Election ID: <span id="electionID"></span></p>
            <p id="timerMessage" style="margin-right: 20px;">Timer: <span id="time" onclick="showTimer()">[refresh]</span></p>
        </div>

        <!-- Table for displaying candidates -->
        <table id="candidateBoard">
            <tr>
                <th>ID</th>
                <th>Candidates</th>
                <th>Votes count</th>
                <th>Vote Button</th>
            </tr>
            <!-- Rows for each candidate will be dynamically added here using JavaScript -->
        </table>

    </div>

    <!-- Button to refresh the voting board -->
    <div id="showCandidateListContainer">
        <button id="showCandidateList" onclick="showTimer()">Refresh voting board</button>
    </div>

    <hr class="custom-line">

    <!-- Section for casting a vote -->
    <div id="voteForm">
        <h3>Please enter the candidate's ID for your vote:</h3>
        <label for="">
            <input type="number" id="vote" />
            <button id="sendVote">Send Vote</button>
        </label>
    </div>

</div>
```

Here's a breakdown of what each section does:

1. **Main Board**: This section contains the key information about the ongoing election, including the Election ID and a timer.

2. **Candidate Board Table**: A table where candidate information will be dynamically displayed. The table headers indicate the information presented for each candidate.

3. **Show Candidate List Button**: A button to refresh and display the current voting board.

4. **Vote Form**: This section allows users to cast their votes by entering the candidate's ID and clicking the "Send Vote" button.


### Add Administration panel

And then, to finish with the HTML file, we will add the admin panel div.

```html
<div id="admin" class="panel">

    <!-- Section for starting an election -->
    <div id="startElection">
        <h3 id="startElectionMessage">Start an Election:</h3>
        <input type="text" id="addCandidateInput" placeholder="Candidate 1" />
        <input type="text" id="addCandidateInput2" placeholder="Candidate 2" />
        <input type="text" id="addCandidateInput3" placeholder="Candidate 3" />
        <input type="text" id="addCandidateInput4" placeholder="+ candidates separated by (,) " />
        <p>How long the election will last?:</p>
        <input type="number" id="specifyDuration" placeholder="Duration in minutes" />
        <button id="startElectionButton">Start Election</button>
    </div>

    <hr class="custom-line">

    <!-- Section for registering voters' addresses -->
    <div id="addVoterArray">
        <h3>Register voters' addresses:</h3>
        <input type="text" id="addVoterInputArray" placeholder="+ addresses separated by(,)" />
        <button id="addVoterButtonArray">Register Voters</button>
    </div>

    <hr class="custom-line">

    <!-- Section for changing the election duration -->
    <div id="changeElectionDuration">
        <h3>Change election duration:</h3>
        <input type="number" id="changeElectionDurationInput" />
        <button id="changeElectionDurationButton">Change duration</button>
    </div>

    <hr class="custom-line">

    <!-- Section for adding a candidate to the election -->
    <div id="addCandidate">
        <h3>Add a candidate to the election:</h3>
        <input type="text" id="addCandidateInputBonus" />
        <button id="addCandidateButton">Add Candidate</button>
    </div>

    <hr class="custom-line">

    <!-- Section for finalizing the election -->
    <div id="endElection">
        <h3>Finalize the election:</h3>
        <button id="endElectionButton">End Election</button>
    </div>

    <hr class="custom-line">

    <!-- Section for minting an NFT certificate -->
    <div id="saveResultsNFT">
        <h3>Generate an NFT certificate representing the election results and distribute it to the addresses of
            all voters:</h3>
        <button id="generateAndUploadMetadataButton">Mint NFT</button>
    </div>

    <hr class="custom-line">

    <!-- Section for reinitializing the election -->
    <div id="resetElection">
        <h3>Reinitialize the election:</h3>
        <button id="resetElectionButton">Reinitialize</button>
    </div>

</div>
```

Here's a breakdown of what each section does:

1. **Start Election Section**: Allows administrators to start a new election by providing candidate names, election duration, and clicking the "Start Election" button.

2. **Register Voters Section**: Enables administrators to register voters' addresses by providing a list of addresses separated by commas and clicking the "Register Voters" button.

3. **Change Election Duration Section**: Allows administrators to change the duration of the ongoing election by entering a new duration and clicking the "Change duration" button.

4. **Add Candidate Section**: Provides administrators with the ability to add additional candidates to the ongoing election by entering the candidate's name and clicking the "Add Candidate" button.

5. **Finalize Election Section**: Allows administrators to finalize the election by clicking the "End Election" button.

6. **Save Results NFT Section**: Provides a button for administrators to generate an NFT certificate representing the election results and distribute it to all voters.

7. **Reset Election Section**: Allows administrators to reinitialize the election by clicking the "Reinitialize" button.

## Build script.js: Interacting with the Smart Contract by adding javascript functions

Now, we will focus on writing the javascrip functions we need to interact with index.html

fisrt, let's make the connect button working!



#### 1. **Connecting the Wallet**
   - Explain the purpose of this function and its significance in blockchain development.
   - Emphasize the security aspect of connecting to a wallet and handling accounts.

```javascript
// Add your code snippet for connecting the wallet here
```

#### 2. **Starting an Election**
   - Describe the process of starting an election, including providing candidate names and specifying the duration.
   - Highlight any validations or checks that are in place to ensure a smooth election setup.

```javascript
// Add your code snippet for starting an election here
```

#### 3. **Voting**
   - Walk through the process of casting a vote, emphasizing the importance of secure and transparent voting mechanisms.
   - Explain any error handling or feedback mechanisms for incorrect inputs.

```javascript
// Add your code snippet for the voting process here
```

#### 4. **Changing Election Duration**
   - Explain the purpose of this functionality and its potential use cases.
   - Discuss any considerations regarding the duration of an election.

```javascript
// Add your code snippet for changing election duration here
```

#### 5. **Resetting the Election**
   - Describe the purpose of resetting an election and any safeguards in place to prevent accidental resets.

```javascript
// Add your code snippet for resetting an election here
```

#### 6. **Adding Candidates**
   - Walk through the process of adding candidates to an election, and discuss how this might be relevant in a real-world scenario.

```javascript
// Add your code snippet for adding candidates here
```

#### 7. **Displaying Candidates**
   - Explain how the UI displays the list of candidates and the associated information.

```javascript
// Add your code snippet for displaying candidates here
```

#### 8. **Showing the Timer**
   - Describe how the timer functionality works, and its significance in the context of an election.

```javascript
// Add your code snippet for timer functionality here
```

#### 9. **Handling Events**
   - Discuss how events are used to track various actions within the smart contract and how they can be beneficial for auditing.

```javascript
// Add your code snippet for handling events here
```

#### 10. **Minting NFTs**
   - Explain the concept of minting NFTs as a representation of election results.
   - Highlight the potential use cases or benefits of issuing NFTs in this context.

```javascript
// Add your code snippet for minting NFTs here
```

---

### Diagram: Interaction Flow

![Interaction Flow Diagram](placeholder_interaction_flow.png)

### General Tips:
- Provide clear explanations for each function or action, including its purpose and potential use cases.
- Include comments in the code to explain complex logic or any specific considerations.
- Encourage students to test each functionality with different inputs to gain a better understanding.
- Consider adding error handling mechanisms to gracefully handle unexpected situations.

### Contact Information

S2BC

@TODO
add link to repo // look in LAB3 (cloning)

@TODO
add candidate rule
add minting to all registered voters
arrange NFT image and metadata
focus on ducumentation
add logo and favicon from email file @DONE

## @todo List for Future Enhancements:

### Lab3 - Voting dApp Development

#### Frontend Development:
- [x] Implement HTML and JavaScript code for the Voting dApp frontend.
- [ ] Use web3.js or ethers.js to connect the frontend to deployed smart contracts.
- [ ] Design and implement UI components for each interaction step.

#### Testing:
- [ ] Thoroughly test the interaction between the frontend and smart contracts.
- [ ] Simulate various scenarios to ensure robust handling of different use cases.

#### Documentation:
- [ ] Update the Lab3 markdown file with detailed explanations and code snippets.
- [ ] Include screenshots or diagrams illustrating UI components and the interaction flow.

#### Security:
- [ ] Emphasize secure coding practices in both smart contracts and frontend code.
- [ ] Implement proper input validation and error handling mechanisms.

#### Deployment:
- [ ] Provide clear instructions on deploying the frontend of the Voting dApp.
- [ ] Consider using GitHub Pages or Netlify for easy deployment.

#### Coding Style:
- [ ] Ensure a consistent coding style throughout smart contracts and frontend code.
- [ ] Follow best practices for code readability and maintainability.

#### User Experience (UX):
- [ ] Pay attention to the overall user experience and make improvements if needed.
- [ ] Consider adding tooltips, loading indicators, or other UX elements.

#### Error Handling:
- [ ] Implement robust error handling mechanisms to guide users in unexpected situations.

#### Optimization:
- [ ] Optimize smart contracts and frontend code for gas efficiency and performance.

#### Feedback Mechanisms:
- [ ] Incorporate feedback messages or notifications to inform users about actions.

#### Cross-browser Compatibility:
- [ ] Ensure the frontend works seamlessly across different web browsers.

#### Accessibility:
- [ ] Consider accessibility aspects to make the dApp usable for individuals with disabilities.

#### Final Review:
- [ ] Conduct a final review of the Lab3 markdown file and code for completeness and clarity.

### General Enhancements:
- [ ] Explore additional features or improvements that can enhance the overall tutorial.
- [ ] Stay updated on new technologies or tools that could be integrated into the tutorial.

