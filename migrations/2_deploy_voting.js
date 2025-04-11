const EncryptedVoting = artifacts.require("EncryptedVoting");

module.exports = async function (deployer) {
    // Đo thời gian và bộ nhớ
    console.time("deploy");
    console.log("Memory before deployment:", process.memoryUsage().heapUsed / 1024 / 1024, "MB");

    // Triển khai hợp đồng với 3 ứng viên
    await deployer.deploy(EncryptedVoting, 3);

    console.log("Memory after deployment:", process.memoryUsage().heapUsed / 1024 / 1024, "MB");
    console.timeEnd("deploy");
};
