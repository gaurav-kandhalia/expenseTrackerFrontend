import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/api";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import Button from "../components/Button";
export default function SignUp() {
  const { login } = useAuth();


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState('')
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const data = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: "employee"
      };


      const res = await signUp(data);
      setMessage(res.data.message)

      login(res.data);
    } catch (err) {
      console.error("Signup failed", err.response?.data || err.message);
      alert("Signup failed. Check the console for more info.");
    }
  };
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  }
  return (
    <div className="border-2 border-green-300 flex justify-center flex-col items-center gap-4">
      <h1 className="font-bold text-2xl">Sign Up</h1>

      <label className="text-xl font- " htmlFor="fullName">Full Name:</label>

      <InputField
        type="text"
        name="fullName"
        value={formData.fullName}
        placeholder="Full Name"
        onChange={handleInputChange}
        className="w-1/2"
      />

      <label className="text-xl font- " htmlFor="email">Email</label>
      <InputField
        type="email"
        name="email"
        value={formData.email}

        placeholder="Email"
        onChange={handleInputChange}
        className="w-1/2"
      />

      <label className="text-xl font- " htmlFor="password">Password</label>
      <InputField
        type="password"
        name="password"
        value={formData.password}
        placeholder="Password"
        onChange={handleInputChange}
        className="w-1/2"
      />
      <div>
        {message && <p className="text-green-500">{message}</p>}
      </div>
      <div className="flex gap-2.5 justify-center items-center ">
        <Button onClick={handleSubmit} className="">
          Sign Up
        </Button>

        <h4>or</h4>
        <Button onClick={goToLogin} className="bg-red-500">
          Log In
        </Button>
      </div>
    </div>
  );
}



