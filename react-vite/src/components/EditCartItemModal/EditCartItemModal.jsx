import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editCartItem, getAllCartItems } from "../../redux/cartitems";
import "./EditCartItemModal.css"


const EditCartItemModal = ({ id }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCartItems(sessionUser?.id));
    }, [dispatch, id]);
    let sessionUser = useSelector((state) => state.session.user);
    let cartItemState = useSelector((state) => state.cartItems.items)
    let currentItemState = cartItemState.find(item => item.id == id)
    console.log(cartItemState)
    const [size, setSize] = useState(currentItemState?.size);
    const [quantity, setQuantity] = useState(currentItemState?.quantity);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const newErrors = {};
        if (!size) {
            newErrors.size = "Please select a size!"
        }
        if (!sessionUser) {
            newErrors.login = "Please log in to use cart!"
        }
        if (!quantity) {
            newErrors.quantity = "Please pick a quantity of 1 or more!"
        }
        if (Object.keys(newErrors).length > 0) {
            return setErrors(newErrors);
        }

        const updatedData = {
            item_id: currentItemState?.id,
            user_id: sessionUser?.id,
            size,
            quantity
        }

        const serverResponse = await dispatch(editCartItem(id, updatedData));
        if (serverResponse != "Ok") {
            setErrors(serverResponse)
            console.log(size);
        }
        else {
            dispatch(getAllCartItems(sessionUser.id));
            return closeModal()
        }
    }

    return <div className="edit-cart-container modal-fade-in">
        <h2>Edit your order details for {currentItemState?.description?.name}</h2>
        <form onSubmit={handleSubmit} className="edit-cart-form">
            <div>
                <p>Size</p>
                {errors.size && <p>{errors.size}</p>}
                <select onChange={(e) => setSize(e.target.value)} value={size}>
                    <option disabled selected value> Select Size </option>
                    {currentItemState?.description && currentItemState?.description?.sizes?.split(',').map((size) => (
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
            </div>
            <div className="edit-cart-form-right">
                {errors.login && <p>{errors.login}</p>}
                <button type="submit" className="edit-cart-form-submit">Save Changes</button>
                <button type="none" onClick={closeModal} className="edit-cart-form-cancel">Cancel</button>
            </div>
        </form>
    </div>
}

export default EditCartItemModal;