// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./fhevm/lib/TFHE.sol";
import "./ZKProofVerifier.sol";

contract EncryptedVoting {
    using TFHE for *;

    uint256 public candidateCount;
    mapping(uint256 => TFHE.euint32) private votes;
    mapping(address => TFHE.ebool) private hasVoted;

    ZKProofVerifier public verifier;

    constructor(uint256 _candidateCount, address _verifier) {
        candidateCount = _candidateCount;
        verifier = ZKProofVerifier(_verifier);
    }

    function vote(
        uint256 candidateId,
        bytes calldata encryptedVote,
        bytes calldata proof
    ) public {
        require(TFHE.isFalse(hasVoted[msg.sender]), "Already voted");
        require(candidateId < candidateCount, "Invalid candidate");
        require(verifier.verifyProof(proof), "Invalid ZK proof");

        hasVoted[msg.sender] = TFHE.asEbool(true);
        votes[candidateId] = TFHE.add(votes[candidateId], TFHE.asEuint32(1));
    }

    function getVotes(uint256 candidateId) public view returns (bytes memory) {
        require(candidateId < candidateCount, "Invalid candidate ID");
        return TFHE.decrypt(votes[candidateId]);
    }
}
