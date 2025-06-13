import React from "react"

import "./componentCss/navbar.css"
import { useNavigate } from "react-router"
import {UserContext} from "../context/contextApi"
import { useContext } from "react"

export const  Navbar = () =>{
    const navigate = useNavigate()
    const{token} =useContext(UserContext)
   


    const handleLogout =() =>{
        localStorage.removeItem("token");
        setToken(null);
        navigate("/signin");
    }

    

    return(
        <nav>
            <div id="navbar">
                <div className="navbar-cont">
                    <div className="logo-cont" onClick={()=>navigate("/")}>
                        <h3>Root Finder</h3>
                    </div>

                    <div className="navbar-option">
                        <ul>
                            <li>Find Your Destination!</li>
                        </ul>
                        
                    </div>

                    <div className="auth-nav">
                        {!token ? (
                            <button onClick={() => navigate("/signin")}>Sign in</button>
                        ) : (
                            <button onClick={handleLogout}>Logout</button>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    )
}