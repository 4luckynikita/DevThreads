import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCartItems, deleteCartItem } from "../../redux/cartitems";
import { useNavigate } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditCartItemModal from "../EditCartItemModal/EditCartItemModal";
import { createAnOrder, createAnOrderItem } from "../../redux/orders";
import "./CartPage.css"

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let sessionUser = useSelector((state) => state.session.user);
    let [total, setTotal] = useState(0);
    useEffect(() => {
        setTotal(0)
        if (!sessionUser) navigate('/');
        dispatch(getAllCartItems(sessionUser?.id));

    }, [dispatch, navigate, sessionUser]);
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

    console.log("The state", cartItemState)
    async function handlePlaceOrder() {
        const orderObj = {
            user_id: sessionUser.id,
            total: total,
            status: "Awaiting Shipment"
        }

        const order = await dispatch(createAnOrder(orderObj));

        if (order?.id) {
            cartItemState?.map(async (cartItem) => {
                const orderItemObj = {
                    order_id: order?.id,
                    item_id: cartItem?.item_id,
                    user_id: sessionUser.id,
                    size: cartItem?.size,
                    quantity: cartItem?.quantity
                }
                const orderItem = await dispatch(createAnOrderItem(orderItemObj));
            })
        }
        clearWholeCart();
        navigate('/orders?ordered=true');

    }

    if (!sessionUser) navigate('/');
    return <div className="cart-container">
        <div className="cart-container-header">
            <h1>Cart</h1>
            {cartItemState?.length && <button onClick={(e) => {
                e.preventDefault()
                clearWholeCart();
            }} className="cart-container-clear-button">Clear Cart</button>}
        </div>

        {cartItemState?.length ? <div>

            {cartItemState?.map((cartItem) => (
                <div key={cartItem?.id} className="cart-item-container">

                    <img src={cartItem?.description?.main_image} alt="Image of Item" />
                    <div className="cart-item-body">
                        <div>
                            <p>{cartItem?.description?.name}</p>
                            <p>Size: {cartItem?.size}</p>
                            <p>Price: ${(cartItem?.description?.price).toFixed(2)}</p>
                            <p>Quantity: {cartItem?.quantity}</p>
                        </div>

                        <div className="cart-item-buttons-container">
                            <button onClick={(e) => {
                                e.preventDefault()
                                handleDeleteItem(cartItem?.id)
                            }}
                                className="cart-item-remove-button"
                            >Remove From Cart</button>
                            <OpenModalMenuItem
                                itemText={<button className="cart-item-edit-button">Edit Details</button>}
                                modalComponent={
                                    <EditCartItemModal id={cartItem?.id} />
                                }
                            />
                        </div>
                    </div>
                </div>
            ))}
            <div className="cart-footer">
                <p>Total: ${total}</p>
                <button onClick={(e) => {
                    e.preventDefault()
                    handlePlaceOrder();
                }}
                className="cart-order-button"
                >Place Order</button>
            </div>
        </div>
            : <h1>Your cart is empty!</h1>}

    </div>
}

export default CartPage;