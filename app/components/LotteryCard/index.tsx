import { Card, Text, Group, Button, Badge } from "@mantine/core";
import { IconCalendarDue, IconUsers } from "@tabler/icons-react";
import QRCode from "react-qr-code";
import classes from "./LotteryCard.module.css";
import { ILotteryCard } from "../../lib/client-services/lotteryContract/interface";
import { formatDate, isLotteryStillLive } from "../../utils/helpers";
import CountdownClock from "../CountdownClock";
import { ethers } from "ethers";

interface IProps {
  openJoin: (id: number) => void;
  ethPrice: number;
}

export default function LotteryCard({
  id,
  winningPrize,
  startTime,
  closeTime,
  joinedCounter,
  openJoin,
  ethPrice,
}: ILotteryCard & IProps) {
  const isLive = isLotteryStillLive(closeTime);
  return (
    <Card withBorder radius="md" className={classes.card} key={id}>
      <Card.Section className={classes.countDownSection}>
        <CountdownClock closeTime={closeTime} />
      </Card.Section>
      <Card.Section className={classes.imageSection}>
        <QRCode
          size={200}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={"/" + startTime.getTime() + closeTime.getTime() + id}
          viewBox={`0 0 200 200`}
        />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <Text fw={500}>{`Prize: ${ethers.formatEther(winningPrize.toString())} ETH`}</Text>
        <Badge variant="outline" color={isLive ? "green" : "red"}>
          {isLive ? "Live" : "Ended"}
        </Badge>
      </Group>
      {ethPrice && (
        <Text fw={500}>
          ${(ethPrice * Number(ethers.formatEther(winningPrize.toString()))).toFixed(2)}
        </Text>
      )}

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Information
        </Text>

        <div className="flex flex-col gap-2">
          <div className="flex">
            <IconUsers size="1.05rem" className={classes.icon} stroke={1.5} />
            <Text size="xs">Joined: {joinedCounter}</Text>
          </div>
          <div className="flex">
            <IconCalendarDue
              size="1.05rem"
              className={classes.icon}
              stroke={1.5}
            />
            <div className="flex gap-1 justify-between">
              <Text size="xs">Start:</Text>
              <Text size="xs">{formatDate(startTime)}</Text>
            </div>
          </div>
          <div className="flex">
            <IconCalendarDue
              size="1.05rem"
              className={classes.icon}
              stroke={1.5}
            />
            <div className="flex gap-1 justify-between">
              <Text size="xs">End:</Text>
              <Text size="xs">{formatDate(closeTime)}</Text>
            </div>
          </div>
        </div>
      </Card.Section>

      <Card.Section className={classes.section}>
        {isLive && (
          <Button radius="xl" fullWidth onClick={() => openJoin(id)}>
            Join
          </Button>
        )}
        {!isLive && (
          <Button radius="xl" fullWidth color="grape" variant="outline">
            Check Ticket
          </Button>
        )}
      </Card.Section>
    </Card>
  );
}
