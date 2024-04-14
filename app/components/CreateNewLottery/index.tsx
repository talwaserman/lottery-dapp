"use client";

import { ContractContext } from "../../clientProviders";
import { Button, Modal, NumberInput } from "@mantine/core";
import { DateTimePicker, DateValue } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useContext, useState } from "react";
import { getDigits } from '../../utils/helpers'; 

export default function CreateNewLottery() {
  const [opened, { open, close }] = useDisclosure(false);
  const [prize, setPrize] = useState<number | string>("");
  const [winningNumber, setWinningNumber] = useState<number | string>("");
  const [startTime, setStartTime] = useState<DateValue | undefined>();
  const [endTime, setEndTime] = useState<DateValue | undefined>();
  const [limitJoiners, setLimitJoiners] = useState<number | string>(10);

  const { contractInterface, initialized, connectedAccount } =
    useContext(ContractContext);

  const onClose = () => {
    close();
    setPrize("");
    setWinningNumber("");
    setStartTime(undefined);
    setEndTime(undefined);
    setLimitJoiners(10);
  };

  const create = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (initialized && connectedAccount) {
      await contractInterface.createNewLottery(
        startTime?.getTime(),
        endTime?.getTime(),
        getDigits(winningNumber),
        limitJoiners,
        "sepolia",
        prize
      );
    }
    onClose();
  };

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Create Lottery">
        <form onSubmit={create}>
          <div className="flex flex-col gap-5">
            <NumberInput
              data-autofocus
              label="Enter prize in Wei"
              placeholder="Enter prize amount in Wei"
              value={prize}
              onChange={setPrize}
            />
            <NumberInput
              label="winning number (4 digits)"
              placeholder="Enter winning number with 4 digits"
              value={winningNumber}
              onChange={setWinningNumber}
              error={winningNumber.toString().length > 4}
            />
            <DateTimePicker
              withSeconds
              label="Pick start time"
              placeholder="Pick start time for the lottery"
              clearable
              value={startTime}
              onChange={setStartTime}
            />
            <DateTimePicker
              withSeconds
              label="Pick end time"
              placeholder="Pick end time for the lottery"
              clearable
              value={endTime}
              onChange={setEndTime}
            />
            <NumberInput
              label="Limit of joiners"
              placeholder="Enter limit of joiners"
              value={limitJoiners}
              onChange={setLimitJoiners}
              error={typeof limitJoiners === "number" ? limitJoiners < 1 : true}
            />

            <Button className="hover:opacity-90" type="submit">
              Create
            </Button>
          </div>
        </form>
      </Modal>
      <Button className="hover:opacity-90" onClick={open}>
        Create Lottery
      </Button>
    </>
  );
}
