import { Badge, Button } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/functions";
import { faCheck, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
  text: string;
  className?: string;
  type: string;
};

export default function CopyButton({ text, type, className }: Props) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return copied ? (
    <Badge
      className={classNames("flex items-center", className)}
      type="success"
    >
      <FontAwesomeIcon icon={faCheck} className="mr1" /> Copied
    </Badge>
  ) : (
    <Button
      onClick={copyCode}
      style={{ padding: "3px 6px" }}
      className={classNames("f6 fw6", className)}
      variant="secondary"
    >
      <FontAwesomeIcon icon={faClipboard} className="mr1" />
      Copy {type}
    </Button>
  );
}
