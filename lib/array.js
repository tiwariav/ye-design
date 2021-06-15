export function range(start, stop, step) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

export function addOrUpdate(array = [], obj, key) {
  const newArray = [...array];
  let existing = newArray.find((item) => item[key] === obj[key]);
  if (existing) {
    existing = { ...obj };
  } else {
    newArray.push(obj);
  }
  return newArray;
}
