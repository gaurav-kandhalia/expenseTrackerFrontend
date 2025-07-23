

import React,{useState} from 'react'
import EmpExpenses from '../components/EmpExpenses'
import AddExpense from '../components/AddExpense'

function EmployeeDashboard() {
    const [showAddExpense, setShowAddExpense] = useState(false);
  return (
    <div className=''>
        <h1 className='text-center font-bold text-2xl'>EmployeeDashboard</h1>
        {!showAddExpense && <EmpExpenses setShowAddExpense={setShowAddExpense} />}
        {showAddExpense && <AddExpense setShowAddExpense={setShowAddExpense}/>}
    </div>
  )
}

export default EmployeeDashboard