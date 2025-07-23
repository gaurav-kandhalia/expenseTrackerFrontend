import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button';
function HomePage() {
    const navigate = useNavigate();
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4'>
        <h1 className='font-bold'>expenseTracker</h1>
        <p className='text-3xl font-bold'>Welcome to the Expense Tracker App</p>
        {/* <button>login</button> */}
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button onClick={() => navigate("/signUp")}>Sign Up</Button>
        <Button onClick={() => navigate("/employee/dashboard")}>Dashboard</Button>
       
        
    </div>
  )
}

export default HomePage