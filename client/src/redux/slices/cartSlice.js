import { createSlice } from "@reduxjs/toolkit";

// Получаем сохраненную корзину из localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);
    // Фильтруем только валидные элементы
    const validCart = Array.isArray(parsedCart)
      ? parsedCart.filter((cart) => cart && cart.item && typeof cart.item.id !== "undefined")
      : [];
    return validCart;
  } catch (error) {
    console.error("Ошибка загрузки корзины:", error);
    return [];
  }
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const clearCartFromStorage = (cart) => {
  localStorage.removeItem("cart");
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      console.log("Состояние корзины:", state);
      console.log("Payload:", action.payload);

      if (!action.payload || !action.payload.id) {
        console.error("Некорректный payload:", action.payload);
        return state;
      }

      console.log("ID товара:", action.payload.id);

      const exist = state.find((cart) => cart && cart.item && cart.item.id === action.payload.id);
      if (exist) {
        exist.count += 1;
      } else {
        state.push({ count: 1, item: action.payload });
      }
      saveCartToStorage(state);
    },
    decrementItem: (state, action) => {
      const updatedCart =
        action.payload.newValue === 0
          ? state.filter((cart) => cart.item.id !== action.payload.item.id)
          : state.map((cart) =>
            cart.item.id === action.payload.item.id
              ? { ...cart, count: action.payload.newValue }
              : cart
          );
      saveCartToStorage(updatedCart);
      return updatedCart;
    },
    removeToCart: (state, action) => {
      const newState = state.filter(({ count, item }) => action.payload !== item.id)
      saveCartToStorage(newState);
      return newState
    },
    clearCart: (state) => {
      clearCartFromStorage();
      return [];
    }
  },
});

export const { addToCart, decrementItem, removeToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
