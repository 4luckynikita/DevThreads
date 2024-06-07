const CREATE_CART_ITEM = "cartitems/CREATE_CART_ITEMS";
const GET_CART_ITEMS = "cartitems/GET_CART_ITEMS"

const createCartItem = (cartItem) => ({
    type: CREATE_CART_ITEM,
    payload: cartItem
});
const getCartItems = (cartItems) => ({
    type: GET_CART_ITEMS,
    payload: cartItems
})

export const createACartItem = (formData) => async (dispatch) => {
    const response = await fetch("/api/cart/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });
    if (response.ok) {
        const newCartItem = await response.json();
        dispatch(createCartItem(newCartItem));
        return newCartItem;
      } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
      } else {
        return { server: "Something went wrong. Please try again" };
      }
}
export const getAllCartItems = (id) => async (dispatch) => {
    const response = await fetch(`/api/cart/${id}`);
    if(response.ok){
        const cartItems = await response.json();
        dispatch(getCartItems(cartItems));    
    }
}
export const deleteCartItem = (id) => async(dispatch) => {
    const res = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    const deleted = await res.json();
    return deleted;
}
export const editCartItem = (id, formData) => async () => {
      const response = await fetch(`/api/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        return "Ok";
      } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
      } else {
        return { server: "Something went wrong. Please try again" };
      }
  };


function cartItemsReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_CART_ITEM: {
            return { ...state, item: action.payload };
        };
        case GET_CART_ITEMS: {
            return { ...state, items: action.payload };
        };
        default: return state;
    }
}

export default cartItemsReducer;