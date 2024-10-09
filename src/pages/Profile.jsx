import { useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";
import { AppContext } from '../App';
import ConfirmationModal from "../components/ConfirmationModal";

export default function Profile() {

  const { mainUser, setMainUser, addMainUserToFriends, setGroups, setFriends, setExpenses}= useContext(AppContext)
  const [isEditable, setIsEditable] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Load user info from localstorage
  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('mainUserData'))
    if (storedUser){
      setMainUser(storedUser)
      setIsEditable(false)
    }else{
      setIsEditable(true)
    }
  }, [setMainUser])

  const handleChange=(e)=>{
    const {name, value} = e.target
    setMainUser((prevUser) => ({
      ...prevUser,
      [name]:value,
    }))
    console.log("mainUser",mainUser)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const updatedUser = {
      ...mainUser,
      id: mainUser.id || uuidv4()
    }

    //Save user to localStorage
    localStorage.setItem('mainUserData', JSON.stringify(updatedUser))
    setMainUser(updatedUser)
    addMainUserToFriends()
    setIsEditable(false)
  }

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    //clear all localStorage
    localStorage.removeItem('mainUserData')
    localStorage.removeItem('groupsData')
    localStorage.removeItem('friendsData')
    localStorage.removeItem('expensesData')

    //reset all state to initial
    setMainUser({
      name:'',
      userName:'',
      id:null
    })
    setGroups([])
    setFriends([])
    setExpenses([])
    setIsModalOpen(false); // This closes the modal
    setIsEditable(true)
  };  

  return(
    <>
      <div className="flex flex-col max-w-[785px] w-full font-outfit mx-3 mt-12 gap-4">
        <div>
          <form className='flex justify-between w-full gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col flex-grow w-1/2 space-y-2'>
              <p className='pl-2 text-sm text-button'>Personal information</p>
              <div className="flex-grow p-6 border rounded-md md:mt-12 border-border bg-zinc-50">
                <img src="../../images/placeholder.jpg" className="h-24 mb-4 rounded-full"/>

                <label className='text-sm font-medium text-gray-950'>
                  Name 
                  <input 
                    type="text"
                    name="name"
                    value={mainUser.name || ''}
                    onChange={handleChange}
                    maxLength={30}
                    required
                    disabled={!isEditable}
                    className='w-full p-2 mt-1 mb-4 text-sm text-gray-800 border rounded-md border-border'>
                  </input>
                </label>
                <label className='text-sm font-medium text-gray-950'>
                  User name 
                  <input
                    type="text"
                    name="userName"
                    value={mainUser.userName  || ''}
                    onChange={handleChange}
                    maxLength={30}
                    required
                    disabled={!isEditable}
                    className='w-full p-2 mt-1 mb-4 text-sm text-gray-800 border rounded-md border-border'>
                  </input>
                </label>                
                <p className='text-sm font-medium text-gray-950'>Id #</p>
                <p className='w-full p-2 mt-1 mb-4 text-sm text-gray-800 border rounded-md border-border'>{mainUser.id || 'Generated after submission'}</p>
                
              </div>
            </div> 
            <div className='flex flex-col flex-grow w-1/2 space-y-2'>
              <p className='pl-2 m-0 text-sm text-button'>Payment Services</p>
              <div className="flex-grow p-6 border rounded-md md:mt-12 border-border bg-zinc-50">
                <p className='text-sm font-medium text-gray-950'>Paypal</p>
                <div className='flex'>
                  <p className='p-2 mt-1 mb-4 text-sm text-gray-800 border w-fit rounded-l-md border-input-border bg-profile-background'>paypal.me/</p>
                  <p className='w-full p-2 mt-1 mb-4 text-sm text-gray-800 border border-l-0 rounded-r-md border-border'>placeholder</p>
                </div>              
                <p className='text-sm font-medium text-gray-950'>Venmo</p>
                <div className='flex'>
                  <p className='p-2 mt-1 mb-4 text-sm text-gray-800 border w-fit rounded-l-md border-input-border bg-profile-background'>venmo.com/</p>
                  <p className='w-full p-2 mt-1 mb-4 text-sm text-gray-800 border border-l-0 rounded-r-md border-border'>placeholder</p>
                </div>              
                <p className='text-sm font-medium text-gray-950'>Cash app</p>
                <div className='flex'>
                  <p className='p-2 mt-1 mb-4 text-sm text-gray-800 border w-fit rounded-l-md border-input-border bg-profile-background'>cash.app/$</p>
                  <p className='w-full p-2 mt-1 mb-4 text-sm text-gray-800 border border-l-0 rounded-r-md border-border'>placeholder</p>
                </div>
                {isEditable && (
                  <button
                    className="px-3 py-2 text-sm text-white rounded-md bg-button hover:bg-hover"
                    type="submit" 
                    >Save info
                  </button>
                )}
              </div>
              
            </div>
          </form>           
        </div>

        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={confirmDelete}
          onCancel={() => setIsModalOpen(false)}
          title="Delete Profile?"
          message={"WARNING - This action will delete your profile, all groups, friends, and expenses." }
          confirmButtonText="Delete profile"
        />

        <div className='flex flex-col flex-grow w-full space-y-2'>
            <p className='pl-2 text-sm text-button'>Delete account</p>
            <div className="flex-grow p-6 border rounded-md md:mt-12 border-border bg-zinc-50">
              <p className="text-sm leading-5 text-gray-950 font-geologica">
                Once your account has been deleted, all of its resources and data will be permanently removed. 
                Before deleting your account, please download any data or information you wish to retain.
              </p>
              <button 
                type="button" 
                onClick={handleDelete}
                className={`px-3 py-2 mt-4 text-sm rounded-md ${mainUser?.id ? 'bg-red-button text-red-button-text hover:bg-red-button-hover' :'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                disabled={!mainUser?.id}
              >
                Delete account
              </button>
            </div>
        </div>       
      </div>      
    </>
  )
}