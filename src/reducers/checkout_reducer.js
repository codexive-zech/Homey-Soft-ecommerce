const checkout_reducer = (state, action) => {
  if (action.type === "CHECKOUT_INPUT") {
    const { name, value } = action.payload;
    return { ...state, [name]: value };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default checkout_reducer;
