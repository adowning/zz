export function convertDatesToStrings(input: any): any {
  // Base case 1: If the input is not an object or is null, it can't contain dates.
  // This also handles primitives like strings, numbers, booleans.
  if (typeof input !== 'object' || input === null) {
    return input;
  }

  // Base case 2: If the input is a Date object, convert it to an ISO string.
  // The `instanceof Date` check is the most reliable way to identify a Date.
  if (input instanceof Date) {
    return input.toISOString();
  }

  // Recursive step for arrays:
  // If the input is an array (at any level), we map over its items and call
  // the function recursively on each item.
  if (Array.isArray(input)) {
    return input.map((item: any) => convertDatesToStrings(item));
  }

  // Recursive step for plain objects:
  // We create a new object and iterate over the keys of the input object.
  // For each key, we call the function recursively on its value.
  const newObj: { [key: string]: any } = {};
  for (const key in input) {
    // We only want to process the object's own properties.
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      newObj[key] = convertDatesToStrings(input[key]);
    }
  }

  return newObj;
}
