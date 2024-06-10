import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: "Passwords do not match!",
      });
    }
    if (phone.length != 10) {
      return setErrors({
        phone: "Enter a 10 digit number!",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        address,
        city,
        state,
        zipcode,
        phone,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="modal-fade-in signup-container">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
        
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          {errors.email && <p className="signup-error">{errors.email}</p>}
        </label>
        
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
          {errors.username && <p className="signup-error">{errors.username}</p>}
        </label>
        
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            minLength="8"
          />
          {errors.password && <p className="signup-error">{errors.password}</p>}
        </label>
        
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && <p className="signup-error">{errors.confirmPassword}</p>}
        </label>
        
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
          {errors.firstName && <p className="signup-error">{errors.firstName}</p>}
        </label>
        
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
          {errors.lastName && <p className="signup-error">{errors.lastName}</p>}
        </label>
        
        <label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Address"
          />
          {errors.address && <p className="signup-error">{errors.address}</p>}
        </label>
        
        <label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="City"
          />
          {errors.city && <p className="signup-error">{errors.city}</p>}
        </label>
        
        <label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            placeholder="State"
          />
          {errors.state && <p className="signup-error">{errors.state}</p>}
        </label>
        
        <label>
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
            placeholder="Zipcode"
          />
          {errors.zipcode && <p className="signup-error">{errors.zipcode}</p>}
        </label>
        
        <label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Phone"
            
          />
          {errors.phone && <p className="signup-error">{errors.phone}</p>}
        </label>
        
        <button type="submit" className="signup-signup-button">Create Account</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
