// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ChallengeEscrow {

    address public owner;
    uint256 public challengeCount;

    constructor() {
        owner = msg.sender;
    }

    struct Challenge {
        uint256 id;
        string title;
        uint256 entryFee;
        uint256 totalPool;
        address creator;
        bool active;
    }

    mapping(uint256 => Challenge) public challenges;
    mapping(uint256 => mapping(address => bool)) public joined;

    event ChallengeCreated(
        uint256 indexed challengeId,
        string title,
        uint256 entryFee,
        address creator
    );

    event UserJoined(
        uint256 indexed challengeId,
        address participant
    );

    function createChallenge(
        string memory _title,
        uint256 _entryFee
    ) public returns (uint256) {

        require(_entryFee > 0, "Invalid entry fee");

        challengeCount++;

        challenges[challengeCount] = Challenge({
            id: challengeCount,
            title: _title,
            entryFee: _entryFee,
            totalPool: 0,
            creator: msg.sender,
            active: true
        });

        emit ChallengeCreated(
            challengeCount,
            _title,
            _entryFee,
            msg.sender
        );

        return challengeCount;
    }

    function joinChallenge(uint256 _id)
        public
        payable
    {
        Challenge storage challenge = challenges[_id];

        require(challenge.active, "Challenge closed");
        require(!joined[_id][msg.sender], "Already joined");
        require(
            msg.value == challenge.entryFee,
            "Incorrect amount"
        );

        joined[_id][msg.sender] = true;
        challenge.totalPool += msg.value;

        emit UserJoined(_id, msg.sender);
    }
}