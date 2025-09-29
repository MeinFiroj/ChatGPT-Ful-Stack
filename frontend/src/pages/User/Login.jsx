import { useForm } from "react-hook-form";
import { loginUser } from "../../appStore/actions/userActions";
import { useDispatch } from "react-redux";

import "./Register.css";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, reset, formState = { errors } } = useForm();
  const dispatch = useDispatch()

  const registerHandler = (data) => {
    const user = {
      email: data.email,
      password : data.password,
    };
    dispatch(loginUser(user));
    // reset()
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(registerHandler)}>
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="email"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="********"
        />
        <button>Login</button>
        <p>Don't have an account? <Link className="link" to='/register' >Register here</Link></p>

      </form>
    </div>
  );
};

export default Login;
