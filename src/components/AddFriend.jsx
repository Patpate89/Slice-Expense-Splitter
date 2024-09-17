import { useContext, useState } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
export default function AddFriend({ closeAddFriendMenu }) {
  //I'm using context but we can use props
  const { addFriendToList } = useContext(AppContext);
  //Maybe move this to a helper function also maybe use uuid library?
  const generateGroupId = () => {
    return Math.floor(10000 + Math.random() * 900000);
  };
  // Initialize state for friendsData
  const [friendsData, setFriendsData] = useState({
    name: "",
    id: generateGroupId(),
  });

  // Handle input changes and updates form data state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFriendsData((prevFriendsData) => ({
      ...prevFriendsData,
      [name]: value,
    }));
  };

  const addNewFriend = (event) => {
    event.preventDefault();
    //get stored data from local storage or initialize array
    let storedGroupData = JSON.parse(localStorage.getItem("friendsData")) || [];
    //append new form data to array
    storedGroupData.push(friendsData);
    //save updated array to local storage
    localStorage.setItem("friendsData", JSON.stringify(storedGroupData));
    addFriendToList(friendsData);
    closeAddFriendMenu();
    toast("New friend added");
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative border border-black-100 w-[535px]  rounded-md p-6 bg-white flex flex-col">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-black-200">
          <h1 className="p-0 text-md">New Friend</h1>
          <p>*Mandatory fields</p>
        </div>

        <form
          onSubmit={addNewFriend}
          className="flex flex-col flex-1 gap-6 overflow-auto border border-none"
        >
          <div className="flex flex-col">
            <label className="text-sm">
              Member name*
              <input
                className="w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
                type="text"
                name="name"
                value={friendsData.name}
                onChange={handleChange}
                maxLength="30"
                required
              />
            </label>
            <label className="text-sm">
              Member ID*
              <input
                className="w-full p-2 mt-1 text-left text-gray-500 border border-gray-300 rounded-md h-9"
                type="text"
                name="id"
                disabled={true}
                value={`#${friendsData.id}`}
                maxLength="30"
                required
              />
            </label>
            <div className=" bg-gray-200 flex justify-end  mt-8">
              <button
                type={"button"}
                onClick={closeAddFriendMenu}
                className="px-4 py-2 m-2 text-sm hover:bg-hover text-black rounded-xl  bg-gray-200"
              >
                Cancel
              </button>
              <button
                type={"submit"}
                className="px-4 py-2 m-2 text-sm hover:bg-hover text-black rounded-xl  bg-gray-200 "
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
