import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCartItems, deleteCartItem } from "../../redux/cartitems";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../redux/orders";
import CancelOrderModal from "../CancelOrderModal/CancelOrderModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditCartItemModal from "../EditCartItemModal/EditCartItemModal";
import EditOrderItemModal from "../EditOrderItemModal/EditOrderItemModal";
const OrdersPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let sessionUser = useSelector((state) => state.session.user);
    useEffect(() => {
        if (!sessionUser) navigate('/');
        dispatch(getAllOrders(sessionUser?.id));
    }, [dispatch, sessionUser]);
    let ordersState = useSelector((state) => state.orders.orders?.reverse())
    console.log(ordersState)
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - 5);
    function handleDeleteOrder(e, id){
        
    }

    return <div>
        <h1>Orders</h1>
        <p>Here you can view, track, and adjust your orders prior to them shipping. It takes approximately 5 minutes for an order to be shipped.</p>
        {ordersState?.length ? 
        <div>
            
            {ordersState?.map((order) => (
                <div key={order?.id}>
                    <h1>------------------------------------</h1>
                    <p>Order #{order?.id}</p>
                    <p>Total: ${order?.total}</p>
                    <p>Status: {new Date(order?.delivery_date) < currentDate ? "Shipped" : "Awaiting Shipment"}</p>
                    <p>Order contents ------------------------</p>

                    {order?.items && order?.items?.map((item) => (
                        <div key={item?.id}>
                            <h3>{item?.details?.name}</h3>
                            <p>Price: ${item?.details?.price}</p>
                            <p>Size: {item?.size}</p>
                            <p>Quantity: {item?.quantity}</p>
                            {new Date(order?.delivery_date) >= currentDate && 
                                <OpenModalMenuItem 
                                itemText={<button>Edit Details</button>}
                                modalComponent={
                                    <EditOrderItemModal id={item?.id} orderId={order?.id} />
                                }
                                />
                                }
                        </div>
                    ))}
                    <p>--------------------------------------</p>
                    {new Date(order?.delivery_date) >= currentDate && <OpenModalMenuItem 
                itemText={<button>Cancel Order</button>}
                modalComponent={
                    <CancelOrderModal id={order?.id} />
                }
                />}
                    
                </div>

            ))}
        </div> 
        : <h1>You have no orders!</h1>}
    </div>
}

export default OrdersPage;