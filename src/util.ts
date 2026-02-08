export function formatBytes(bytes: number) {
  const units = ["B", "KB", "MB"];
  if (bytes <= 0) return "0B";
  const exp = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, exp);
  const unit = units[exp];
  const displaySize = size < 10 ? size.toFixed(1) : Math.floor(size);
  return displaySize + unit;
}
