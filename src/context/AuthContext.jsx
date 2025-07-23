import { createContext,useContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { refreshAccessToken } from "../services/api";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const useAuth = ()=> useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [myExpenses,setMyExpenses] = useState([]);
  const [accessToken,setAccessToken] = useState();
  const [refreshToken,setRefreshToken] = useState();
  const [categories,setCategories] = useState([]);

  const token = user?.token;
  const role = user?.role;

useEffect(() => {
  const checkToken = async () => {
    const accessToken = user?.accessToken;
    const refreshToken = user?.refreshToken;

   

    if (!accessToken || !refreshToken) {
      logout();
      return;
    }

    function isAccessTokenValid(token) {
      if (!token) return false;
      try {
        const decoded = jwtDecode(token);
        return decoded.exp > Date.now() / 1000;
      } catch (error) {
        console.error("Invalid token format:", error);
        return false;
      }
    }

    if (isAccessTokenValid(accessToken)) return;

    try {
      const res = await refreshAccessToken(refreshToken);
      const newAccessToken = res.data?.accessToken;

      if (!newAccessToken) throw new Error("Refresh failed");

      const updatedUser = {
        ...user,
        accessToken: newAccessToken,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setAccessToken(newAccessToken);
    } catch (err) {
      console.error("Auto-refresh failed:", err);
      logout();
    }
  };

  if (user) {
    checkToken();
  }
}, [user]);


const login = (userData) => {
  console.log("....................User logged in:......................", userData);

  localStorage.setItem("user", JSON.stringify(userData));
  setUser(userData); 
  setAccessToken(userData.accessToken);
  setRefreshToken(userData.refreshToken);

 
  if(userData.user.role === "employee"
  ){
    navigate('/employee/dashboard');

  }else if(userData.user.role === "admin"){
    navigate('/admin/dashboard');
  }
};


  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, role, logout,myExpenses,setMyExpenses,accessToken,setUser,login,categories,setCategories,refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
