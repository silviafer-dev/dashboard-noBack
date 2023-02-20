import { useState } from "react";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myContext } from "../App";
import { MockUsers } from "../data/mockUsers";
import { types } from "../reducerLogin/ReducerLogin";
import { FormLogin } from "../styles/style";
import { DefaultButton } from "../styles/style-buttons";

export function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  const { auth, dispatchAuth } = useContext(myContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const notify = (message) => {
    toast.error(message);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const dataInput = MockUsers.find(
      (item) => item.password === input.password && item.email === input.email
    );
    if (dataInput) {
      dispatchAuth({
        type: types.login,
        value: {
          full_name: dataInput.full_name,
          email: dataInput.email,
        },
      });
      let from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } else if (!auth.isAuth) {
      notify("Username or password is incorrect! Please, try again!");
    } else {
      dispatchAuth({ type: types.logout });
    }
  }

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value.trim() });
  };
  return (
    <FormLogin onSubmit={handleSubmit}>
      <h1>Login</h1>

      <label htmlFor="email">Email:</label>
      <input
        className="email"
        name="email"
        placeholder="dorothy@hotmail.com"
        value={input.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Password: </label>
      <input
        className="password"
        name="password"
        type="password"
        value={input.password}
        onChange={handleChange}
        placeholder="12345"
      />

      <DefaultButton type="submit" className="login">
        Login
      </DefaultButton>

      <div style={{ color: "rgba(0,0,0,0.5)", fontSize: "12px" }}>
        <p>Email: dorothy@hotmail.com</p>
        <p>Password: 12345</p>
      </div>
      {/* <NavLink to={"/"}>Dashboard</NavLink> */}
    </FormLogin>
  );
}
