import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editAnOrderItem, getAllOrders } from "../../redux/orders";


const EditOrderItemModal = ({id, orderId}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrders(sessionUser?.id));
    }, [dispatch, id]);
    let sessionUser = useSelector((state) => state.session.user);
    let orderItemState = useSelector((state) => state?.orders.orders)
    let currentOrderState = orderItemState.find(item => item.id === orderId)
    let currentItemState = currentOrderState?.items?.find(item => item.id === id)
    console.log(id, currentItemState)
    const [size, setSize] = useState(currentItemState?.size);
    const [quantity, setQuantity] = useState(currentItemState?.quantity);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const newErrors = {};
        if(!size) {
            newErrors.size = "Please select a size!"
        }
        if(!sessionUser) {
            newErrors.login = "Please log in to use cart!"
        }
        if(!quantity) {
            newErrors.quantity = "Please pick a quantity of 1 or more!"
        }
        if (Object.keys(newErrors).length > 0) {
            return setErrors(newErrors);
        }
        
        const updatedData = {
            order_id: orderId,
            item_id: currentItemState?.id,
            user_id: sessionUser?.id,
            size,
            quantity
        }

        const serverResponse = await dispatch(editAnOrderItem(id, updatedData));
        if (serverResponse != "Ok"){
            setErrors(serverResponse)
            console.log(size);
        }
        else {
            dispatch(getAllOrders(sessionUser.id));
            return closeModal()
        }
    }

    return <div className="edit-cart-container">
        <h2>Edit your order details for {currentItemState?.details?.name}</h2>
        <form onSubmit={handleSubmit}>
            <p>Size</p>
            {errors.size && <p>{errors.size}</p>}
            <select  onChange={(e) => setSize(e.target.value)} value={size}>
                <option disabled selected value> Select Size </option>
                {currentItemState?.details && currentItemState?.details?.sizes?.split(',').map((size) => (
                    <option key={size} value={size}>{size}</option>
                ))}
            </select>
            <p>Quantity</p>
            {errors.quantity && <p>{errors.quantity}</p>}
            <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            
            min="1"
            max="99"
            />
            {errors.login && <p>{errors.login}</p>}
            <button type="submit">Save Changes</button>
            <button type="none" onClick={closeModal}>Cancel</button>
        </form>
    </div>
}

export default EditOrderItemModal;