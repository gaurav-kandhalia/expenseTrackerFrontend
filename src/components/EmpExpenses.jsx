
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyExpenses } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
function EmpExpenses({setShowAddExpense}) {

    const navigate = useNavigate();

    const { user, logout, myExpenses, setMyExpenses, accessToken } = useAuth();
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await getMyExpenses();
                setMyExpenses(res.data.data);
                console.log(res)
            } catch (err) {
                console.error("Failed to fetch expenses", err);
                // Handle error, e.g., show a message or redirect
                if (err.response?.status === 401) {
                    logout();
                    navigate('/login');
                }
            }
        }
        fetchExpenses();
    }, []);

    // const handleEditExpense = () => {
    //     navigate('/employee/edit-expense');
    // }
    const addExpense = ()=>{
        setShowAddExpense(true);
    }
    return (
        <div>
            
            <div className="flex  items-center bg-gray-200 p-4 flex-col">
                <h1 className="text-xl font-bold text-center">Employee Expenses</h1>
                {
                    myExpenses.map((expense) => (
                        <div key={expense._id} className="flex justify-center items-center bg-white p-2 mb-2 rounded shadow flex-col w-full mt-2">
                            <div className='border-black p-2  w-full flex flex-col gap-5' key={expense._id}>
                               <div className='flex flex-col gap-2'>
                                 <div className='flex'>
                                    <div className="flex gap-2">
                                        <p className="font-bold flex gap-4 text-green-500">Title : </p>
                                 <p className='text-black font-bold'>{expense.category?.name}</p>
                                    </div>
                                 </div>
                              <div className='flex gap-2'>
                                  <p className="font-bold flex gap-4 text-green-500">Amount    : </p><p className='text-black font-bold'>{expense.amount}Rs</p>
                              </div>
                               <div className='flex gap-2'>
                                 <p className="font-bold flex gap-4 text-green-500">createAt  : </p>
                                <p className='text-black font-bold'>{new Date(expense.createdAt).toLocaleDateString()}</p>
                               </div>
                              <div className='flex gap-2'>
                                  <p className="font-bold flex gap-4 text-green-500">Notes     : </p><p className='text-black font-bold'>{expense.notes}</p>
                              </div>
                               <div className='flex gap-2'>
                                 <p className="font-bold flex gap-4 text-green-500">Status    : </p><p className='text-black font-bold'>{expense.status}</p>
                               </div>
                               </div>
                              <div className='flex gap-2 text-white'>
                                    {/* <button onClick={handleEditExpense} className='border-black bg-gray-600 p-1 rounded-2xl w-25 flex justify-center items-center'>edit</button> */}
                                    <button className=" bg-red-600 p-1 rounded-2xl w-25 flex justify-center items-center">delete</button>
                                    <button onClick={addExpense} className='bg-gray-600 p-1 w-25 flex justify-center items-center rounded-2xl'>add</button>

                                </div>
                            </div>
                            
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default EmpExpenses