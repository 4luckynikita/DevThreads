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
        if (!size) {
            newErrors.size = "Please select a size!"
        }
        if (!sessionUser) {
            newErrors.login = "You are logged out!"
        }
        if (!quantity) {
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

        if (!serverResponse.item_id) {
            setErrors(serverResponse)
            console.log('ERROR ', errors);
        }
        else {
            dispatch(getAllCartItems(sessionUser.id));
            navigate('/?cartAdded=true');
        }

    }

    return <div className="item-page-container">
        <h1 className="item-page-type">{itemState?.type}</h1>
        <div className="item-page-inner-container general-container">
            <img src={itemState?.main_image} className="item-page-image" />
            <div className="item-page-description">
                <div className="item-page-description-upper">
                    <h1>{itemState?.name}</h1>
                    <h1>${(Math.round(itemState?.price * 100) / 100).toFixed(2)}</h1>
                </div>
                <p className="item-page-availability">In Stock</p>
                <div className="item-page-body">
                    <p className="item-description">{itemState?.description}</p>

                </div>
                <form onSubmit={handleSubmit} className="item-page-form">
                    <div className="item-page-form-container">
                        <div className="item-page-form-container-error">
                            {errors.size && <p>{errors.size}</p>}
                        </div>
                        <p className="item-page-form-container-title">Size</p>
                        <select style={{ color: 'black' }} onChange={(e) => setSize(e.target.value)} placeholder="Select Size" className="item-page-form-container-dropdown">
                            <option disabled selected value> Select Size </option>
                            {itemState && itemState?.sizes?.split(',').map((size) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    <div className="item-page-form-container">
                        <div className="item-page-form-container-error">
                            {errors.quantity && <p>{errors.quantity}</p>}
                        </div>
                        <p className="item-page-form-container-title">Quantity</p>

                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            style={{ color: 'black' }}
                            min="1"
                            max="99"
                            className="item-page-form-container-quantity"
                        />
                    </div>
                    <div className="item-page-form-container">
                        <div className="item-page-form-container-error">
                            {errors.login && <p>{errors.login}</p>}
                        </div>
                        <button type="submit" className="item-page-add-to-cart">Add To Cart</button>
                    </div>
                </form>
                <div className="item-page-description-lower">
                <div className="item-page-size-chart">
                    <h1>Sizing Info</h1>
                    <p>This product is available in a variety of sizes. Before purchasing, please note that all sizes are in the standard US layout. Consult your tailor (or, a friend) to ensure the optimal fit for your body type.</p>
                </div>
                <div className="item-page-return-policy">
                    <h1>Return Policy</h1>
                    <p>Here's the catch: we don't have one, and all sales are final. Think about it! That's like borrowing your favorite app's source code, looking at it, trying it out within the scope of your own work, and then giving it back. You still tried it out! That's not a fair exchange, and therefore in this industry we are unable to accept returns.</p>
                </div>
            </div>
            
            </div>
            
        </div>

    </div>
}

export default ItemPage;