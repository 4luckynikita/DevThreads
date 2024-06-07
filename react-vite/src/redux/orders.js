const CREATE_ORDER = 'orders/CREATE_ORDER';
const CREATE_ORDER_ITEM = 'orders/CREATE_ORDER_ITEM';
const GET_ORDERS = 'orders/GET_ORDERS';

const createOrder = (order) => ({
    type: CREATE_ORDER,
    payload: order
});
const createOrderItem = (orderItem) => ({
    type: CREATE_ORDER_ITEM,
    payload: orderItem
})
const getOrders = (orders) => ({
    type: GET_ORDERS,
    payload: orders
})

export const createAnOrder = (formData) => async (dispatch) => {
    const response = await fetch("/api/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });
    if (response.ok) {
        const newOrder = await response.json();
        dispatch(createOrder(newOrder));
        return newOrder;
      } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
      } else {
        return { server: "Something went wrong. Please try again" };
      }
};
export const createAnOrderItem = (formData) => async (dispatch) => {
    const response = await fetch("/api/orders/item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });
    if (response.ok) {
        const newOrderItem = await response.json();
        dispatch(createOrderItem(newOrderItem));
        return newOrderItem;
      } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
      } else {
        return { server: "Something went wrong. Please try again" };
      }
};
export const getAllOrders = (id) => async (dispatch) => {
    const response = await fetch(`/api/orders/${id}`);
    if(response.ok) {
        const orders = await response.json();
        dispatch(getOrders(orders))
    }
}

export const deleteAnOrder = (id) => async (dispatch) => {
    const res = await fetch(`/api/orders/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    const deleted = await res.json();
    return deleted;
}
export const editAnOrderItem = (id, formData) => async() => {
    const response = await fetch(`/api/orders/item/${id}`, {
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
}

function ordersReducer(state={}, action) {
    switch (action.type) {
        case CREATE_ORDER: {
            return { ...state, order: action.payload };
        };
        case CREATE_ORDER_ITEM: {
            return { ...state, orderItem: action.payload };
        };
        case GET_ORDERS: {
            return { ...state, orders: action.payload };
        };
        default: return state;
    }
};

export default ordersReducer;