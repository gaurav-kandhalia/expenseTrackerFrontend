

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getCategories } from "../services/api";
import { useNavigate } from "react-router-dom";
import { addExpenseApi } from "../services/api";
import InputField from "../components/InputField";
import Button from "../components/Button";

const AddExpense = ({setShowAddExpense}) => {
    const { categories,setCategories,setMyExpenses } = useAuth();
    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        notes: "",
        receipt: null
    });
    const [message, setMessage] = useState("");
    // const navigate = useNavigate();
    useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data.data);
        console.log("Fetched categories:", res.data.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, [setCategories]);

      const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      receipt: file
    }));
  };

const handleAddExpense = async () => {
  console.log("Form data before API call:", formData);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.user?._id;

      if (!userId) {
        setMessage("User not found.");
        return;
      }

      const expenseData = {
        amount: formData.amount,
        category: formData.category,
        notes: formData.notes,
        userId
      };
        console.log("Expense data to be sent:", expenseData);
      const res = await addExpenseApi({
        amount: formData.amount,
        category: formData.category,
        notes: formData.notes,
        userId
      });
      console.log("Expense added:", res.data);

      setMyExpenses((prev) => [...prev, res.data.data]);
      setMessage(res.data.message);
      setShowAddExpense(false);
    } catch (err) {
      console.error("Failed to add expense", err);
      setMessage("Failed to add expense");
    }

  };


    return (
        <div className="flex flex-col   p-4 gap-8">
            <h1 className="font-bold text-center">Add Expenses</h1>
           <div className="flex gap-4">
             <label htmlFor="Amount">Amount:</label>
            {/* <input type="number" name="amount" placeholder="Enter amount" /> */}
             <InputField
        type="number"
        name="amount"
        value={formData.amount}
        placeholder="Enter amount"
        onChange={handleInputChange}
        className="w-1/2 border-2 border-gray-300 p-2 rounded-md mb-4"
      />
           </div>
           <div className="flex gap-4">
             <label htmlFor="Category">Category:</label>
            <select  name="category"
  value={formData.category}
  onChange={handleInputChange}
  required>
               <option value="">-- Select Category --</option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>
           </div>
            <div className="flex gap-4">
              <label htmlFor="Notes">Notes:</label>
                <InputField
        type="text"
        name="notes"
        value={formData.notes}
        placeholder="add note"
        onChange={handleInputChange}
        className="w-1/2 border-2 border-gray-300 p-2 rounded-md mb-4"
      />
            </div>
            <div className="flex gap-4">
              <label htmlFor="reciept">reciept</label>
            <input type="file" onChange={handleFileChange} className="border-2 border-balck"/>
            </div>
            {message && <p className="text-red-500">{message}</p>}
            
                 <Button onClick={handleAddExpense} type={"submit"} className="bg-blue-500 w-25">
          Add
        </Button>
       </div>
    )
       
}

export default AddExpense;