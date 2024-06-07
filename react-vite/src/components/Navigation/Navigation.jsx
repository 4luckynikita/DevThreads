import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems, deleteCartItem } from "../../redux/cartitems";
import { useEffect } from "react";
import ProfileButton from "./ProfileButton";
import { IoCartOutline } from "react-icons/io5";

import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const location = useLocation();
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(getAllCartItems(sessionUser?.id));
  }, [dispatch, sessionUser]);
  let cartItemStateNav = useSelector((state) => state.cartItems.items)

  return (
    <ul className="navbar">
      <li className="navbar-home">
        <NavLink to="/">
          <img
            src={"/DevThreads-logo.png"}
            className="navbar-logo"
          />
        </NavLink>
      </li>
      <li className="navbar-right">


        <li className="navbar-right">
          {sessionUser && <NavLink to='/cart'>
            <div className="nav-cart-container">
              <IoCartOutline />
              <p> | {cartItemStateNav?.length}</p>
            </div>
          </NavLink>}
          <ProfileButton className={"navbar-profile-button"} />
        </li>

      </li>
    </ul>
  );
}
//a
export default Navigation;
