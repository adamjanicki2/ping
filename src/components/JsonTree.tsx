import "src/components/json.css";

import { Box, ui, UnstyledButton, UnstyledLink } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/functions";
import { useState } from "react";

type Props = {
  children: any;
  className?: string;
};

export default function JsonTree({ children, className }: Props) {
  return (
    <Box
      vfx={{ overflowX: "auto" }}
      className={classNames("json-tree monospace", className)}
    >
      <Tree>{children}</Tree>
    </Box>
  );
}

type TreeProps = {
  children: any;
  includeComma?: boolean;
};

function Tree({ children: data, includeComma = false }: TreeProps) {
  const [collapsed, setCollapsed] = useState(false);
  const type = typeof data;
  const comma = includeComma ? (
    <ui.span className="json-comma">,</ui.span>
  ) : null;

  // Array
  if (Array.isArray(data)) {
    const arraySize = data.length;
    return (
      <>
        <ui.span className="json-token">
          <UnstyledButton onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "[…" : "["}
          </UnstyledButton>
        </ui.span>
        {arraySize > 0 && !collapsed && (
          <Box className="json-elements-container">
            {data.map((node, index) => (
              <Box key={index}>
                <Tree includeComma={index < data.length - 1}>{node}</Tree>
              </Box>
            ))}
          </Box>
        )}
        <ui.span className="json-token">{"]"}</ui.span>
        {comma}{" "}
        {collapsed && (
          <ui.span className="json-comment">
            {"//"} {arraySize} {arraySize > 1 ? "elements" : "element"}
          </ui.span>
        )}
      </>
    );
  }
  // Object
  else if (type === "object" && data) {
    const entries = Object.entries(data);
    const objectSize = entries.length;
    return (
      <>
        <ui.span className="json-token">
          <UnstyledButton onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "{…" : "{"}
          </UnstyledButton>
        </ui.span>
        {entries.length > 0 && !collapsed && (
          <Box className="json-elements-container">
            {entries.map(([key, value], i) => (
              <Box key={i}>
                <ui.span className="json-key">"{key}":</ui.span>{" "}
                <Tree includeComma={i < entries.length - 1}>{value}</Tree>
              </Box>
            ))}
          </Box>
        )}
        <ui.span className="json-token">{"}"}</ui.span>
        {comma}{" "}
        {collapsed && (
          <ui.span className="json-comment">
            {"//"} {objectSize} {objectSize > 1 ? "entries" : "entry"}
          </ui.span>
        )}
      </>
    );
  }
  // leaves
  return (
    <>
      <Primitive>{data}</Primitive>
      {comma}
    </>
  );
}

type PrimitiveType =
  | string
  | boolean
  | number
  | ((...args: any[]) => unknown)
  | bigint
  | symbol
  | null
  | undefined;

function Primitive({ children: data }: { children: PrimitiveType }) {
  const type = typeof data;
  let node: React.ReactNode = String(data);
  let className = "";
  if (type === "string") {
    if (isValidUrl(data as string)) {
      node = (
        <>
          "
          <UnstyledLink newTab to={data as string}>
            {data as string}
          </UnstyledLink>
          "
        </>
      );
      className = "json-primitive-string-url";
    } else {
      node = `"${String(data)}"`;
    }
  }

  // default leaf
  return (
    <ui.span
      className={classNames(`json-primitive json-primitive-${type}`, className)}
    >
      {node}
    </ui.span>
  );
}

const urlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
const isValidUrl = (str: string) => urlRegex.test(str);
