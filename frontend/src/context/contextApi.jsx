import React, { createContext,  useState, useEffect } from "react";
import axios from "axios";




export const UserContext = createContext();


const baseUrl  = "https://productlab.onrender.com" ;



export const UserProvider = ({ children }) => {
 
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  


  
  useEffect(() => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
        delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);



  const register = async (formData,navigate) => {
      try {
        await axios.post( `${baseUrl}/users/register` , formData);
        alert("Signup successfull!")
         navigate("/signin")

      } catch (error) {
        alert("Signup failed")
      }
  };




  const signIn = async (credentialsData ,navigate) => {
    try {
    const res = await axios.post(`${baseUrl}/users/signin`, credentialsData);

      if (res.status === 200) {
        const { token, user ,role  } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role",role  );
        alert("Signin Successful!");
        setToken(token);
        setUser(user);
        navigate("/")
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Signin failed: Invalid credentials");
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    }
      
  };



  return (
    <UserContext.Provider value={{ user, token, setToken , register,  signIn}}>
      {children}
    </UserContext.Provider>
  );
};
