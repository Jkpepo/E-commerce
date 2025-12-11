export const calculateCartTotals = (cart) => {
  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + item.productId.price * item.quantity,
    0
  );

  const shipment =
    cart.length === 0 ? 0 : totalPrice < 200 ? 1000 : 0;

  const totalToPay = totalPrice + shipment;

  return {
    totalItems,
    totalPrice,
    shipment,
    totalToPay,
  };
};