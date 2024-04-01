"use client";

import { useEffect, useState } from "react";
import { getAllItems, deleteItem } from "../../../lib/services/items/service";
import ListItem from "./ListItem";
import { List as ListUI } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function List() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllItems();
      if (res) {
        setItems(res);
      }
    };
    fetchData();
  }, []);

  const deleteListItem = async (id: string) => {
    const res = await deleteItem(id);
    if (res) {
      setItems(items.filter((item: any) => item.id !== res.id));
    }
  };

  const showInfo = async (id: string) => {
    router.push(`/Info/${id}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <h1 className="w-full text-xl font-semibold">
        These are the list of items:
      </h1>
      <ListUI className="flex flex-col mt-2" spacing={2}>
        {items.map((item: any) => (
          <ListItem
            key={item.id}
            itemName={item.name}
            itemId={item.id}
            deleteItem={deleteListItem}
            showInfo={showInfo}
          />
        ))}
      </ListUI>
    </div>
  );
}
