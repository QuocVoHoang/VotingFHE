const EncryptedVoting = artifacts.require("EncryptedVoting");

contract("EncryptedVoting", accounts => {
  it("should allow a user to vote with ZK proof", async () => {
    const instance = await EncryptedVoting.deployed();

    // Giả lập mã hóa số 1 (tức là 1 phiếu)
    const encryptedVote = web3.utils.padLeft(web3.utils.numberToHex(1), 64);
    const proof = web3.utils.asciiToHex("dummy-proof");

    await instance.vote(0, encryptedVote, proof, { from: accounts[0] });

    const decrypted = await instance.getVotes(0);
    const result = web3.utils.toBN(decrypted).toString();

    assert.equal(result, "1", "Vote count should be 1");
  });
});
