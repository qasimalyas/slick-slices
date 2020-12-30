import React, { useState } from "react";

// Create order context
const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  // stick state here
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
