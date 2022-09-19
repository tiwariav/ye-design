export function range(start, stop, step) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step
  );
}

export function addOrUpdate(array = [], object, key) {
  const newArray = [...array];
  const existingIndex = newArray.findIndex((item) => item[key] === object[key]);
  if (existingIndex >= 0) {
    newArray[existingIndex] = { ...object };
  } else {
    newArray.push(object);
  }
  return newArray;
}
