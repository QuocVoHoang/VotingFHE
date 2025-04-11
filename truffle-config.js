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
                "quiz depend egg mushroom today ecology impact shoot agent neutral devote buzz",
                "https://sepolia.infura.io/v3/ca4967c0081f4d9d8d7b97581a492ecb"
            ),
            network_id: 11155111,
            gas: 4000000,
            gasPrice: 10000000000
        },
        holesky: {
            provider: () => new HDWalletProvider(
                "quiz depend egg mushroom today ecology impact shoot agent neutral devote buzz",
                "https://holesky.infura.io/v3/ca4967c0081f4d9d8d7b97581a492ecb"
            ),
            network_id: 17000,
            gas: 4000000,
            gasPrice: 10000000000
        }
    },
    compilers: {
        solc: {
            version: "0.8.19"
        }
    }
};