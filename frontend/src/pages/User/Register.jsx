import { useForm } from "react-hook-form";
import { registerUser } from "../../appStore/actions/userActions";

import "./Register.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit, reset, formState = { errors } } = useForm();
  const dispatch = useDispatch()

  const registerHandler = (data) => {
    const newUser = {
      email: data.email,
      password : data.password,
      fullName: {
          lastName: data.lastName,
          firstName: data.firstName,
      }
    };
    dispatch(registerUser(newUser));
    reset()
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit(registerHandler)}>
        <input
          {...register("firstName", { required: true })}
          type="text"
          placeholder="first name"
        />
        <input
          {...register("lastName", { required: true })}
          type="text"
          placeholder="last name"
        />
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
        <button>Register</button>
        <p>Don't have an account? <Link className="link" to='/login' >Login here</Link></p>
      </form>
    </div>
  );
};

export default Register;
