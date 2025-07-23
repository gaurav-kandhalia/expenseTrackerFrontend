import axios from "axios";

// Base Axios instance
const API = axios.create({
  baseURL: "http://localhost:5911/api/v1", // change to your backend URL
});






// Auth APIs
export const signUp = (data) => API.post("/user/signUp", data);
export const login = (data) => API.post("/user/login", data);
export const refreshAccessToken = (refreshToken) => 
  API.post("/user/refreshAccessToken", { refreshToken });

// Employee APIs
export const addExpense = (data) => API.post("/employee/addExpense", data);
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

// Admin APIs
export const getAllExpenses = () => API.get("/admin/expenses");
export const updateExpenseStatus = (data) => API.put("/admin/update-expense", data);
export const getAuditLogs = () => API.get("/admin/audit-logs");

