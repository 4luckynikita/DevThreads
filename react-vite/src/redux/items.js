const GET_ITEMS = 'items/getItems';
const GET_ITEM = 'items/getItem';

const getItems = (items) => ({
    type: GET_ITEMS,
    payload: items
});
const getItem = (item) => ({
    type: GET_ITEM,
    payload: item
});

export const fetchItems = () => async (dispatch) => {
    const res = await fetch('/api/items')
    if (res.ok) {
        const data = await res.json()
        dispatch(getItems(data?.items))
    }
    else {
        const error = await res.json();
        return error;
    }
}
export const fetchCurrentItem = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/items/${itemId}`);
    if(res.ok) {
        const current = await res.json();
        dispatch(getItem(current?.item))
    }
};

function itemsReducer(state={}, action) {
    switch (action.type) {
        case GET_ITEMS: {
            return { ...state, items: action.payload };
        };
        case GET_ITEM: {
            return { ...state, item: action.payload };
        };
        default: return state;
    }
}

export default itemsReducer;