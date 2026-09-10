export function sumValues(items) {
  return (items || []).reduce((acc, item) => acc + Number(item.value || 0), 0);
}

export function formatAmount(value, unit = "") {
  const n = Number(value);
  const text = Number.isInteger(n) ? String(n) : n.toFixed(1).replace(".", ",");
  return unit ? `${text} ${unit}` : text;
}
