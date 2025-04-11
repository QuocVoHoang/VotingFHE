const ZKProofVerifier = artifacts.require("ZKProofVerifier");
const EncryptedVoting = artifacts.require("EncryptedVoting");

module.exports = async function (deployer) {
    console.log("📦 Deployment started...\n");

    const memUsage = () => (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

    console.time("⏱ Total deployment time");

    console.log(`🧠 Memory before deployment: ${memUsage()} MB`);

    // Deploy ZKProofVerifier
    console.time("🔧 ZKProofVerifier deployment");
    await deployer.deploy(ZKProofVerifier);
    const verifier = await ZKProofVerifier.deployed();
    console.timeEnd("🔧 ZKProofVerifier deployment");
    console.log(`🧠 Memory after ZKProofVerifier: ${memUsage()} MB\n`);

    // Deploy EncryptedVoting with candidate count = 3
    console.time("🗳 EncryptedVoting deployment");
    await deployer.deploy(EncryptedVoting, 3, verifier.address);
    const voting = await EncryptedVoting.deployed();
    console.timeEnd("🗳 EncryptedVoting deployment");
    console.log(`🧠 Memory after EncryptedVoting: ${memUsage()} MB\n`);

    console.timeEnd("⏱ Total deployment time");

    console.log(`\n✅ Contracts deployed:
    📍 ZKProofVerifier at ${verifier.address}
    📍 EncryptedVoting at ${voting.address}`);
};
