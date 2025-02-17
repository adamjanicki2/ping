import Link from "src/components/Link";
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

const Heading = ({ level, children, id }: Props) => {
  id ||= headingToId(children);
  return React.createElement(
    `h${level}`,
    { id, className: "has-octo-within flex items-center" },
    <HashLink id={id} />,
    children
  );
};

export default Heading;
