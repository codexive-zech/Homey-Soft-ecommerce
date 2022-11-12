export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(number / 100);
  return newNumber;
}; // set the international format for product price

export const getUniqueValues = (data, value) => {
  let unique = data.map((item) => item[value]);
  if (value === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};
