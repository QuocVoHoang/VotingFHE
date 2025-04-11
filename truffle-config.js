const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
      development: {
          host: "127.0.0.1",
          port: 8545,
          network_id: "*"
      },
      sepolia: {
          provider: () => new HDWalletProvider(
              "quiz depend egg mushroom today ecology impact shoot agent neutral devote buzz", // Thay bằng Secret Recovery Phrase từ MetaMask
              "https://sepolia.infura.io/v3/ca4967c0081f4d9d8d7b97581a492ecb"
          ),
          network_id: 11155111, // Sepolia network ID
          gas: 4000000, // Giảm gas limit để tiết kiệm
          gasPrice: 10000000000 // 10 gwei
      }
  },
  compilers: {
      solc: {
          version: "0.8.19"
      }
  }
};