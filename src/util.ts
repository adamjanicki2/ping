import { assertDefined } from "@adamjanicki/ui/functions";

export function formatBytes(bytes: number) {
  const units = ["B", "KB", "MB"];
  if (bytes <= 0) return "0B";
  const exp = Math.floor(Math.log(bytes) / Math.log(1024));
  let size = bytes / Math.pow(1024, exp);
  const unit = assertDefined(units[exp]);
  const displaySize = size < 10 ? size.toFixed(1) : Math.floor(size);
  return displaySize + unit;
}
