"use client";

import LotteryCards from "../LotteryCards";
import JoinLottery from "../JoinLottery";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Container } from "@mantine/core";

export default function MainSection() {
  const [joinIsOpened, { open: openJoin, close: closeJoin }] =
    useDisclosure(false);
  const [joinLotteryId, setJoinId] = useState<number | null>(null);

  const openJoinWithId = (id: number) => {
    openJoin();
    setJoinId(id);
  };

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
