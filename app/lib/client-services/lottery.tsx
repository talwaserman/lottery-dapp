"use client";
import { ethers } from "ethers";

const contractJSON = require("../../../hardhat/artifacts/contracts/Lottery.sol/Lottery.json");
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default class ContractInterface {
  private contract: any;
  private signer: any;
  private provider: any;
  
  constructor() {
  }

  public async init() {
    this.provider = new ethers.BrowserProvider((window as any).ethereum);
    this.signer = await this.provider.getSigner();
    this.contract = new ethers.Contract(contractAddress, contractJSON.abi, this.signer);
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
      alert(err.reason);
    }
  }

  public async createNewLottery(startTime: number, endTime: number, winningNumbers: number[], limitJoiners: number, chainType: string, prize: number ) {
    try {
      await this.contract.createNewLottery(startTime, endTime, winningNumbers, limitJoiners, chainType, {value: prize});
    } catch(err: any) {
      alert(err.reason);
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
