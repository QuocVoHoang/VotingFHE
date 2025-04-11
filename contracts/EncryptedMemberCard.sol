// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./fhevm/lib/TFHE.sol";

contract EncryptedMemberCard {
    using TFHE for *;

    mapping(address => TFHE.ebool) private isMember;

    event Joined(address indexed user);
    
    constructor() {}

    // Đăng ký làm thành viên
    function join() public {
        require(TFHE.isFalse(isMember[msg.sender]), "Already a member");
        isMember[msg.sender] = TFHE.asEbool(true);
        emit Joined(msg.sender);
    }

    // Trả về thông tin đã là thành viên chưa (dưới dạng mã hóa)
    function checkMembership() public view returns (bytes memory) {
        return abi.encode(TFHE.isTrue(isMember[msg.sender]));
    }
}
