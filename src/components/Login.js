import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate =useNavigate()

  useEffect(()=>{
    const auth =localStorage.getItem("user")
    if(auth)
    { 
      navigate("/")
    }
  })

  const handleLogin =async () => {
    console.log(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
   result = await result.json()
   console.log(result)
   if(result.auth){
    localStorage.setItem("user",JSON.stringify(result.user))
    localStorage.setItem("token",JSON.stringify(result.auth))
   navigate('/')
   }else{
    alert("please enter correct details")
   }
  };
  return (
    <div className="register">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" type="button" onClick={handleLogin}>
        Submit
      </button>
    </div>
  );
}
