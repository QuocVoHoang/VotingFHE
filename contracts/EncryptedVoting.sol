// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./fhevm/lib/TFHE.sol";

contract EncryptedVoting {
    using TFHE for *;

    uint256 public candidateCount;
    mapping(uint256 => TFHE.euint32) private votes; // Số phiếu được mã hóa
    mapping(address => TFHE.ebool) private hasVoted; // Trạng thái bỏ phiếu được mã hóa

    constructor(uint256 _candidateCount) {
        candidateCount = _candidateCount;
    }

    function vote(uint256 candidateId, bytes calldata encryptedVote) public {
        require(TFHE.isFalse(hasVoted[msg.sender]), "You have already voted");
        require(candidateId < candidateCount, "Invalid candidate ID");

        hasVoted[msg.sender] = TFHE.asEbool(true);
        votes[candidateId] = TFHE.add(votes[candidateId], TFHE.asEuint32(1));
    }

    function getVotes(uint256 candidateId) public view returns (bytes memory) {
        require(candidateId < candidateCount, "Invalid candidate ID");
        return TFHE.decrypt(votes[candidateId]); // Chỉ người có quyền mới giải mã được
    }
}