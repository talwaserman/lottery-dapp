"use client";
import { Link } from "@chakra-ui/next-js";

interface NavButtonProps {
  location: string;
  description: string;
}

export default function NavButton({ location, description }: NavButtonProps) {
  return (
    <Link href={`/${location}`} color="blue.400" _hover={{ color: "blue.500" }}>
      {description}
    </Link>
  );
}
