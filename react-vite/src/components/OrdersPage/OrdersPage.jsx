import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCartItems, deleteCartItem } from "../../redux/cartitems";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../redux/orders";
import CancelOrderModal from "../CancelOrderModal/CancelOrderModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditCartItemModal from "../EditCartItemModal/EditCartItemModal";
import EditOrderItemModal from "../EditOrderItemModal/EditOrderItemModal";
import "./OrdersPage.css"
const OrdersPage = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const ordered = queryParameters.get("ordered")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let sessionUser = useSelector((state) => state.session.user);
    useEffect(() => {
        if (!sessionUser) navigate('/');
        dispatch(getAllOrders(sessionUser?.id));
    }, [dispatch, sessionUser]);
    let ordersState = useSelector((state) => state.orders.orders)
    console.log(ordersState)
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - 5);

    let orderTotals = {}
    ordersState?.map((order) => {
        let totalski = 0;
        order?.items?.map((item) => {

            totalski += parseFloat((item?.details?.price * item?.quantity).toFixed(2));
            console.log("Totalski", totalski)
        })
        orderTotals[order?.id] = totalski
    })
    console.log("Totals", orderTotals)

    return <div className="orders-container">
        {ordered && <p className="order-placed-popup">Order has been placed! Thank you!</p>}
        <div className="orders-header">
            <h1>Orders</h1>
            <p>It takes approximately 5 minutes for an order to be shipped.</p>
        </div>

        {ordersState?.length ?
            <div className="order-details-container">

                {ordersState?.toReversed()?.map((order) => (
                    <div key={order?.id} className="order-details">
                        <div className="order-details-footer">
                            <div>
                                <p>Order #{order?.id}</p>
                                <p>Total: ${orderTotals?.[order?.id].toFixed(2)}</p>
                                <p>Status: {new Date(order?.delivery_date) < currentDate ? "Shipped" : "Awaiting Shipment"}</p>
                            </div>
                            <div className="order-details-footer-right">
                                {new Date(order?.delivery_date) >= currentDate && <OpenModalMenuItem
                                    itemText={<button className="cancel-order-button">Cancel Order</button>}
                                    modalComponent={
                                        <CancelOrderModal id={order?.id} />
                                    }
                                />}
                            </div>
                        </div>
                        {order?.items?.length && order?.items?.map((item) => (
                            <div key={item?.id} className="order-details-item">
                                <img src={item?.details?.main_image} alt="Ordered Item"/>
                                <div className="order-details-body">
                                    <h3>{item?.details?.name}</h3>
                                    <p>Price: ${item?.details?.price}</p>
                                    <p>Size: {item?.size}</p>
                                    <p>Quantity: {item?.quantity}</p>
                                </div>
                                {new Date(order?.delivery_date) >= currentDate &&
                                    <OpenModalMenuItem
                                        itemText={<button className="edit-order-button">Edit Details</button>}
                                        modalComponent={
                                            <EditOrderItemModal id={item?.id} orderId={order?.id} />
                                        }
                                    />
                                }
                            </div>
                        ))}

                    </div>

                ))}
            </div>
            : <h1>You have no orders!</h1>}
    </div>
}

export default OrdersPage;