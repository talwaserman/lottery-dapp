"use client";
import { Button, ButtonGroup } from "@chakra-ui/react"; 

interface IProps {
  itemId: string;
  deleteItem: (id: string) => void;
  showInfo: (id: string) => void;
}

export default function Actions({ deleteItem, showInfo, itemId }: IProps) {
  return (
    <ButtonGroup gap="2" ml={2}>
      <Button
        colorScheme="blue"
        variant="link"
        onClick={() => showInfo(itemId)}
      >
        Info
      </Button>
      <Button
        colorScheme="orange"
        variant="link"
        onClick={() => deleteItem(itemId)}
      >
        Delete
      </Button>
    </ButtonGroup>
  );
}
