import { Badge, Button, Icon } from "@adamjanicki/ui";
import { check, clipboard } from "@adamjanicki/ui/icons";
import { useState } from "react";

type Props = {
  children: string;
  type: string;
};

export default function CopyButton({ children, type }: Props) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(children);
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
      Copy {type}
    </Button>
  );
}
