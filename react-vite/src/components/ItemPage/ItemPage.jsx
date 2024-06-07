import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCurrentItem } from "../../redux/items";
import "./ItemPage.css"
import { useNavigate, useParams } from "react-router-dom";
import { createACartItem, getAllCartItems } from "../../redux/cartitems";


const ItemPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    useEffect(() => {
        dispatch(fetchCurrentItem(id));
    }, [dispatch, id]);
    let sessionUser = useSelector((state) => state.session.user);
    let itemState = useSelector((state) => state.items?.item);

    const [item_id] = useState(id);
    const [user_id] = useState(sessionUser?.id);
    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [errors, setErrors] = useState({});


    if (!itemState || Object.values(itemState)?.length == 0) return <h1>Item not found!</h1>
    console.log("itemState", itemState);

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
        
        const cartItemData = {
            item_id,
            user_id,
            size,
            quantity
        }
        const serverResponse = await dispatch(createACartItem(cartItemData));

        if (!serverResponse.item_id){
            setErrors(serverResponse)
            console.log('ERROR ', errors);
        }
        else {
            dispatch(getAllCartItems(sessionUser.id));
            navigate('/');
        }

    }

    return <div>
        <img src={itemState?.main_image} style={{width: '200px'}}/>
        <h1>{itemState?.name}</h1>
        <p>{itemState?.price}</p>
        <form onSubmit={handleSubmit}>
            <p>Size</p>
            {errors.size && <p>{errors.size}</p>}
            <select style={{color: 'black'}} onChange={(e) => setSize(e.target.value)} placeholder="Select Size">
                <option disabled selected value> Select Size </option>
                {itemState && itemState?.sizes?.split(',').map((size) => (
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
            style={{color: 'black'}}
            min="1"
            max="99"
            />
            {errors.login && <p>{errors.login}</p>}
            <button type="submit">Add To Cart</button>
        </form>

    </div>

}

export default ItemPage;