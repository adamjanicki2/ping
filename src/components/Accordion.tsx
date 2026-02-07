import { Animated, Box, Icon, ui, UnstyledButton } from "@adamjanicki/ui";
import { chevronDown, chevronRight } from "@adamjanicki/ui/icons";
import React, { useState } from "react";

type Props = {
  divider?: boolean;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  label: string;
};

export default function Accordion({
  label,
  divider,
  children,
  className,
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <Box className={className}>
      <UnstyledButton
        onClick={() => setShow(!show)}
        vfx={{ axis: "x", align: "center", width: "full", padding: "s" }}
      >
        <Icon icon={show ? chevronDown : chevronRight} /> {label}
      </UnstyledButton>
      <Animated
        style={{ width: "100%", paddingLeft: 8, paddingRight: 8 }}
        visible={show}
        to={{ opacity: 1 }}
        from={{ opacity: 0 }}
      >
        {children}
      </Animated>
      {divider && (
        <ui.hr
          style={{
            border: "none",
            height: 1,
            width: "100%",
            margin: 0,
            backgroundColor: "#ddd",
          }}
        />
      )}
    </Box>
  );
}
