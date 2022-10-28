export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (data, value) => {
  let unique = data.map((item) => item[value]);
  if (value === "colors") {
    unique = unique.flat();
  }
  return ["All", ...new Set(unique)];
};
