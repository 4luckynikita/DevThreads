import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItems } from "../../redux/items";
import "./HomePage.css"
import { NavLink, useParams } from "react-router-dom";

const HomePage = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const cartAdded = queryParameters.get("cartAdded")
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    let itemState = useSelector((state) => state.items?.items);
    // itemState = Object.values(itemState)
    // itemState = itemState[0]
    console.log("itemState", itemState);



    return (
        <div className="homepage-container">
            {cartAdded && <p className="cart-added-popup">Added to cart!</p>}
            {/* <div className="homepage-featured-container general-container">
                <h1> *** PLACEHOLDER FOR FEATURED *** </h1>
            </div> */}
            <div className="homepage-items-section">
                <h1 className="homepage-items-section-heading">Apparel</h1>
                <div className="homepage-items-container">
                    {itemState?.length && itemState?.map((item) => (<div className="homepage-item-container-botmoment">
                    <NavLink to={`/items/${item?.id}`}>
                    <div key={item?.name} className="homepage-item">
                        <img src={item?.main_image} />
                        <div className="homepage-item-bottom">
                            <h1>{item?.name}<h2>{item?.type}</h2></h1>
                            <p>${(Math.round(item?.price * 100) / 100).toFixed(2)}</p>
                        </div>
                    </div></NavLink>
                    </div>))}
                    <div className="squeezer" />
                </div>

            </div>
        </div>
    )
}

export default HomePage;