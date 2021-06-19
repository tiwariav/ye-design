export function range(start, stop, step) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

export function addOrUpdate(array = [], obj, key) {
  const newArray = [...array];
  let existingIndex = newArray.findIndex((item) => item[key] === obj[key]);
  if (existingIndex >= 0) {
    newArray[existingIndex] = { ...obj };
  } else {
    newArray.push(obj);
  }
  return newArray;
}
