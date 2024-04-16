"use client";
import { ethers } from "ethers";
require("dotenv").config();
const contractJSON = require("../../../lottery-hardhat/artifacts/contracts/Lottery.sol/Lottery.json"); 
interface ContractAddresses {
  [key: string]: string;
}

const contractAddress: ContractAddresses = {
  'development': process.env.lottery_eth_localhost_contract_address || '',
  'test': process.env.lottery_eth_sepolia_contract_address || '',
  'prod': ''
};
const webSocketProvider = process.env.lottery_eth_sepolia_webSocketProvider || '';

export default class ContractInterface {
  private contract: any;
  private signer: any;
  private provider: any;
  private wsProvider: any;

  
  constructor() {}

  public async init() {
    const cAddress = contractAddress[process.env.my_env || 'test'];
    this.provider = new ethers.BrowserProvider((window as any).ethereum);
    this.signer = await this.provider.getSigner();
    this.contract = new ethers.Contract(cAddress, contractJSON.abi, this.signer);
    const ws = new ethers.WebSocketProvider(webSocketProvider);
    if (ws) {
      this.wsProvider = new ethers.Contract(cAddress, contractJSON.abi, ws);
    }
    console.log('env:' , process.env.my_env);
  }

  public getWebSocket() {
    return this.wsProvider;
  }

  public getSignerAddress() {
    return this.signer?.address;
  }

  public async getLotteries() {
    try {
      const res = await this.contract.getLotteries();
      return res.map((lottery: any) =>  ({
        id: Number(lottery.id),
        winningPrize: lottery.winningPrize,
        startTime: new Date(Number(lottery.startTime)),
        closeTime: new Date(Number(lottery.closeTime)),
        joinedCounter: Number(lottery.joinedCounter),
        chainType: lottery.chainType
      }));
     
    } catch (err: any) {
      err.reason && alert(err.reason);
    }
  }

  public async createNewLottery(startTime: number, endTime: number, winningNumbers: number[], limitJoiners: number, chainType: string, prize: number ) {
    try {
      await this.contract.createNewLottery(startTime, endTime, winningNumbers, limitJoiners, chainType, {value: prize});
    } catch(err: any) {
      err.reason && alert(err.reason);
    }
  }

  public async joinLottery(lotteryId: number, numbers: number[]) {
    try {
      await this.contract.joinLottery(lotteryId, numbers, {value: '1000000000000000'});
    } catch(err: any) {
      alert(err.reason);
    }
  }
}
