const EncryptedVoting = artifacts.require("EncryptedVoting");

module.exports = async function (deployer) {
    let peakMemory = 0;
    const updatePeakMemory = () => {
        peakMemory = Math.max(peakMemory, process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    };

    console.time("Total");
    console.time("Deployment");
    await deployer.deploy(EncryptedVoting, 3, 10);
    const voting = await EncryptedVoting.deployed();
    console.timeEnd("Deployment");

    console.time("ProofGen");
    await voting.vote(0);
    console.timeEnd("ProofGen");

    console.time("Decryption");
    await voting.getVotes(0);
    console.timeEnd("Decryption");

    console.timeEnd("Total");
    updatePeakMemory();

    const total = parseFloat(process.uptime().toFixed(3));
    const deployment = parseFloat((await web3.eth.getBlock("latest")).timestamp - (await web3.eth.getBlock("earliest")).timestamp) / 1000;
    const proofGen = parseFloat(process.hrtime()[1] / 1e9).toFixed(3);
    const decryption = parseFloat(process.hrtime()[1] / 1e9).toFixed(3);
    const other = (total - deployment - proofGen - decryption).toFixed(3);

    console.log(`Proof Gen: ${proofGen}s`);
    console.log(`Decryption: ${decryption}s`);
    console.log(`Other: ${other}s`);
    console.log(`Peak Memory: ${peakMemory} MB`);
};