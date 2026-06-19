// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ChallengeEscrow {
    address public owner;
    uint256 public challengeCount;
    uint256 public platformFeePercent = 5;

    enum ChallengeStatus {
        Open,
        Finished,
        PrizeClaimed
    }

    struct Challenge {
        uint256 id;
        string title;
        string description;
        uint256 entryFee;
        uint256 totalPool;
        uint256 participantCount;
        address creator;
        address winner;
        ChallengeStatus status;
    }

    mapping(uint256 => Challenge) public challenges;
    mapping(uint256 => mapping(address => bool)) public joined;

    event ChallengeCreated(uint256 indexed challengeId, string title, uint256 entryFee, address creator);
    event UserJoined(uint256 indexed challengeId, address participant);
    event WinnerSelected(uint256 indexed challengeId, address winner);
    event PrizeClaimed(uint256 indexed challengeId, address winner, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createChallenge(
        string memory _title,
        string memory _description,
        uint256 _entryFee
    ) public returns (uint256) {
        require(_entryFee > 0, "Invalid entry fee");

        challengeCount++;

        challenges[challengeCount] = Challenge({
            id: challengeCount,
            title: _title,
            description: _description,
            entryFee: _entryFee,
            totalPool: 0,
            participantCount: 0,
            creator: msg.sender,
            winner: address(0),
            status: ChallengeStatus.Open
        });

        emit ChallengeCreated(challengeCount, _title, _entryFee, msg.sender);
        return challengeCount;
    }

    function joinChallenge(uint256 _id) public payable {
        Challenge storage challenge = challenges[_id];

        require(challenge.status == ChallengeStatus.Open, "Challenge not open");
        require(!joined[_id][msg.sender], "Already joined");
        require(msg.value == challenge.entryFee, "Incorrect amount");

        joined[_id][msg.sender] = true;
        challenge.totalPool += msg.value;
        challenge.participantCount++;

        emit UserJoined(_id, msg.sender);
    }

    function selectWinner(uint256 _id, address _winner) public onlyOwner {
        Challenge storage challenge = challenges[_id];

        require(challenge.status == ChallengeStatus.Open, "Challenge not open");
        require(joined[_id][_winner], "Winner did not join");

        challenge.winner = _winner;
        challenge.status = ChallengeStatus.Finished;

        emit WinnerSelected(_id, _winner);
    }

    function claimPrize(uint256 _id) public {
        Challenge storage challenge = challenges[_id];

        require(challenge.status == ChallengeStatus.Finished, "Prize not available");
        require(msg.sender == challenge.winner, "Not winner");
        require(challenge.totalPool > 0, "Empty pool");

        uint256 prize = (challenge.totalPool * (100 - platformFeePercent)) / 100;
        challenge.totalPool = 0;
        challenge.status = ChallengeStatus.PrizeClaimed;

        payable(msg.sender).transfer(prize);

        emit PrizeClaimed(_id, msg.sender, prize);
    }
}