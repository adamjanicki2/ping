import { classNames } from "@adamjanicki/ui/functions";
import React from "react";
import "src/components/json.css";

type Props = {
  children: any;
  className?: string;
  style?: React.CSSProperties;
};

export default function JsonTree({ children, className, style }: Props) {
  return (
    <div className={classNames("monospace", className)} style={style}>
      <Tree>{children}</Tree>
    </div>
  );
}

type TreeProps = {
  children: any;
  includeComma?: boolean;
};

function Tree({ children: data, includeComma = false }: TreeProps) {
  const type = typeof data;
  const comma = includeComma ? <span className="json-comma">,</span> : null;
  if (Array.isArray(data)) {
    const showArrayElement = Boolean(data.length);
    return (
      <>
        <span className="json-token">{"["}</span>
        {showArrayElement && (
          <div className="json-elements-container">
            {data.map((node, index) => (
              <div key={index}>
                <Tree includeComma={index < data.length - 1}>{node}</Tree>
              </div>
            ))}
          </div>
        )}
        <span className="json-token">{"]"}</span>
        {comma}
      </>
    );
  } else if (type === "object" && data) {
    const entries = Object.entries(data);
    const showObjectElements = Boolean(entries.length);
    return (
      <>
        <span className="json-token">{"{"}</span>
        {showObjectElements && (
          <div className="json-elements-container">
            {entries.map(([key, value], i) => (
              <div key={i}>
                <span className="json-key">{key}:</span>{" "}
                <Tree includeComma={i < entries.length - 1}>{value}</Tree>
              </div>
            ))}
          </div>
        )}
        <span className="json-token">{"}"}</span>
        {comma}
      </>
    );
  }

  let className = "json-primitive";
  if (type === "string") {
    data = type === "string" ? `"${data}"` : data;
  }
  // default leaf
  return (
    <>
      <span
        className={classNames(className, `json-primitive-${type}`)}
      >{`${data}`}</span>
      {comma}
    </>
  );
}
