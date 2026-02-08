import { Link, ui } from "@adamjanicki/ui";
import React from "react";

type Props = {
  level: 1 | 2 | 3 | 4;
  children: string;
  id?: string;
};

function HashLink({ id }: { id: string }) {
  return (
    <Link className="octo" to={`#${id}`}>
      #
    </Link>
  );
}

function headingToId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");
}

export default function Heading({ level, children, id }: Props) {
  id ||= headingToId(children);
  const Tag = ui[`h${level}` as "h1" | "h2" | "h3" | "h4"];
  return React.createElement(
    Tag,
    { id, className: "has-octo-within", vfx: { axis: "x", align: "center" } },
    <HashLink id={id} />,
    children,
  );
}
