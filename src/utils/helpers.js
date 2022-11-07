export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (data, value) => {
  let unique = data.map((item) => item[value]);
  if (value === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};
