"use client";

import { Container, Group, Anchor, Text } from "@mantine/core";
import classes from "./Footer.module.css";

const links = [
  { link: "https://www.linkedin.com/in/talwaserman/", label: "Linkedin" },
  { link: "#", label: "Block explorer" },
];

export default function Footer() {
  const items = links.map((link) => (
    <Anchor<"a">
      key={link.label}
      href={link.link}
      className={classes.links}
      target="_blank"
      underline="never"
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container fluid className={classes.inner}>
        <Text className="text-slate-60">© 2024 Tal Waserman. All Rights Reserved.</Text>      
        <Group gap={10}>{items}</Group>
      </Container>
    </div>
  );
}
