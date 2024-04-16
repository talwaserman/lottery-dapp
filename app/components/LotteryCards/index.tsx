"use client";

import LotteryCard from "../LotteryCard";
import { useContext, useState } from "react";
import { ContractContext } from "../../clientProviders";
import { getEthPrice } from '../../lib/client-services/coinGecko';
import { useEffect } from "react";

interface IProps {
  openJoin: (id: number) => void;
}

export default function LotteryCards({openJoin}: IProps) {
  const [lotteries, setLotteries] = useState([]);
  const [ethPrice, setEthPrice] = useState<number | undefined>();
  const { contractInterface, initialized, connectedAccount } =
    useContext(ContractContext);

  useEffect(() => {
    async function getLotteries() {
      setLotteries(await contractInterface.getLotteries());
    }

    async function getCurrentEthPrice() {
      setEthPrice(await getEthPrice());
    }

    if (initialized && connectedAccount) {
      getCurrentEthPrice();
      getLotteries();
    }
  }, [contractInterface, connectedAccount, initialized]);
  if (!lotteries) return null;
  
  return (
    <div className="flex mx-4 gap-5 flex-wrap justify-start">
      {lotteries.map((lottery: any) => (
        <LotteryCard {...lottery} key={lottery.id} openJoin={openJoin} ethPrice={ethPrice}/>
      ))}
    </div>
  );
}
