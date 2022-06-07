import { React, createContext, useState } from "react";
import Backtotop from "../backtotop/backtotop";
import Footer from "../footer/footer";
import Header from "../header/header";
import { useRouter } from "next/router";
export const cartItemsContext = createContext();

export default function Layout({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [showQV, setShowQV] = useState(false);
  const [itemQV, setItemQV] = useState();

  const asPath = useRouter();

  const addToCart = (product) => {
    var index = cartItems.findIndex((item) => item.id === product.id);
    if (index != -1) {
      cartItems[index].amount++;
    } else {
      product.amount++;
      setCartItems((prev) => [...prev, product]);
    }
  };
  const value = {
    cartItems,
    setCartItems,
    addToCart,
    showQV,
    setShowQV,
    itemQV,
    setItemQV,
  };

  console.log(asPath.pathname);
  if (asPath.pathname === "/login") {
    return <>{children}</>;
  } else {
    return (
      <cartItemsContext.Provider value={value}>
        <Header />
        {children}
        <Backtotop />
        <Footer />
      </cartItemsContext.Provider>
    );
  }
}
