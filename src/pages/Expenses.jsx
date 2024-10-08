import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { AppContext } from "../App";
import EditExpense from "../components/EditExpense";
import Expense from "../components/Expense";
import ViewReceipt from "../components/ViewReceipt";
import { fetchReceiptImage } from '../helpers/firebaseUtils'

export default function Expenses() {
  const { groupId } = useParams()
  const { expenses, groups } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [title, setTitle]= useState([])
  const [isViewingReceipt, setIsViewingReceipt] = useState(false)
  const [receiptImageUrl, setReceiptImageUrl] = useState(null)

  const currentGroup = groups.find(group=> group.id === Number(groupId))

  const filteredExpenses = expenses.filter(expense => expense.groupId === Number(groupId))

  const openEditExpense = (expense) => {
    setSelectedExpense(expense);
    setIsEditing(true);
  };

  const closeEditExpense = () => {
    setIsEditing(false);
    setSelectedExpense(null);
  };

  const openReceipt = async (expenseId) =>{
    setIsViewingReceipt(true)
    const fileUrl = await fetchReceiptImage(expenseId)
    console.log("Fetched URL:", fileUrl)
    setReceiptImageUrl(fileUrl)
    
  }
  const closeReceipt = () =>{
    setIsViewingReceipt(false)
  }
  
  const generateTitle = () =>{
    const formattedDate = new Date().toLocaleString('en-US', 
      {year: 'numeric', month:'long'})
    return(formattedDate)
  }

  useEffect(()=>{
    if(filteredExpenses.length > 0){
      const currentTitle = generateTitle()
      setTitle(currentTitle)
    }   
  }, [filteredExpenses])

  return (
    <div >      
      {filteredExpenses.length === 0 ? (
      <p>No expenses found.</p>
      ) : (
        <>
          {title && <p className="text-sm text-button">{title}</p>}
          {filteredExpenses.map((expense)=>(
            <Expense key={expense.id} expense={expense} showButtons={true} openReceipt={openReceipt} openEditExpense={openEditExpense}/>
          ))}  
        </>     
      )}

      {isEditing && selectedExpense && currentGroup &&(
        <EditExpense 
          expense={selectedExpense} 
          closeEditExpense={closeEditExpense}
          currentGroup={currentGroup}
        />
      )}
      {isViewingReceipt && (
        <ViewReceipt 
          closeReceipt={closeReceipt} 
          fileUrl={receiptImageUrl}
        />
      )}

    </div>
  );
}
