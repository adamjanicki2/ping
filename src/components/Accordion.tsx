import React, { useState } from "react";
import { Animated, UnstyledButton } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/functions";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className={classNames("", className)}>
      <UnstyledButton onClick={() => setShow(!show)} className="w-100 flex pa2">
        <FontAwesomeIcon
          style={{ marginRight: show ? 4 : 10 }}
          icon={show ? faChevronDown : faChevronRight}
        />{" "}
        {label}
      </UnstyledButton>
      <Animated
        className="w-100 ph2"
        visible={show}
        enter={{ style: { opacity: 1 } }}
        exit={{ style: { opacity: 0 } }}
      >
        {children}
      </Animated>
      <hr
        className="ma0 w-100 bg-moon-gray"
        style={{ border: "none", height: 1 }}
      />
    </div>
  );
}
