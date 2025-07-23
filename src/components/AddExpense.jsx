

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const AddExpense = () => {
    
    useEffect(()=>{
                const fetchCategories = async () => {
            try {
                // Fetch categories from API
                }
            catch (err) {
                console.error("Failed to fetch categories", err);
                // Handle error, e.g., show a message or redirect
            }
        }
        fetchCategories();
    },[])
    return (
        <div>
            <h1>ADD Expense</h1>

            <label htmlFor="amount">Amount:</label>
            <input type="number" placeholder="enter amount" />
            <label htmlFor="categroy">category</label>
           
       </div>
    )
       
}
