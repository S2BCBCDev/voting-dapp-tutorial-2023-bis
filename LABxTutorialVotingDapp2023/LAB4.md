# Blockchain & Solidity Lab4 – Voting dApp Development

### S2BC

### Lab 4: Run a dApp and Consider Next Steps
- BUILD / TEST / INTEGRATE / **RUN**

---

So far, you've followed the steps in Labs 1 to 3, gaining valuable insights into the core components of blockchain development. Now, in Lab 4, we will discuss crucial considerations for running a dApp and planning for its future contributions.

## 1. Store Only Essential Data on the Blockchain

When designing your dApp, it's important to be mindful of data storage on the blockchain. Storing large volumes of data on-chain can be expensive. Evaluate which data should reside on the blockchain and which should be stored off-chain.

## 2. Considerations About Data Migration

Upgrading your dApp is inevitable, but remember that the blockchain is an immutable database. This means that smart contracts cannot be modified after deployment. It's crucial to separate data from business logic to mitigate data migration challenges.

## 3. Manage Block Gas Limit

On the Ethereum network, the block gas limit is a critical factor to consider. Transactions requiring more gas than the limit won't be successful. While code might run smoothly on local private chains, it might fail on the public chain. Be cautious of this potential discrepancy.

## 4. Keep Smart Contracts Simple

The blockchain software ecosystem is evolving rapidly, and debugging can be challenging. It's advisable to keep your smart contracts concise and straightforward to minimize the likelihood of encountering bugs.

## 5. Ensure Data Consistency

In a multi-node environment, particularly in private or public chains, consider data consistency. Transactions take time to synchronize between nodes, potentially leading to inconsistencies. Design your dApp logic with data state in mind.

## 6. Prepare for Unexpected Network Situations

When using public chains like Ethereum main network, be aware that transactions may fail or experience significant delays during network congestion. Be prepared to handle such scenarios.

### Uploading Your dApp to the Application Library

Once your dApp is developed and tested, you have the option to upload it to the MorpheusLabs SEED platform's Application Library. This allows you to share your dApp with a wider audience and potentially earn MITx tokens.

Follow these steps to upload your dApp:

1. Access the Application Library menu.
2. Click on the "Upload New App" button.
3. Select the appropriate deployment type (Source Code, Compiled, or External) based on your dApp's stage.

### Deployment Types:

#### Source Code:
Suitable for development and testing versions (aka dev).

#### Compiled:
Suitable for staging and production versions (aka prod).

#### External:
Suitable for featuring your application with AppLibrary.

For detailed steps on uploading your dApp, refer to the [documentation](https://docs.morpheuslabs.io/docs/submit-app-to-the-app-store).

### Contact 

S2BC

## notes
It might be helpful to provide some resources or tips on how to monitor and analyze the performance of a deployed dApp, especially in a real-world scenario.

Consider including a section on deploying a dApp on a testnet first before deploying it on the mainnet, to allow for thorough testing in a controlled environment.