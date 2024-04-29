import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import ethCoinImg from "../../assets/eth_coin.png";
import classes from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            CRYPTO Lottery <br />
          </Title>
          <Text c="dimmed" mt="md">
            Crypto lottery is a decentralized application that enables users to
            create and join lotteries. Join OR create lotteries for a chance to
            win prizes.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Lottery creation</b> – create your own lotteries and invite
              others to try and guess your winning number
            </List.Item>
            <List.Item>
              <b>Join multiple lotteries</b> join lotteries created by others
              for a chance to win prizes
            </List.Item>
            <List.Item>
              <b>Blockchain based</b> Each lottery is executed on the blockchain
              and is transparent
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Get started
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              component={Link}
              href="https://sepolia.etherscan.io/address/0xD56b722262Ae87610B1E8E306351407e962b9037#code"
              rel="noopener noreferrer"
              target="_blank"
            >
              Solidity code
            </Button>
          </Group>
        </div>
        <Image src={ethCoinImg.src} className={classes.image} />
      </div>
    </Container>
  );
}
