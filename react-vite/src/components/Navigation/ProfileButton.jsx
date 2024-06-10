import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import { CgProfile } from "react-icons/cg";


function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <button onClick={toggleMenu} className="menu-button">
      <CgProfile />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>Hi {user.username}!</li>
              <li>{user.email}</li>
              <li>
                
                  <button
                    onClick={() => {
                      navigate(`/orders`, { replace: true });
                      closeMenu();
                    }}
                    className="profile-dropdown-button"
                  >
                    Orders
                  </button>
                
              </li>
              <li>
                <button onClick={logout} className="profile-dropdown-button">
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <div className="profile-dropdown-buttons">
              <p>Returning user?</p>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
                
              />
              <p>No account?</p>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
                className="profile-dropdown-button"
              />
            </div>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
