import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnOrder, getAllOrders } from "../../redux/orders";
import "./CancelOrderModal.css"


const CancelOrderModal = ({id}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    let sessionUser = useSelector((state) => state.session.user);
    let cartItemState = useSelector((state) => state.cartItems.items)
    let currentItemState = cartItemState.find(item => item.id === id)
    //console.log(currentItemState)
    const [size, setSize] = useState(currentItemState?.size);
    const [quantity, setQuantity] = useState(currentItemState?.quantity);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const serverResponse = await dispatch(deleteAnOrder(id));
        dispatch(getAllOrders(sessionUser?.id));
        closeModal();
    }

    return <div className="modal-fade-in cancel-order-container">
        <h2>Are you sure you want to cancel this order?</h2>
        <form onSubmit={handleSubmit} className="cancel-order-form">
            <button type="submit" className="cancel-order-form-submit">Cancel Order</button>
            <button type="none" onClick={closeModal} className="cancel-order-form-cancel">Go Back</button>
        </form>
    </div>
}

export default CancelOrderModal;