"use client";

import { Container, Group, Burger, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";

import WalletConnectButton from "../WalletConnectButton";
import CreateNewLottery from "../CreateNewLottery";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  
  return (
    <header className={classes.header}>
      <Container fluid className={classes.inner}>
        <Title fz="lg" className={"text-white"}>
          CRYPTO LOTTERY
        </Title>

        <Group gap={5} visibleFrom="xs">
          <WalletConnectButton />
          <CreateNewLottery />
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
