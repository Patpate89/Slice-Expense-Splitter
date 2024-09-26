import { useContext, useState } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";
import PropTypes from 'prop-types'
import SearchBar from "./SearchBar";
import ExpenseCategorySelection from './ExpenseCategorySelection'
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line react/prop-types

export default function AddExpense({ closeAddExpense, currentGroup }) {

  //I'm using context but we can use props
  const { addExpenseToList, } = useContext(AppContext);
  
  //Generate today's date
  
  const generateDate = () =>{
    const date = new Date()
    // console.log(date)
    const formatDate = date.toLocaleDateString()
    return formatDate
  }
  
  // Initialize state for groupsData
  const [expensesData, setExpensesData] = useState({
    name: "",
    amount:"",
    date:generateDate(),
    category:"",
    description:'',
    id:uuidv4(),
    groupId:currentGroup.id
  });

  // Handle input changes and updates form data state
  const handleChange = (event, selectOptionName) => {
    
    if(selectOptionName){
      setExpensesData(prevExpensesData =>({
        ...prevExpensesData,
        [selectOptionName]:event.value,
      }))
    } else {
        const { name, value } = event.target;
        setExpensesData((prevExpensesData) => ({
          ...prevExpensesData,
          [name]: value,
        }));
    }
    
  };


  const addNewExpense = (event) => {
    event.preventDefault();

    //get stored data from local storage or initialize array
    let storedExpenseData = JSON.parse(localStorage.getItem("expensesData")) || [];
    
    //append new form data to array
    storedExpenseData.push(expensesData);
    
    //save updated array to local storage
    localStorage.setItem("expensesData", JSON.stringify(storedExpenseData));
    addExpenseToList(expensesData);
    closeAddExpense();
    toast("New expense added");
    console.log("expensesData from Addexpense",expensesData)
  };


 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative border w-[535px] h-[625px] rounded-md px-6 pt-6 bg-zinc-50 flex flex-col m-8 font-geologica">
        
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
          <h1 className="p-0 text-md">New Expense</h1>
          <p className="p-0 text-xs text-gray-400">*Mandatory fields</p>
        </div>
        
        <form
          onSubmit={addNewExpense}
          className="flex flex-col flex-1 gap-6 overflow-auto border border-none"
        >
          <div className="flex flex-col">
            <div className='flex items-center'>
              
              <div className='relative flex flex-col'>
                <label className="text-sm">
                Expense name*
                  <input
                    className="w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
                    type="text"
                    name="name"
                    value={expensesData.name}
                    onChange={handleChange}
                    maxLength="30"
                    required
                  />
                </label>
                
            </div>            

            <label className='ml-2 text-sm'>
              Amount*
              <input 
                className='w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9'
                type='number'
                step='0.01'
                min='0'
                name='amount'
                value={expensesData.amount}
                onChange={handleChange}
                required
              />
            </label>
            </div>
            <div className='flex items-start justify-between pt-4'>
              <div className='flex flex-col'>
                <p className='text-sm'>Date*</p>
                <p className='mt-4 text-sm text-input-text '>{generateDate()}</p>
              </div>

              <label className='ml-2 text-sm'>
                <ExpenseCategorySelection 
                  handleChange={handleChange}
                />
              </label>
            </div>            
            
            <label className='flex flex-col pt-4 text-sm '>
              Expense description*
              <textarea 
                className='border border-gray-300 rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500'              
                name='description'
                value={expensesData.description}
                onChange={handleChange}
                required
              />
            </label>

            {/* TODO PLACEHOLDER */}
            <div className='pt-4 mb-auto'>
              <p className='border border-gray-300 border-dashed rounded-md h-[72px] w-full text-left mt-1 p-2 text-gray-500'>placeholder to add receipt</p>
            </div>
            <div className='pt-4 mb-auto'>
              <p >Add members</p>
              <SearchBar />              
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 flex items-center w-full p-4 bg-light-indigo place-content-end ">
              <button
                type={"button"}
                onClick={closeAddExpense}
                className="mr-2 text-sm"
              >
                Close
              </button>
              <button
                type={"submit"}
                className="px-3 py-2 text-sm border-none rounded-lg hover:bg-hover bg-button text-light-indigo"
              >
                Create expense
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>     

  );
}
//Add proptypes validation for eslint
AddExpense.propTypes = {
  closeAddExpense: PropTypes.func.isRequired,
  currentGroup: PropTypes.object.isRequired
}
