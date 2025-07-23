import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function Login() {

  const navigate = useNavigate();
  const {login} = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async () => {
  try {
    const res = await loginAPI({
      email: formData.email,
      password: formData.password
    });
    console.log("Login Success:", res.data.data.user);
    
    console.log("USER", res.data.data);
    login(res.data.data);
    setMessage(res.data.message);
  //  if(res.data.data.user.role==="employee"){
  //   navigate('/employee/dashboard')
  //  }else if(res.data.data.user.role==="admin"){
  //   navigate('/admin/dashboard')
  //  }
  } catch (err) {
    console.error("Login failed", err?.response?.data || err.message);
    
    // Safely access backend error message
    const backendMessage = err?.response?.data?.message || "Login failed. Please try again.";

    // Display the message on the UI
    setMessage(backendMessage);
  }
};


  return (
    <div className="border-2 border-green-300 flex justify-center flex-col items-center gap-4 py-6 px-4">
      <h1 className="font-bold text-2xl">Log In</h1>

      <label className="text-xl" htmlFor="email">Email:</label>
      <InputField
        type="email"
        name="email"
        value={formData.email}
        placeholder="Email"
        onChange={handleInputChange}
        className="w-1/2"
      />

      <label className="text-xl" htmlFor="password">Password:</label>
      <InputField
        type="password"
        name="password"
        value={formData.password}
        placeholder="Password"
        onChange={handleInputChange}
        className="w-1/2"
      />

      {message && <p className="text-green-500">{message}</p>}

      <div className="flex gap-2.5 justify-center items-center">
        <Button onClick={handleSubmit}>Log In</Button>
        <h4>or</h4>
        <Button onClick={() => navigate("/")} className="bg-blue-500">
          Sign Up
        </Button>
      </div>
    </div>
  );
}
