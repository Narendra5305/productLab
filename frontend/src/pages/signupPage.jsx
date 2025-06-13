import "./pageCss/signupPage.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/contextApi";

export const SignupPage = () => {
  const navigate = useNavigate();
  const { register } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData, navigate);
    setFormData({
      name: "",
      email: "",
      password: ""
     
    });
  };

   
  return (
    <div id="sign-up">
      <div className="sign-up-form">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <button type="submit">Create Account</button>
          <a onClick={() => navigate("/signin")}>Already have an account?</a>
        </form>
      </div>
    </div>
  );
};


