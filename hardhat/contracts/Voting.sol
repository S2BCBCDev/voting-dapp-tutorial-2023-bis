// SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.19;

contract Voting {
    // Create a structure template for each candidates
    struct Candidate {
        uint256 id; // Unique identifier for the candidate
        string name; // Name of the candidate
        uint256 numberOfVotes; // Number of votes received by the candidate
    }
    // List of all candidates
    Candidate[] public candidates;

    // This will be the owner's address
    address public owner;

    // Mapp all voter addresses
    mapping(address => bool) public voters;

    // List of voters
    address[] internal ListOfVoters;

    // voting start and end session
    uint256 public votingStartTimeStamp;
    uint256 public votingEndTimeStamp;

    // Create an election status
    bool public electionStarted;

    // Restrict creating vote to the owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized to start election");
        _;
    }

    // Check if an election is ongoing
    modifier electionOnGoing() {
        require(electionStarted, "no election yet");
        _;
    }

    // Event emitted when the election starts
    event ElectionStarted(
        address indexed owner,
        uint256 startTimestamp,
        uint256 endTimestamp
    );

    // Event emitted when a vote is cast
    event VoteCast(address indexed voter, uint256 candidateId);

    // Event emitted when the election finishes
    event ElectionFinished(address indexed owner);

    // Event emitted when the election is reset
    event ElectionReset(address indexed owner);

    constructor() {
        // Initialize owner
        owner = msg.sender;
    }

    // To start an election
    function startElection(string[] memory _candidates, uint256 _votingDuration)
        public
        onlyOwner
    {
        require(electionStarted == false, "Election is currently ongoing");

        // Clear existing candidates
        while (candidates.length > 0) {
            removeCandidate(0);
        }

        // Add new candidates
        for (uint256 i = 0; i < _candidates.length; i++) {
            candidates.push(
                Candidate({id: i, name: _candidates[i], numberOfVotes: 0})
            );
        }
        electionStarted = true;
        votingStartTimeStamp = block.timestamp;
        votingEndTimeStamp = block.timestamp + (_votingDuration * 1 minutes);

        emit ElectionStarted(owner, votingStartTimeStamp, votingEndTimeStamp);
    }

    // Check voter's status
    function voterStatus(address _voter)
        public
        view
        electionOnGoing
        returns (bool)
    {
        if (voters[_voter] == true) {
            return true;
        }
        return false;
    }

    // To vote function
    function voteTo(uint256 _id) public electionOnGoing {
        require(checkElectionPeriod(), "Election period has ended");
        require(
            !voterStatus(msg.sender),
            "You already voted. You can only vote once."
        );
        require(_id < candidates.length, "Invalid candidate ID");

        candidates[_id].numberOfVotes++;
        voters[msg.sender] = true;
        ListOfVoters.push(msg.sender);

        emit VoteCast(msg.sender, _id);
    }

    // Get the number of votes
    function retrieveVotes() public view returns (Candidate[] memory) {
        return candidates;
    }

    // Monitor the election time
    function electionTimer() public view returns (uint256) {
        if (block.timestamp >= votingEndTimeStamp) {
            return 0;
        }
        return (votingEndTimeStamp - block.timestamp);
    }

    // Check if election period is still ongoing
    function checkElectionPeriod() public view returns (bool) {
        return electionTimer() > 0;
    }

    // Reset all voters status
    function resetAllVoterStatus() public onlyOwner {
        for (uint256 i = 0; i < ListOfVoters.length; i++) {
            voters[ListOfVoters[i]] = false;
        }
        delete ListOfVoters;

        emit ElectionReset(owner);
    }

    // Completely resetting the entire election process
    function resetElection() public onlyOwner {
        require(!electionStarted, "Election is currently ongoing");

        // Reset candidates and their vote counts
        for (uint256 i = 0; i < candidates.length; i++) {
            candidates[i].numberOfVotes = 0;
        }

        // Reset voter status
        resetAllVoterStatus();

        // Reset election status and timers
        electionStarted = false;
        votingStartTimeStamp = 0;
        votingEndTimeStamp = 0;

        // Remove all candidates
        removeAllCandidates();

        // emit Election Reset
        emit ElectionReset(owner);
    }

    function endElection() public onlyOwner electionOnGoing {
        electionStarted = false;
        votingEndTimeStamp = block.timestamp;

        emit ElectionFinished(owner);
    }

    // function removeCandidate(uint256 _candidateId) public onlyOwner {
    //     require(_candidateId < candidates.length, "Invalid candidate ID");
    //     for (uint256 i = _candidateId; i < candidates.length - 1; i++) {
    //         candidates[i] = candidates[i + 1];
    //     }
    //     candidates.pop();
    // }

    function removeCandidate(uint256 _candidateId) public onlyOwner {
        require(_candidateId < candidates.length, "Invalid candidate ID");
        require(!electionStarted, "Election is ongoing");

        for (uint256 i = _candidateId; i < candidates.length - 1; i++) {
            candidates[i] = candidates[i + 1];
        }

        delete candidates[candidates.length - 1];
        candidates.pop();
    }

    function removeAllCandidates() public onlyOwner {
        require(!electionStarted, "Election is currently ongoing");
        while (candidates.length > 0) {
            removeCandidate(0);
        }
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid new owner address");
        owner = newOwner;
    }

    /// additional code

    function changeElectionDuration(uint256 _newDuration)
        public
        onlyOwner
        electionOnGoing
    {
        require(_newDuration > 0, "Invalid duration");

        votingEndTimeStamp = votingStartTimeStamp + (_newDuration * 1 minutes);
    }

    function addCandidate(string memory _name)
        public
        onlyOwner
        electionOnGoing
    {
        candidates.push(
            Candidate({id: candidates.length, name: _name, numberOfVotes: 0})
        );
    }
}
