"use client";
import { useState } from "react";
import {
  ListItem as LI
} from '@chakra-ui/react'
import Actions from "./Actions";

interface IProps {
  itemName: string;
  itemId: string;
  deleteItem: (id: string) => void;
  showInfo: (id: string) => void;
}

export default function ListItem({
  itemName,
  itemId,
  deleteItem,
  showInfo,
}: IProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <LI
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {itemName}
      {isHovered && (
        <Actions itemId={itemId} deleteItem={deleteItem} showInfo={showInfo} />
      )}
    </LI>
  );
}
