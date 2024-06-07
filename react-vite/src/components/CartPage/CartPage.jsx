import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCartItems, deleteCartItem } from "../../redux/cartitems";
import { useNavigate } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditCartItemModal from "../EditCartItemModal/EditCartItemModal";
import { createAnOrder, createAnOrderItem } from "../../redux/orders";

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let sessionUser = useSelector((state) => state.session.user);
    let [total, setTotal] = useState(0);
    useEffect(() => {
        setTotal(0)
        if (!sessionUser) navigate('/');
        dispatch(getAllCartItems(sessionUser?.id));
        
    }, [dispatch, sessionUser]);
    let cartItemState = useSelector((state) => state.cartItems.items)
    useEffect(() => {
        let newTotal = 0;
        cartItemState?.forEach((cartItem) => {
            newTotal += cartItem?.description?.price * cartItem?.quantity;
        });
        setTotal(newTotal.toFixed(2));
    }, [cartItemState]);
    async function handleDeleteItem(id) {
        const serverResponse = await dispatch(deleteCartItem(id));
            dispatch(getAllCartItems(sessionUser.id));
    }
    async function clearWholeCart() {
        cartItemState?.map(async (cartItem) => {
            handleDeleteItem(cartItem?.id);
        })
    }
    async function handlePlaceOrder() {
        const orderObj = {
            user_id: sessionUser.id,
            total: total,
            status: "Awaiting Shipment"
        }

        const order = await dispatch(createAnOrder(orderObj));

        if(order?.id){
             cartItemState?.map(async (cartItem) => {
                const orderItemObj = {
                    order_id: order?.id,
                    item_id: cartItem?.id,
                    user_id: sessionUser.id,
                    size: cartItem?.size,
                    quantity: cartItem?.quantity
                }
                const orderItem = await dispatch(createAnOrderItem(orderItemObj));
            })
        }
        clearWholeCart();
        navigate('/orders');

    }
    
    if (!sessionUser) navigate('/');
    return <div>
        <h1>Cart</h1>
        {cartItemState?.length ? <div>
            <button onClick={(e) => {
                        e.preventDefault()
                        clearWholeCart();
                    }}>Clear Cart</button>
            {cartItemState?.map((cartItem) => (
                <div key={cartItem?.id}>
                
                <h1>----------------------------------------------------------------</h1>
                <p>{cartItem?.description?.name}</p>
                <p>Size: {cartItem?.size}</p>
                <p>Quantity: {cartItem?.quantity}</p>
                <p>Price: ${(cartItem?.description?.price* cartItem?.quantity).toFixed(2)}</p>
                <OpenModalMenuItem 
                itemText={<button>Edit Details</button>}
                modalComponent={
                    <EditCartItemModal id={cartItem?.id} />
                }
                />
                <button onClick={(e) => {
                    e.preventDefault()
                    handleDeleteItem(cartItem?.id)
                }}>Remove From Cart</button></div>
            ))}
            <h2>----------------------------------------------------------------</h2>
            <h3>Total: ${total}</h3>
                    <button onClick={(e) => {
                        e.preventDefault()
                        handlePlaceOrder();
                    }}>Place Order</button>
        </div>
        : <h1>Your cart is empty!</h1>}

    </div>
}

export default CartPage;