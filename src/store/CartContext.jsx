import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const selectedItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (selectedItemIndex > -1) {
      const selectedItem = state.items[selectedItemIndex];

      const updatedItem = {
        ...selectedItem,
        quantity: selectedItem.quantity + 1,
      };

      updatedItems[selectedItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const selectedItemIndex = state.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];
    const selectedItem = state.items[selectedItemIndex];
    if (selectedItem.quantity > 1) {
      const updatedItem = {
        ...selectedItem,
        quantity: selectedItem.quantity - 1,
      };

      updatedItems[selectedItemIndex] = updatedItem;
    } else {
      updatedItems.splice(selectedItemIndex, 1);
    }

    return { ...state, items: updatedItems };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, cartActionDispatcher] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    cartActionDispatcher({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    cartActionDispatcher({ tepe: "REMOVE_ITEM", id });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}> {children} </CartContext.Provider>
  );
}

export default CartContext;
