const { createInstance } = require('fhevmjs');
const EncryptedVoting = artifacts.require("EncryptedVoting");

module.exports = async function (callback) {
    try {
        // Khởi tạo fhevmjs instance (giả lập FHE)
        const instance = await createInstance({ network: 'sepolia' });
        const voting = await EncryptedVoting.deployed();

        // Đo thời gian và bộ nhớ
        console.time("interact");
        console.log("Memory before interaction:", process.memoryUsage().heapUsed / 1024 / 1024, "MB");

        // Mã hóa dữ liệu đầu vào (giả lập)
        const encryptedVote = instance.encrypt32(1); // Mã hóa giá trị 1
        console.log("Encrypted vote:", encryptedVote);

        // Gọi hàm vote và lấy chi phí gas
        const candidateId = 0;
        const tx = await voting.vote(candidateId, encryptedVote, { from: (await web3.eth.getAccounts())[0] });
        const gasUsed = tx.receipt.gasUsed;
        console.log("Gas used for vote:", gasUsed);

        // Lấy số phiếu (dữ liệu mã hóa)
        const encryptedResult = await voting.getVotes(candidateId);
        console.log("Encrypted result:", encryptedResult);

        // Giải mã kết quả (giả lập)
        const decryptedResult = instance.decrypt(encryptedResult);
        console.log("Decrypted result:", decryptedResult);

        // Đo thời gian và bộ nhớ kết thúc
        console.log("Memory after interaction:", process.memoryUsage().heapUsed / 1024 / 1024, "MB");
        console.timeEnd("interact");

        callback();
    } catch (error) {
        console.error(error);
        callback(error);
    }
};