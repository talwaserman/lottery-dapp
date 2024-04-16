"use client";

import LotteryCards from "../LotteryCards";
import JoinLottery from "../JoinLottery";
import { useDisclosure } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import { Container } from "@mantine/core";
import { ContractContext } from "@/app/clientProviders";

export default function MainSection() {
  const [contractWebSocket, setContractWebSocket] = useState<any>();
  const [joinIsOpened, { open: openJoin, close: closeJoin }] =
    useDisclosure(false);
  const [joinLotteryId, setJoinId] = useState<number | null>(null);
  const { contractInterface, initialized } =
    useContext(ContractContext);
  const openJoinWithId = (id: number) => {
    openJoin();
    setJoinId(id);
  };

  useEffect(() => {
    const wsListener = (event: any) => {
      console.log("event: ", event.log.args);
    };

    if (initialized) {
      const contractWebSocket = contractInterface.getWebSocket();
      setContractWebSocket(contractWebSocket);
      contractWebSocket.on("*", wsListener)
    }
    return () => contractWebSocket && contractWebSocket.off("*", wsListener);

  }, [initialized]);

  return (
    <div>
      <Container fluid className="flex flex-row">
        <LotteryCards openJoin={openJoinWithId} />
        <JoinLottery
          opened={joinIsOpened}
          closeJoin={closeJoin}
          id={joinLotteryId}
        />
      </Container>
    </div>
  );
}
