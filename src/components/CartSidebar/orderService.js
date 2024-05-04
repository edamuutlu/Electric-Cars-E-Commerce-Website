import Order from "@/models/Order";

const saveOrderToDatabase = async (userId, productIds) => {
  try {
    const order = new Order({
      userId,
      productId: productIds,
      state: true // or any initial state
    });
    await order.save();
    console.log('Order saved successfully:', order);
    return order; // Optionally return the saved order
  } catch (error) {
    console.error('Error saving order:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export default saveOrderToDatabase ;
