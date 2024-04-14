"use client";

import { ContractContext } from "../../clientProviders";
import { Button, Modal, NumberInput, Text } from "@mantine/core";
import { useContext, useState } from "react";
import { getDigits } from "../../utils/helpers";

interface IProps {
  id: number | null;
  opened: boolean;
  closeJoin: () => void;
}

export default function JoinLottery({ id, opened, closeJoin }: IProps) {
  const [winningNumber, setWinningNumber] = useState<number | string>("");

  const { contractInterface, initialized, connectedAccount } =
    useContext(ContractContext);

  const onClose = () => {
    closeJoin();
    setWinningNumber("");
  };

  const join = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (initialized && connectedAccount) {
      await contractInterface.joinLottery(id, getDigits(winningNumber));
    }
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title={`Join Lottery #${id}`}>
      <form onSubmit={join}>
        <div className="flex flex-col gap-5">
          <NumberInput
            label="Enter your lottery number (4 digits)"
            placeholder="Enter number with 4 digits"
            value={winningNumber}
            onChange={setWinningNumber}
            error={winningNumber.toString().length > 4}
          />
          <Text>Each lottery ticket cost 0.001 ETH.<br/>Prize can be collected after Lottery ended.</Text>

          <Button className="hover:opacity-90" type="submit" disabled={winningNumber.toString().length > 4}>
            Join
          </Button>
        </div>
      </form>
    </Modal>
  );
}
