import 'dotenv/config'
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        lottery_eth_localhost_contract_address: process.env.lottery_eth_localhost_contract_address,
        lottery_eth_sepolia_contract_address: process.env.lottery_eth_sepolia_contract_address,
        lottery_eth_sepolia_webSocketProvider: process.env.lottery_eth_sepolia_webSocketProvider,
        lottery_eth_sepolia_RPC_URL: process.env.lottery_eth_sepolia_RPC_URL,
        my_env: process.env.NODE_ENV
    }
};

export default nextConfig;
