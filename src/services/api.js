import axios from "axios";

// Base Axios instance
const API = axios.create({
  
  baseURL:"https://expensetrackbackend-41h5.onrender.com/api/v1",
});






// Auth APIs
export const signUp = (data) => API.post("/user/signUp", data);
export const login = (data) => API.post("/user/login", data);
export const refreshAccessToken = (refreshToken) => 
  API.post("/user/refreshAccessToken", { refreshToken });

// Employee APIs
export const addExpenseApi = (data) =>{
  console.log(("-----------------data-----------"),data)
   const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;
  return API.post("/expense/addExpense", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },    
  });
}
  
export const getMyExpenses = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;

  return API.get("/expense/allExpenses", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getExpenseStats = () => API.get("/employee/expense-stats");
export const getCategories = ()=> {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;

  return API.get("/expense/getCategories", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }); 
};

// Admin APIs
export const getAllExpenses = () => API.get("/admin/expenses");
export const updateExpenseStatus = (data) => API.put("/admin/update-expense", data);
export const getAuditLogs = () => API.get("/admin/audit-logs");

