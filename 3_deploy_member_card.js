const EncryptedMemberCard = artifacts.require("EncryptedMemberCard");

module.exports = async function (deployer) {
  const memUsed = () => {
    const used = process.memoryUsage();
    return (used.heapUsed / 1024 / 1024).toFixed(2); // MB
  };

  console.log("=== Deployment Start ===");
  console.log("🧠 Memory before all:", memUsed(), "MB");
  console.time("⏱ Total deployment time");

  // Bước 1: Khởi tạo deployer
  console.time("⏳ Step 1: deployer.deploy()");
  const beforeDeploy = Date.now();
  await deployer.deploy(EncryptedMemberCard);
  const afterDeploy = Date.now();
  console.timeEnd("⏳ Step 1: deployer.deploy()");

  console.log("🧠 Memory after deploy:", memUsed(), "MB");
  console.log("⏱ Time for deploy only:", (afterDeploy - beforeDeploy), "ms");

  // Bước 2: Lấy instance (có thể dùng để test hoặc gán biến)
  console.time("⏳ Step 2: get deployed instance");
  const instance = await EncryptedMemberCard.deployed();
  console.timeEnd("⏳ Step 2: get deployed instance");

  console.log("🧠 Memory after getting instance:", memUsed(), "MB");

  console.timeEnd("⏱ Total deployment time");
  console.log("=== Deployment End ===");
};
