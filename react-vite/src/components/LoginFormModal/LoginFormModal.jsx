import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from 'react-router-dom';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const errorText = errors === "Invalid credentials" ? "The provided credentials were invalid" : null;

  const demoUserLogIn = async () => {
    const serverResponse = await dispatch(thunkLogin({
      email: "demo@aa.io",
      password: "password",
    }));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="modal-fade-in login-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          <p className="login-container-title">Email</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          {errors.email && <p className="login-form-error">{errors.email}</p>}
        </label>

        <label>
          <p className="login-container-title">Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          {errors.password && <p className="login-form-error">{errors.password}</p>}
        </label>
        <button type="submit" className="login-login-button">Log In</button>
        <p className="log-in-as">Log In With</p>
        <button className='demo-user-button' type='demoUser' onClick={demoUserLogIn}>👨‍💼 | Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
