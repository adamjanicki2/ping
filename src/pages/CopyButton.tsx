import { Badge, Button, Icon } from "@adamjanicki/ui";
import { check, clipboard } from "@adamjanicki/ui/icons";
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
    <Badge vfx={{ axis: "x", align: "center", gap: "xs" }} type="success">
      <Icon icon={check} /> Copied
    </Badge>
  ) : (
    <Button
      vfx={{ axis: "x", align: "center", gap: "xs", paddingY: "xxs" }}
      onClick={copyCode}
      size="small"
      variant="secondary"
    >
      <Icon icon={clipboard} />
      Copy
    </Button>
  );
}
