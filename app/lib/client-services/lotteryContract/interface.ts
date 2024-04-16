import BigNumber from "bignumber.js";

export interface ILotteryCard {
    id: number;
    winningPrize: BigNumber;
    startTime: Date;
    closeTime: Date;
    joinedCounter: number;
    chainType: string;
}∏