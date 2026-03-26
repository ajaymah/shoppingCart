/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product } = action;
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            product,
            quantity: 1,
          },
        ],
      };
    }

    case "SET_QUANTITY": {
      const { productId, quantity } = action;
      const nextQty = Math.max(0, quantity);
      if (nextQty === 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.product.id !== productId),
        };
      }

      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === productId ? { ...i, quantity: nextQty } : i
        ),
      };
    }

    case "REMOVE_ITEM": {
      const { productId } = action;
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== productId),
      };
    }

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const value = useMemo(() => {
    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = state.items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );

    return {
      items: state.items,
      itemCount,
      subtotal,
      addItem: (product) => dispatch({ type: "ADD_ITEM", product }),
      setQuantity: (productId, quantity) =>
        dispatch({ type: "SET_QUANTITY", productId, quantity }),
      removeItem: (productId) =>
        dispatch({ type: "REMOVE_ITEM", productId }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

